export enum HTTP_CODES {
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

export enum Massages {
    SOMETHING_WENT_WRONG = "Something went wrong. Please try again.",
    GENERIC_ERROR = "An unexpected error occurred. Please try again later.",
    NOT_FOUND = "The requested resource was not found.",
    UNAUTHORIZED = "You are not authorized to access this resource.",
    FORBIDDEN = "Access to this resource is forbidden.",
    BAD_REQUEST = "The request was invalid or cannot be served.",
}
class Errors extends Error {
    public code: HTTP_CODES;
    public massage: Massages;

    constructor(satusCode: HTTP_CODES, statusMassage: Massages) {
        super();
        this.code = satusCode;
        this.massage = statusMassage;
    }
}

export default Errors;
