import { useRouter } from "next/router";

// export async function getServerSideProps(context) {

//     return {
//         props: { groups,}, // will be passed to the page component as props
//     };
// }

export default function FourBoxs({
    className,
    activeLink = false,
    groups = [],
}) {
    const router = useRouter();

    for (let i = 0; i < 4; i++) {
        groups.push({
            image: "/imgs/placeholder.jpg",
            name: "GROUP",
        });
    }

    return (
        <div className={"flex flex-1 gap-4 w-full h-full " + className}>
            <div className="flex flex-col gap-4 w-full h-full cursor-pointer">
                <div
                    onClick={(e) => {
                        !activeLink && e.preventDefault();
                    }}
                    className={`w-full h-full flex-grow basis-2/5 min-h-0 bg-contain bg-white shadow-cd relative`}
                    style={
                        groups[0] && {
                            background: `url('${groups[0].image}')`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                        }
                    }
                >
                    <div
                        className={`transparent-white absolute top-1/4 left-2/4 -translate-x-2/4 m-auto`}
                    >
                        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center">
                            {groups[0] && groups[0].name.toUpperCase()}
                        </h1>
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        !activeLink && e.preventDefault();
                    }}
                    className={`w-full h-full flex-grow basis-3/5 min-h-0 bg-white shadow-cd relative`}
                    style={
                        groups[1] && {
                            background: `url('${groups[1].image}')`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                        }
                    }
                >
                    <div
                        className={`transparent-white absolute top-1/4 left-2/4 -translate-x-2/4 m-auto`}
                    >
                        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center">
                            {groups[1] && groups[1].name.toUpperCase()}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full h-full">
                <div
                    onClick={(e) => {
                        !activeLink && e.preventDefault();
                    }}
                    className={`w-full h-full flex-grow basis-3/5 min-h-0 bg-white shadow-cd relative`}
                    style={
                        groups[2] && {
                            background: `url('${groups[2].image}')`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                        }
                    }
                >
                    <div
                        className={`transparent-white absolute top-1/4 left-2/4 -translate-x-2/4 m-auto`}
                    >
                        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center">
                            {groups[2] && groups[2].name.toUpperCase()}
                        </h1>
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        !activeLink && e.preventDefault();
                    }}
                    className={`w-full h-full flex-grow basis-2/5 min-h-0 bg-white shadow-cd relative`}
                    style={
                        groups[3] && {
                            background: `url('${groups[3].image}')`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                        }
                    }
                >
                    <div
                        className={`transparent-white absolute top-1/4 left-2/4 -translate-x-2/4 m-auto`}
                    >
                        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center">
                            {groups[3] && groups[3].name.toUpperCase()}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
