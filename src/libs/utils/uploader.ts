import path from "path";
import multer from "multer";
import { v4 } from "uuid";

function getTargetImageStorage(address: any) {
return multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `./uploads/${address}`)
    },
    filename: function(req, file, cb) {
        console.log(file);
        const extention = path.parse(file.originalname).ext;
        const randomName = v4() + extention;
        cb(null, randomName);
    }
})
};

const makeUploader = (address: any) => {
    const storage = getTargetImageStorage(address);
    return multer({ storage: storage });
};

export default makeUploader;

// export const uploadProductImage = multer({ storage: product_storage });


// const product_storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./uploads/products")
//     },
//     filename: function(req, file, cb) {
//         console.log(file);
//         const extention = path.parse(file.originalname).ext;
//         const randomName = v4() + extention;
//         cb(null, randomName);
//     }
// });

// export const uploadProductImage = multer({ storage: product_storage });