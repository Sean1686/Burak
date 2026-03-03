import MemberModel from "../schema/Member.model";
import {
  MemberInput,
  Member,
  LoginInput,
  MemberUpdateInput,
} from "../libs/types/Member";
import * as bcrypt from "bcryptjs";
import Errors, { HttpCodes, Messages } from "../libs/Error";
import {
  MemberStatus,
  Membertype as MemberType,
} from "../libs/types/enums/member.enum";
import { promises } from "dns";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
  private readonly memberModel: typeof MemberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  /** SPA */

  public async getRestaurant(): Promise<Member> {
    const result = await this.memberModel
    .findOne({ memberType: MemberType.RESTAURANT })
    .lean()
    .exec();
  if  (!result) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_DATA_FOUND);

  return result
  }
  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("Error during signup:", err);
      throw new Errors(HttpCodes.BAD_REQUEST, Messages.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    // TODO: Consider memberStatus check (e.g., active, banned)
    const member = await this.memberModel
      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 },
      )
      .exec();
    if (!member)
      throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_MEMBER_FOUND);
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCodes.FORBIDDEN, Messages.BLOCKED_USER);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword,
    );
    if (!isMatch)
      throw new Errors(HttpCodes.UNAUTHORIZED, Messages.WRONG_PASSWORD);

    const result = await this.memberModel.findById(member._id).lean().exec();
    console.log("Found member:", result);
    return result;
  }

  public async getMemberDetail(member: Member): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);

    const result = await this.memberModel.findOne({
      _id: memberId, 
      memberStatus: MemberStatus.ACTIVE
    })
    .exec();
    
  if (!result) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_DATA_FOUND);

  return result
  }

  public async updateMember(
    member: Member, 
    input: MemberUpdateInput
  ): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
    .findOneAndUpdate({_id: memberId}, input, {new: true})
    .exec();
    if(!result) throw new Errors(HttpCodes.NOT_MODIFIED, Messages.UPDATE_FAILED);

    return result;
  }

  public async getTopUsers(): Promise<Member[]> {
    const result = await this.memberModel.find({
      memberStatus: MemberStatus.ACTIVE, 
      memberPoint: { gte: 1 },
    })
    .sort({ memberPoints: -1})
    .limit(4)
    .exec();
    if (!result) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_DATA_FOUND)
    return result
  }

  /** SSR */

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
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
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 },
      )
      .exec();
    console.log("member:", member);
    if (!member)
      throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_MEMBER_FOUND);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword,
    );

    if (!isMatch)
      throw new Errors(HttpCodes.UNAUTHORIZED, Messages.WRONG_PASSWORD);

    const result = await this.memberModel.findById(member._id).exec();

    console.log("Found member:", result);
    return result;
  }

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();
    if (!result) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCodes.NOT_FOUND, Messages.NO_DATA_FOUND);

    return result;
  }
}

export default MemberService;
