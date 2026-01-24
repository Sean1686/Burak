import MemberModel from "../schema/Member.model";
import { MemberInput, Member, LoginInput } from "../libs/types/Member";
import Errors, { HttpCodes, Massages } from "../libs/Error";
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
            throw new Errors(HttpCodes.BAD_REQUEST, Massages.CREATE_FAILED);
        }
        try {
            const result1 = await this.memberModel.create(input);
            result1.memberPassword = "";
            return result1;
        } catch (err) {
            throw new Errors(HttpCodes.BAD_REQUEST, Massages.SOMETHING_WENT_WRONG);
        }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
        .findOne(
         {memberNick: input.memberNick},
         {memberNick: 1, memberPassword: 1,})
        .exec();
        if (!member) throw new Errors(HttpCodes.NOT_FOUND, Massages.NO_MEMBER_FOUND);
        const isMatch = member.memberPassword === input.memberPassword;
        if(!isMatch) throw new Errors(HttpCodes.UNAUTHORIZED, Massages.WRONG_PASSWORD);
        member.memberPassword = "";

        const result = await this.memberModel.findById(member._id).exec();

        console.log("Found member:", result);
        return result;
    }
}



export default MemberService;