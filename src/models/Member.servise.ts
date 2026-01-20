import MemberModel from "../schema/Member.model";
import { MemberInput, Member } from "../libs/types/Member";
import Errors, { HTTP_CODES, Massages } from "../libs/Error";
import { Membertype as MemberType } from "../libs/types/enums/member.enum";

class MemberService {
    private readonly memberModel: typeof MemberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel.findOne({memberType: MemberType.RESTAURANT})
        .exec();
        if (exist) {
            throw new Errors(HTTP_CODES.BAD_REQUEST, Massages.BAD_REQUEST);
        }
        try {
            const result = await this.memberModel.create(input);
            return result;
        } catch (error) {
            throw new Errors(HTTP_CODES.BAD_REQUEST, Massages.SOMETHING_WENT_WRONG);
        }
    }
}



export default MemberService;