import { T } from "../libs/types/common";
import express, { Request, Response } from 'express';

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

restaurantController.processSignup = (req: Request, res: Response) => {
    try {
        console.log("Processing signup");   
        res.send("Signup processed successfully");
    } catch (error) {
        console.error("Error processing signup:", error);
    }
};

export default restaurantController;