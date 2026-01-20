import multer from "multer";
import path from "path";
import generateImageName from "../utils/generateImageName.utils";
import { allowedImageMimeTypes, maxImageSize } from "../constants/images.constants";
import { env } from "../utils/env.utils";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, env.UPLOAD_DIR),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, generateImageName(ext));
    },
});

export const uploadImages = multer({
    storage,
    limits: { fileSize: maxImageSize },
    fileFilter: (_req, file, cb) => {
        if (!allowedImageMimeTypes.includes(file.mimetype))
            return cb(new Error("Only jpeg/png/webp images are allowed"));

        cb(null, true);
    },
});
