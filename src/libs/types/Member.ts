export interface Member {
    memberType: string;
    memberNick: string;
    memberStatus: string;
    memberPhone: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDescription?: string;
    memberImage?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;
};

export interface MemberInput {
    memberType?: string;
    memberNick: string;
    memberStatus?: string;
    memberPhone: string;
    memberPassword: string;
    memberAddress?: string;
    memberDescription?: string;
    memberImage?: string;
    memberPoints?: number;
};