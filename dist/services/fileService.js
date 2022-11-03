"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
class FileService {
}
exports.default = FileService;
FileService.S3FileUpload = (uploadedFile, saveFileName, path) => {
    try {
        const s3 = new AWS.S3({
            accessKeyId: "AKIAQY7SGJ4QPPNDZEHO",
            secretAccessKey: "YPPzDc57T9ChZ2zo46WjkqewEr8ZUOn8geYPhWOA",
            region: "ap-south-1",
        });
        const filePath = `${path}/${saveFileName}`.replace("//", "/");
        if (uploadedFile) {
            const params = {
                Bucket: "designhelper",
                Key: filePath,
                Body: uploadedFile,
                ContentType: "image/jpeg"
            };
            return new Promise((resolve, reject) => s3.upload(params, function (error, data) {
                if (error)
                    reject(error);
                resolve(data);
            }));
        }
    }
    catch (error) {
        console.log("file not uploaded");
        throw error;
    }
};
FileService.S3FileDelete = (path) => {
    try {
        const s3 = new AWS.S3({
            accessKeyId: "AKIAQY7SGJ4QPPNDZEHO",
            secretAccessKey: "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",
            region: "ap-south-1",
        });
        const params = {
            Bucket: "designhelper",
            Key: path,
        };
        return new Promise((resolve, reject) => s3.deleteObject(params, function (error, data) {
            if (error)
                reject(error);
            resolve();
        }));
    }
    catch (error) {
        throw error;
    }
};
FileService.S3FileRead = (filePath) => {
    try {
        const s3 = new AWS.S3({
            accessKeyId: "AKIAQY7SGJ4QPPNDZEHO",
            secretAccessKey: "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",
            region: "ap-south-1",
        });
        const params = {
            Bucket: "designhelper",
            Key: filePath,
        };
        return s3.getSignedUrl("getObject", params);
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=fileService.js.map