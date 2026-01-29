export enum HttpCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum Messages {
    SOMETHING_WENT_WRONG = "Something went wrong. Please try again.",
    GENERIC_ERROR = "An unexpected error occurred. Please try again later.",
    NOT_DATA_FOUND = "The requested resource was not found.",
    CREATE_FAILED = "Failed to create the resource.",
    UPDATE_FAILED = "Failed to update the resource.",
    DELETE_FAILED = "Failed to delete the resource.",
    UNAUTHORIZED = "You are not authorized to access this resource.",
    FORBIDDEN = "Access to this resource is forbidden.",
    BAD_REQUEST = "The request was invalid or cannot be served.",

    USED_NICK_PHONE = "The nickname or phone number is already in use.",
    NO_MEMBER_FOUND = "No member found with the provided credentials.",
    WRONG_PASSWORD = "The password provided is incorrect.",
    NOT_AUTHENTICATED = 'You must be logged in first to access this resource.',
}
class Errors extends Error {
    public code: HttpCodes;
    public massage: Messages;

    static standard = {
        code: HttpCodes.INTERNAL_SERVER_ERROR,
        message: Messages.SOMETHING_WENT_WRONG,
    };

    constructor(satusCode: HttpCodes, statusMassage: Messages) {
        super();
        this.code = satusCode;
        this.massage = statusMassage;
    }
}

export default Errors;
