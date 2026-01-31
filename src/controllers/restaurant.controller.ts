import MemberService from "../models/Member.servise";
import { T } from "../libs/types/common";
import express, { NextFunction, Request, Response } from 'express';

declare module 'express-session' {
    interface SessionData {
        member?: any;
    }
}
import { MemberInput, LoginInput, AdminRequest } from "../libs/types/Member";
import { Membertype } from "../libs/types/enums/member.enum";
import Errors, { Messages } from "../libs/Error";

    const memberService = new MemberService();

const restaurantController: T = {};
restaurantController.getHome = (req: Request, res: Response) => {
    try {
        console.log("Going to Home page");
        res.render("home");
        // send | render | json | redirect | end
    } catch (error) {
        console.error("Error going home:", error);
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("Going to Login page");
        res.render("login");
    } catch (error) {
        console.error("Error going to login:", error);
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("Going to Signup page");
        res.render("signup");
    } catch (error) {
        console.error("Error going to signup:", error);
    }
};

restaurantController.processSignup = async(req: AdminRequest, res: Response) => {
    try {
        console.log("Processing signup");  
                const newMember: MemberInput = req.body as unknown as MemberInput;
                newMember.memberType = Membertype.RESTAURANT;
                const result = await memberService.processSignup(newMember);

                            req.session.member = result;
                            (req.session as any).save(function () {
                              res.send(result);
                            });
                        

        console.log("Signup processed successfully", result);
        res.send(result);
    } catch (err) {
        console.log("Error processing signup:", err);
        res.send(err);
    }
};


restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("Processing login");
        console.log("Request Body:", req.body);
        const input: LoginInput = req.body;
        // Here you would typically call a method on memberService to process the login
        const result = await memberService.processLogin(input);

                                  req.session.member = result;
                            (req.session as any).save(function () {
                              res.send(result);
                            });
                        

        console.log("Login processed successfully");
        res.send(result);
    } catch (error) {
        console.error("Error processing login:", error);
        const message = error instanceof Errors ? error.message : Messages.SOMETHING_WENT_WRONG;
         res.send(`<script>alert("${message}"); window.location.replace("/admin/login");</script>`);
        res.send(error);
    }
};

restaurantController.logout = async(req: AdminRequest, res: Response) => {
    try {
        console.log("Logging out user");
        req.session.destroy(function () {
            res.redirect('/admin');
        })
    } catch (err) {
        console.log("Error processing logout:", err);
        res.send(err);
    }
}


restaurantController.checkAuthSession = async (req: Request, res: Response) => {
    try {
        console.log("checkAuthSession");
        if (req.session?.member) res.send(`<script>alert("${req.session.member.memberNick}")</script>`);
        else res.send(`<script>alert("${Messages.NOT_AUTHENTICATED}")</script>`);
    } catch (error) {
        console.error("Error checking auth session:", error);
        res.send(error);
    }
};

restaurantController.verifyRestaurant = (
    req: AdminRequest,
    res: Response,
    next: NextFunction
    ) => {
        if(req.session?.member?.memberType === Membertype.RESTAURANT) {
            req.member = req.session.member;
           return next();
        } else {
        const message = Messages.NOT_AUTHENTICATED
            res.send(`<script>alert("${message}"); window.location.replace('/admin/login'); </script>`);
        }
    }  

export default restaurantController;