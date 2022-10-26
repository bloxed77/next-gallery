const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const slugify = require("slugify");

const imageSchema = new mongoose.Schema(
  {
    Key: {
      type: String,
      required: true,
      unique: [true, "Key must be unique"],
    },
    slug: String,

    name: {
      type: String,
      lowercase: true,
      required: [true, "every image must have a name!"],
      unique: [true, "name must be unique"],
    },

    sizes: {
      small: {
        type: String,
      },
      original: {
        type: String,
      },
    },
    active: { type: Boolean, default: false },
    folder: String,
    group: String,
    images: Array,
    folders: Array,
    genre: {
      type: String,
      required: true,
      default: "Image",
      enum: ["Image", "Folder", "Group"],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      select: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

imageSchema.pre(/^find/, function (next) {
  console.log(this.genre);
  this.populate({
    path: "createdBy",
    select: "name",
  });
  next();
});
imageSchema.pre("save", function (next) {
  this.slug = slugify(this.Key, { lower: true });
  // console.log(this);
  next();
});
const Image = mongoose.model("Image", imageSchema);
// Image.syncIndexes();
module.exports = Image;
