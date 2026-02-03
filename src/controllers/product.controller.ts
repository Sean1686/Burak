import express, { Request, Response } from 'express';
import {T} from "../libs/types/common"
import Errors, { HttpCodes, Messages } from "../libs/Error";
import { ProductInput } from '../libs/types/product';
import { AdminRequest } from '../libs/types/Member';
import ProductService from '../models/product.servise';

const productService = new ProductService;

const productController: T = {};
    /*    SPA    */


    /*    SSR    */
productController.getAllProducts = async(req: Request, res: Response) => {
    try {
        console.log("getAllProducts");  
        res.render("products");
    } catch (err) {
        console.log("Error, getAllProducts:", err);
        if (err instanceof Errors) res.status(err.code).json({ err });
        else res.status(Errors.standard.code).json(Errors.standard);
    };
};

productController.createNewProducts = async(req: AdminRequest, res: Response) => {
    try {
        console.log("createNewProducts");  
        if(!req.files || !req.files.length) throw new Errors(HttpCodes.INTERNAL_SERVER_ERROR, Messages.FILE_UPLOAD_ERROR);

        const data: ProductInput = req.body;
        data.productImages = req.files?.map((ele) => {
            return ele.path.replace(/\\/g, "/")
        });
        console.log("req.files", data)
        await productService.createNewProduct(data);

    res.send(
    `<script>alert("${"Successful creation"}"); window.location.replace("/admin/product/all");</script>`
    );
    } catch (err) {
        console.log("Error, createNewProducts:", err);
        const message = err instanceof Errors ? err.message : Messages.SOMETHING_WENT_WRONG
       res.send(`<script>alert("${message}"); window.location.replace("/admin/product/all");</script>`);
    };
};

productController.updateChosenProducts = async(req: Request, res: Response) => {
    try {
        console.log("updateChosenProducts");  
    } catch (err) {
        console.log("Error, updateProducts:", err);
        if (err instanceof Errors) res.status(err.code).json({ err });
        else res.status(Errors.standard.code).json(Errors.standard);
    };
};



export default productController;