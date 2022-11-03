import * as fs from "fs-extra";
const AWS = require("aws-sdk");

export default class FileService {
  static S3FileUpload = (
    uploadedFile: any,
    saveFileName: string,
    path: string
  ) => {
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
        return new Promise((resolve, reject) =>
          s3.upload(params, function (error: Error, data: any) {
            if (error) reject(error);
            resolve(data);
          })
        );
      }
    } catch (error) {
      console.log("file not uploaded");
      throw error;
    }
  };

  static S3FileDelete = (path: string) => {
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
      return new Promise<void>((resolve, reject) =>
        s3.deleteObject(params, function (error: Error, data: any) {
          if (error) reject(error);
          resolve();
        })
      );
    } catch (error) {

      throw error;
    }
  };

  static S3FileRead = (filePath: string) => {
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
    } catch (error) {
      throw error;
    }
  };
}
