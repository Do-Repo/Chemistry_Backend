import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (path: string, folder: string) => {
    try {
        const result = await cloudinary.v2.uploader.upload(path, {
            folder: folder,
        });
        return { url: result.url, public_id: result.public_id };
    } catch (err) {
        console.log(err);
    }
}

export const removeFromCloudinary = async (public_id: any) => {
    try {
        const result = await cloudinary.v2.uploader.destroy(public_id);
        return result;
    } catch (err) {
        console.log(err);
    }
}