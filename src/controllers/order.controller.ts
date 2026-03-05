import { Request, Response } from "express";
import { ExtendedRequest } from "../libs/types/Member";
import { T } from "../libs/types/common";
import Errors, { HttpCodes } from "../libs/Error";
import OrderService from "../models/Order.service";

const orderService = new OrderService

const orderController: T = {};
orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("createOrder")
        const result = await orderService.createOrder(req.member, req.body)

        res.status(HttpCodes.CREATED).json(result)
    }  catch (err) {
    // Error holatida konsolga chiqaramiz
    console.log("Error in createOrder:", err);

    // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni qaytaramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodni yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}

export default orderController;