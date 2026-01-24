import MemberModel from "../schema/Member.model";
import { MemberInput, Member, LoginInput } from "../libs/types/Member";
import * as bcrypt from "bcryptjs";
import Errors, { HttpCodes, Messages } from "../libs/Error";
import { Membertype as MemberType } from "../libs/types/enums/member.enum";

class MemberService {
    private readonly memberModel: typeof MemberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel
        .findOne({memberType: MemberType.RESTAURANT})
        .exec();
        if (exist) {
            console.log("Restaurant member already exists:", exist);
            throw new Errors(HttpCodes.BAD_REQUEST, Messages.CREATE_FAILED);
        }

            const salt = await bcrypt.genSalt();
            input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

            
        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result;
        } catch (err) {
            throw new Errors(HttpCodes.BAD_REQUEST, Messages.SOMETHING_WENT_WRONG);
        }
    };

    public async processLogin(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
        .findOne(
         {memberNick: input.memberNick},
         {memberNick: 1, memberPassword: 1,})
        .exec();
        if (!member) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_MEMBER_FOUND);

        const isMatch = await bcrypt.compare(
         input.memberPassword,
         member.memberPassword
        );
       
        if(!isMatch) throw new Errors(HttpCodes.UNAUTHORIZED, Messages.WRONG_PASSWORD);

        const result = await this.memberModel.findById(member._id).exec();

        console.log("Found member:", result);
        return result;
    }
}



export default MemberService;