export * from "./appError";
export * from "./logger";
export { default as catchAsync } from "./catchAsync";
export * from "./multer";
export type Callback<A> = (args: A) => void;

export const promisify =
    <T, A>(fn: (args: T, cb: Callback<A>) => void): ((args: T) => Promise<A>) =>
    (args: T) =>
        new Promise((resolve) => {
            fn(args, (callbackArgs) => {
                resolve(callbackArgs);
            });
        });
