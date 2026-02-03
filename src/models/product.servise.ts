import { Product, ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCodes } from "../libs/Error";
import { Messages } from "../libs/Error";
import Errors from "../libs/Error";

class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel;
    }

    /*    SPA    */

    /*    SSR    */

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        } catch(err) {
            console.error("Error, model:createNewProduct:", err)
            throw new Errors(HttpCodes.BAD_REQUEST, Messages.CREATE_FAILED)
        } 
    }
}

export default ProductService;