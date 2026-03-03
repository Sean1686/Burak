import ViewModel from "../schema/View.model";
import { Messages } from "../libs/Error";
import Errors from "../libs/Error";
import { HttpCodes } from "../libs/Error";
import { ViewInput } from "../libs/types/view";
// import { View } from "../libs/types/view"

class ViewService{
    static checkViewExistence(input: ViewInput) {
       throw new Error("Method not implemented.");
    }
    private readonly viewModel;
    constructor(){
        this.viewModel=ViewModel
    }
    public async checkViewExistence( input:ViewInput): Promise<any>{
      return await this.viewModel
      .findOne( {memberId:input.memberId , viewRefId:input.viewRefId})
      .exec()
    }
      public async insertMemberView(input: ViewInput): Promise<any> {
    try {
      return await this.viewModel.create(input);
    } catch (error) {
      console.log("ERROR: insertMemberView", error);
      throw new Errors(HttpCodes.BAD_REQUEST, Messages.CREATE_FAILED);
    }
  }
}
export default ViewService;