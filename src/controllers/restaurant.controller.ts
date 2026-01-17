import { T } from "../libs/types/common";
import express, { Request, Response } from 'express';

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        res.send("You are at the Home page");
    } catch (error) {
        console.error("Error going home:", error);
    }
};

restaurantController.goLogin = (req: Request, res: Response) => {
    try {
        res.send("You are at the Login page");
    } catch (error) {
        console.error("Error going to login:", error);
    }
};

restaurantController.goSignup = (req: Request, res: Response) => {
    try {
        res.send("You are at the Signup page");
    } catch (error) {
        console.error("Error going to signup:", error);
    }
};

export default restaurantController;