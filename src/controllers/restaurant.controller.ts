import MemberService from "../models/Member.servise";
import { T } from "../libs/types/common";
import express, { Request, Response } from 'express';
import { MemberInput } from "../libs/types/Member";
import { Membertype } from "../libs/types/enums/member.enum";

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("Going to Home page");
        res.send("You are at the Home page");
        // send | render | json | redirect | end
    } catch (error) {
        console.error("Error going home:", error);
    }
};

restaurantController.goLogin = (req: Request, res: Response) => {
    try {
        console.log("Going to Login page");
        res.send("You are at the Login page");
    } catch (error) {
        console.error("Error going to login:", error);
    }
};

restaurantController.goSignup = (req: Request, res: Response) => {
    try {
        console.log("Going to Signup page");
        res.send("You are at the Signup page");
    } catch (error) {
        console.error("Error going to signup:", error);
    }
};

restaurantController.processLogin = (req: Request, res: Response) => {
    try {
        console.log("Processing login");
        res.send("Login processed successfully");
    } catch (error) {
        console.error("Error processing login:", error);
    }
};

restaurantController.processSignup = async(req: Request, res: Response) => {
    try {
        console.log("Processing signup");  
                console.log("Request Body:", req.body);

                const newMember: MemberInput = req.body;
                newMember.memberType = Membertype.RESTAURANT;

                const memberService = new MemberService();
                await memberService.processSignup(newMember);
        res.send("Signup processed successfully");
    } catch (error) {
        console.error("Error processing signup:", error);
    }
};

export default restaurantController;