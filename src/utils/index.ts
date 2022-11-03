// const otpGenerator = require("otp-generator");

import FileService from "../services/fileService";

// import * as bcrypt from "bcrypt";
const saltRounds = 10;
const bcrypt = require("bcrypt");


export const parseFormJsonObjects = async (data: any) => {
  await Promise.all(
    Object.keys(data).map((key) => {
      if (data[key] === "null") data[key] = undefined;
      else {
        const values = data[key].toString().trim();
        if (
          values.startsWith("[") ||
          values.startsWith("{") ||
          values.toLowerCase() === "true" ||
          values.toLowerCase() === "false"
        )
          try {
            data[key] = JSON.parse(data[key]);
          } catch (error) {
            data[key] = data[key];
          }
      }
    })
  );
  return data;
};

export const splitUrl = async(path: String) => {
  const splitPaths = path.split(/(?:-picture)+/);
        // const logoUrl: any = await FileService.S3FileRead(splitPaths[0] + "-picture", splitPaths[1].replace(/\/+$/, ""));
                const logoUrl: any = await FileService.S3FileRead(splitPaths[0] + "-picture");
        return logoUrl;
};
// export const generateOTP = () =>
//   otpGenerator.generate(6, {
//     digits: true,
//     alphabets: false,
//     upperCase: false,
//     specialChars: false,
//   });

// For generate hash from password
// export const generatehash = (password: string) => {
//   const res = new Promise((accept, reject) => {
//     bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
//       if (err) reject(err);
//       else accept({ hash });
//     });
//   });
//   return res;
// };

// // For Verifying Password with hash
// export async function verifyPassword(password: string, hashAlready: any) {
//   return new Promise((accept, reject) => {
//     bcrypt.compare(password, hashAlready, function (err: any, result: any) {
//       if (err) reject(err);
//       else accept(result);
//     });
//   });
// }
