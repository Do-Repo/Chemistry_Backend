import multer from "multer";

export const upload = multer({
    limits: {
        // 10MB
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Format not supported'))
        }
        cb(null, true)
    }
})

