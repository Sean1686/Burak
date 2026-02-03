import { Product, ProductInput, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCodes } from "../libs/Error";
import { Messages } from "../libs/Error";
import Errors from "../libs/Error";
import { shapeIntoMongooseObjectId } from "../libs/config";

class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel;
    }

    /*    SPA    */

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
            const result = await this.productModel
            .findOneAndUpdate({_id: id}, input, {new: true})
            .exec();
            if(!result) throw new Errors(HttpCodes.NOT_MODIFIED, Messages.UPDATE_FAILED);

            console.log("result:", result);
            return result;
    }
}

export default ProductService;