import MemberService from "../models/Member.servise";
import { T } from "../libs/types/common";
import express, { Request, Response } from 'express';
import { MemberInput, LoginInput } from "../libs/types/Member";
import { Membertype } from "../libs/types/enums/member.enum";

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

restaurantController.processSignup = async(req: Request, res: Response) => {
    try {
        console.log("Processing signup");  
                console.log("Request Body:", req.body);

                const newMember: MemberInput = req.body;
                newMember.memberType = Membertype.RESTAURANT;
                const result = await memberService.processSignup(newMember);
                            //  TODO: SESSION AUTHENTICATE HERE

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
                            //  TODO: SESSION AUTHENTICATE HERE

        console.log("Login processed successfully");
        res.send(result);
    } catch (error) {
        console.error("Error processing login:", error);
        res.send(error);
    }
};


export default restaurantController;