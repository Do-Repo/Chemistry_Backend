const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = (path: string, folder: string) => {
    return cloudinary.v2.uploader.upload(path, {
        folder: folder,
    }).then((result: { url: string; public_id: string; }) => {
        return { url: result.url, public_id: result.public_id };
    }).catch((err: any) => {
        console.log(err);
    });
}

export const removeFromCloudinary = (public_id: any) => {
    return cloudinary.v2.uploader.destroy(public_id).then((result: any) => {
        return result;
    }).catch((err: any) => {
        console.log(err);
    });
}