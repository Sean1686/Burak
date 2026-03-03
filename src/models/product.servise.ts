import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCodes } from "../libs/Error";
import { Messages } from "../libs/Error";
import Errors from "../libs/Error";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { Member } from "../libs/types/Member";
import { ProductCollection, ProductStatus } from "../libs/types/enums/product.enum";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose"

class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel;
    }

    /*    SPA    */

    public async getProducts(inquiry: ProductInquiry): Promise<Member[]> {
     const match: T = {ProductStatus: ProductStatus.PROCESS};
     if (inquiry.productCollection)
        match.productCollection = inquiry.productCollection;
    if (inquiry.search) {
        match.productName = { $regex: new RegExp(inquiry.search, "i") }
    }
    const sort: T = inquiry.order === "productPrice" 
    ? {[inquiry.order]: 1} 
    : {[inquiry.order]: -1}

    const result =  await this.productModel.aggregate([
        { $match: match }, 
        { $sort: sort }, 
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1},
    ])
    .exec();
    if (!result) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_DATA_FOUND);
     return result
    }

    public async getProduct(
        memberId: ObjectId | null, 
        id: string
    ): Promise<Product> {
        const productId = shapeIntoMongooseObjectId(id);

        let result = await this.productModel.findOne({
            _id: productId, 
            productStatus: ProductStatus.PROCESS
        })
        .exec();
        if(!result) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_DATA_FOUND);

        // TODO: if authenticated users => first => view log creation
        return result;
    }

    /*    SSR    */

        public async getAllProducts():  Promise<Product[]> {
            const result = await this.productModel.find().exec();
            if(!result) throw new Errors(HttpCodes.NOT_MODIFIED, Messages.UPDATE_FAILED);
            return result;
    }

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        } catch(err) {
            console.error("Error, model:createNewProduct:", err)
            throw new Errors(HttpCodes.BAD_REQUEST, Messages.CREATE_FAILED)
        } 
    }

        public async updateChosenProduct(
         id: string | string[],
         input: ProductUpdateInput):
         Promise<Product> {
            id = shapeIntoMongooseObjectId(id);
                        console.log("step 3:")

            const result = await this.productModel
            .findOneAndUpdate({_id: id}, input, {new: true})
            .exec();
            if(!result) throw new Errors(HttpCodes.NOT_MODIFIED, Messages.UPDATE_FAILED);

            // console.log("result:", result);
                        console.log("step 4:")

            return result;
    }
}

export default ProductService;