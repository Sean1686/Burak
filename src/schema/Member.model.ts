import mongoose, {Schema} from "mongoose";
import { MemberStatus, Membertype } from "../libs/types/enums/member.enum";

const MemberSchema = new Schema({
    memberType: {
        type: String,
        enum: Membertype,
        default: Membertype.USER,
    },
    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE,
    },
    memberNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },
    memberPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },
    memberPassword: {
        type: String,
        select: false,
        required: true,
    },
    memberAddress: {
        type: String,
    },
    memberDescription: {
        type: String,
    },
    memberImage: {
        type: String,
    },
    memberPoints: {
        type: Number,
        default: 0,
    },
}, {timestamps: true}); // createdAt, updatedAt

export default mongoose.model("Member", MemberSchema);