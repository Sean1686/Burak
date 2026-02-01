import express, { Request, Response } from 'express';
import {T} from "../libs/types/common"
import Errors from "../libs/Error";

const productController: T = {};
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

productController.createNewProducts = async(req: Request, res: Response) => {
    try {
        console.log("createNewProducts");  
        return res.send("DONE");
    } catch (err) {
        console.log("Error, createNewProducts:", err);
        if (err instanceof Errors) res.status(err.code).json({ err });
        else res.status(Errors.standard.code).json(Errors.standard);
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