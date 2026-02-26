import { LoginInput } from "../libs/types/Member";
import { T } from "../libs/types/common";
import express, { Request, Response } from 'express';
import MemberService from "../models/Member.servise";
import { Member, MemberInput } from "../libs/types/Member";
import Errors, { HttpCodes } from "../libs/Error";
import AuthService from "../models/Auth.service";

    const memberService = new MemberService();
    const authService = new AuthService();

const memberController: T = {};
memberController.signup = async(req: Request, res: Response) => {
    try {
        console.log("Signup");  
                const input: MemberInput = req.body,
                 result: Member = await memberService.signup(input);
                 const token = await authService.createToken(result);
                 console.log("token:::", token)
                              //  TODO: TOKEN GENERATE HERE

               res.json({ member: result });
    } catch (err) {
        console.log("Error, Signup:", err);
        if (err instanceof Errors) res.status(err.code).json({ err });
        else res.status(Errors.standard.code).json(Errors.standard);
    };
};
memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("Login");
        const input: LoginInput = req.body,
        // Here you would typically call a method on memberService to process the login
         result: Member = await memberService.login(input),
          token = await authService.createToken(result);
         console.log("token =>", token)

          res.json({ member: result });
    } catch (error) {
        if (error instanceof Errors) res.status(error.code).json({ error });
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default memberController;