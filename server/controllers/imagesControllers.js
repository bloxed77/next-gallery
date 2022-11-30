const catchAsync = require("../utils/catchAsync");
const {
    PutObjectCommand,
    S3Client,
    DeleteObjectCommand,
    DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/digitalOceans");
const fs = require("fs");
const { dirname, join } = require("path");
const path = require("path");
const { readdirSync, rmSync } = require("fs");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const factory = require("../our_modules/factoryHandler");
const Image = require("../models/imageModel");
const multer = require("multer");
const upload = require("../config/multerConfig");
const Comment = require("../models/commentModel");
// const Jimp = require("jimp");
const deleteFiles = () => {
    const dir = join(dirname(require.main.filename) + "/files");

    readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

const Jimp = require("jimp");
const { getDimensions } = require("../our_modules/smallSteps");

exports.createImage = catchAsync(async (req, res, next) => {
    const checker = await Image.findOne({
        $or: [{ name: req.body.name }, { Key: req.files[0].originalname }],
    });
    const folderChecker = await Image.findOne({
        $and: [{ name: req.body.folder }, { genre: "folder" }],
    });

    console.log(req.body);
    if (checker) {
        deleteFiles();
        return next(
            new AppError("there is another image with the same name", 409)
        );
    }

    if (!folderChecker) {
        return next(
            new AppError(`every photo must have an existing folder name `, 409)
        );
    }
    //if statement for groupcategory // checker
    const { width, height } = getDimensions(req.files[0].path, 300);
    console.log(width, height);
    const params = {
        Bucket: "failasof",
        Key: `${req.files[0].originalname}`,
        Body: fs.readFileSync(req.files[0].path),
        ACL: "public-read",
    };
    /// TODO MAKE DIMENTIONS DYMANIC
    let newImage = await Image.create({
        Key: req.files[0].originalname,
        name: req.body.name,

        folder: req.body.folder,
        sizes: {
            original: `https://${params.Bucket}.fra1.digitaloceanspaces.com/${params.Key}`,
            small: `https://ik.imagekit.io/rr0ybvdll/tr:w-${width},h-${height}/${params.Key}`,
        },
        active: req.body.active,
        createdBy: req.user.id,
        size: req.body.size,
        genre: "image",
    });

    s3Client.send(new PutObjectCommand(params));
    await Image.findOneAndUpdate(
        { name: req.body.folder },
        { $push: { images: newImage._id } },
        { new: true }
    );

    deleteFiles();
    res.status(201).json({
        status: "success",
        data: newImage,
    });
});

exports.getOneImage = catchAsync(async (req, res, next) => {
    const image = await Image.findOne({
        $and: [{ name: req.params.code }, { genre: "image" }],
    }).select({ folders: 0, images: 0 });
    if (!image) {
        return next(new AppError(`no image found with the Name provided`, 404));
    }

    image.comments = await Comment.find({ _id: { $in: image.comments } });

    res.status(200).json({
        status: "success",
        data: image,
    });
});

exports.deleteImages = catchAsync(async (req, res, next) => {
    let imagesnames = req.params.code.split(",");
    //   console.log(imagesnames);
    let arrayOfImages = await Image.find({
        $and: [{ name: { $in: imagesnames } }, { genre: "image" }],
    }).select({
        Key: 1,
        _id: 0,
    });

    let arrayOfIds = await Image.find({
        $and: [{ name: { $in: imagesnames } }, { genre: "image" }],
    }).select({
        _id: 1,
    });

    const params = {
        Bucket: "failasof",
        Delete: {
            Objects: arrayOfImages,
        },
    };
    await s3Client.send(
        new DeleteObjectsCommand(params, function (err, data) {
            if (err) {
                console.log("err", err);
            }
            console.log("data", data);
        })
    );

    //
    // let document = await Image.findOne({ name: imagesnames[0] });
    // console.log(imagesnames[0].folder);
    // console.log(document.folder);
    let folder = await Image.findOne({ name: imagesnames[0] });

    console.log(folder.folder, "folder");
    let result = [];
    for (let i = 0; i < arrayOfIds.length; i++) {
        result.push(arrayOfIds[i]._id);
    }
    console.log(result);
    await Image.findOneAndUpdate(
        { name: folder.folder },
        //you need to pull id's here as folders has an array of image ids not names anymore
        { $pull: { images: { $in: result } } },
        { new: true }
    );
    //delete images
    const images = await Image.deleteMany({ name: { $in: imagesnames } });
    // const comments = await Comment.deleteMany({_id:})
    res.status(204).json({
        status: "success",
    });
});
exports.getAllImages = factory.getAll(Image);
exports.hideImages = factory.hide(Image);
exports.updateImage = factory.update(Image);
exports.deleteOne = factory.deleteOne(Image);
