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
import Errors, { HttpCodes, Messages } from "../libs/Error";

    const memberService = new MemberService();

const restaurantController: T = {};
restaurantController.getHome = (req: Request, res: Response) => {
    try {
        console.log("Going to Home page");
        res.render("home");
        // send | render | json | redirect | end
    } catch (error) {
        console.error("Error going home:", error);
        res.send(error);
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("Going to Login page");
        res.render("login");
    } catch (error) {
        console.error("Error going to login:", error);
        res.send(error);
}
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("Going to Signup page");
        res.render("signup");
    } catch (error) {
        console.error("Error going to signup:", error);
        res.send(error);
    }
};

restaurantController.processSignup = async(req: AdminRequest, res: Response) => {
    try {
        console.log("Processing signup");  
        const file = req.file;
        if(!file) 
            throw new Errors(HttpCodes.BAD_REQUEST, Messages.SOMETHING_WENT_WRONG);

                const newMember: MemberInput = req.body;
                newMember.memberImage = file?.path;
                newMember.memberType = Membertype.RESTAURANT;
                const result = await memberService.processSignup(newMember);

                            req.session.member = result;
                            (req.session as any).save(function () {
                              res.redirect('/admin/product/all');
                            });
                        

        console.log("Signup processed successfully", result);
    } catch (err) {
        console.log("Error processing signup:", err);
        const message = err instanceof Errors ? err.message : Messages.SOMETHING_WENT_WRONG;
         res.send(`<script>alert("${message}"); window.location.replace("/admin/login");</script>`);
    }
};


restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("Processing login");
        console.log("Request Body:", req.body);
        const input: LoginInput = req.body;
        // Here you would typically call a method on memberService to process the login
        const result = await memberService.processLogin(input);

                                  req.session.member = result;
                            (req.session as any).save(function () {
                             res.redirect('/admin/product/all');
                            });
                        

        console.log("Login processed successfully");
    } catch (error) {
        console.error("Error processing login:", error);
        const message = error instanceof Errors ? error.message : Messages.SOMETHING_WENT_WRONG;
         res.send(`<script>alert("${message}"); window.location.replace("/admin/login");</script>`);
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
    };

export default restaurantController;