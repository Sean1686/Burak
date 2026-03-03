import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCodes, Messages } from "../libs/Error";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/Member";
import ProductService from "../models/product.servise";
import { ProductCollection } from "../libs/types/enums/product.enum";

const productService = new ProductService();

const productController: T = {};
/*    SPA    */

productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const {page, limit, order, productCollection, search} = req.query;
   const inquiry: ProductInquiry = {
    order: String(order),
    page: Number(page),
    limit: Number(limit)
   };
   if (productCollection) {
    inquiry.productCollection = productCollection as ProductCollection
   }
   if (search) inquiry.search = String(search);

   const result = await productService.getProducts(inquiry)

    res.status(HttpCodes.OK).json({result: "Done"})
  } catch (err) {
    console.log("Error, getProducts:", err);
    if (err instanceof Errors) res.status(err.code).json({ err });
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
   try {
    console.log("getProduct");
    const { id } = req.params;
    console.log("req.member:", req.member)
    const memberId = req.member?._id ?? null,
     result = await productService.getProduct(memberId, Array.isArray(id) ? id[0] : id)

    res.status(HttpCodes.OK).json(result)
  } catch (err) {
    console.log("Error, getProduct:", err);
    if (err instanceof Errors) res.status(err.code).json({ err });
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}

/*    SSR    */
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();
    console.log("products:", data);

    res.render("products", { products: data });
  } catch (err) {
    console.log("Error, getAllProducts:", err);
    if (err instanceof Errors) res.status(err.code).json({ err });
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProducts = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewProducts");
    console.log("req.body:", req.body);
    if (!req.files || !req.files.length)
      throw new Errors(
        HttpCodes.INTERNAL_SERVER_ERROR,
        Messages.FILE_UPLOAD_ERROR,
      );

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });
    console.log("req.files", data);
    await productService.createNewProduct(data);

    res.send(
      `<script>alert("${"Successful creation"}"); window.location.replace("/admin/product/all");</script>`,
    );
  } catch (err) {
    console.log("Error, createNewProducts:", err);
    const message =
      err instanceof Errors ? err.message : Messages.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace("/admin/product/all");</script>`,
    );
  }
};

productController.updateChosenProducts = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log("step 2:");

    // console.log("updateChosenProducts");
    const id = req.params.id;
    const result = await productService.updateChosenProduct(id, req.body);
    console.log("step 5:");
    res.status(HttpCodes.OK).json({ malumot: result });
  } catch (err) {
    console.log("Error, updateProducts:", err);
    if (err instanceof Errors) res.status(err.code).json({ err });
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
