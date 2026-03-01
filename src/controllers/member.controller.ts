import { ExtendedRequest, LoginInput, MemberUpdateInput } from "../libs/types/Member";
import { T } from "../libs/types/common";
import express, { NextFunction, Request, response, Response } from 'express';
import MemberService from "../models/Member.servise";
import { Member, MemberInput } from "../libs/types/Member";
import Errors, { HttpCodes, Messages } from "../libs/Error";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

    const memberService = new MemberService();
    const authService = new AuthService();

const memberController: T = {};
memberController.getRestaurant = async (req: Request, res: Response) => {
   try {
    // Log yozamiz, Request kirganini bilish uchun
    console.log("getRestaurant called");

       const result = await memberService.getRestaurant();

    // Agar ma'lumot topilsa, HTTP 200 status bilan JSON javob qaytaramiz
    res.status(HttpCodes.OK).json(result);
  } catch (err) {
    // Error holatida konsolga chiqaramiz
    console.log("Error in getRestaurant:", err);

    // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni qaytaramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodni yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup called");

    // Clientdan kelgan inputni olamiz
    const input: MemberInput = req.body;

    // memberService.signup funksiyasini chaqirib, a'zo yaratamiz
    const result: Member = await memberService.signup(input);

    // A'zo yaratilib bo'lgach, token yaratamiz (JWT yoki boshqa token)
    const token = await authService.createToken(result);

    // Cookie orqali access tokenni clientga yuboramiz
    // maxAge – cookie amal qilish muddati (soat * 3600 * 1000 ms)
    // httpOnly false: browser JS dan ham o'qilishi mumkin (aks holda true bo'lishi xavfsiz)
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    console.log("token =>", token);

    // Agar muvaffaqiyatli bo'lsa, HTTP 201 va JSON formatda a'zo + token yuboramiz
    res.status(HttpCodes.CREATED).json({ member: result, accessToken: token });
  } catch (err) {
    // Xatolik yuz bersa, konsolga yozamiz
    console.log("Error, signup:", err);

    // Agar Errors klassidan bo'lsa, xato kodini yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    // Funksiya chaqirilganini logga yozamiz
    console.log("login called");

    // Clientdan kelgan login inputni olamiz
    // input object: { memberNick: string, memberPassword: string }
    const input: LoginInput = req.body;

    // MemberService.login funksiyasini chaqiramiz
    // Bu funksiya DB dan memberni topadi va passwordni tekshiradi
    const result = await memberService.login(input);

    // Login muvaffaqiyatli bo'lsa, token yaratamiz
    // result orqali userID va boshqa ma'lumot token ichiga qo'yiladi
    const token = await authService.createToken(result);

    // Tokenni cookie orqali clientga yuboramiz
    // maxAge – cookie amal qilish muddati (soat * 3600 * 1000 ms)
    // httpOnly false: browser JS dan ham o'qilishi mumkin
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    })

    // Logga tokenni chiqaramiz
    console.log("token =>", token);

    // HTTP 200 status va JSON formatda muvaffaqiyatli login natijasi
    res.status(HttpCodes.OK).json({ member: result, accessToken: token });
  } catch (err) {
    // Xatolik yuz bersa, konsolga chiqaramiz
    console.log("Error, login:", err);

    // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodini yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
memberController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    // Funksiya chaqirilganini konsolga yozamiz
    console.log("logout called");

    // Cookie orqali accessToken ni bekor qilamiz
    // 1 Cookie nomi "accessToken"
    // 2 Qiymati null qilinadi
    // 3 maxAge: 0 → cookie darhol o‘chadi
    // 4 httpOnly: true → browser JS dan o‘qilmaydi (xavfsiz)
    res.cookie("accessToken", null, {
      maxAge: 0,
      httpOnly: true,
    });

    // Logout muvaffaqiyatli bo‘lganini clientga yuboramiz
    res.status(HttpCodes.OK).json({ logout: true });
  } catch (err) {
    // Xatolik yuz bersa, konsolga chiqaramiz
    console.log("Error, logout:", err);

    // Agar custom Errors tipidagi xato bo‘lsa, xato kodini yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda standart xato kodini yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.getMemberDetail = async (req: ExtendedRequest, res: Response) => {
  try {
    // Log yozamiz, funksiyaga kirganini bilish uchun
    console.log("getMemberDetail called");

    // memberService.getMemberDetail funksiyasini chaqiramiz
    // req.member -> bu user authentication orqali kelgan member ma'lumotini o'z ichiga oladi
    const result = await memberService.getMemberDetail(req.member);

    // Agar ma'lumot topilsa, HTTP 200 status bilan JSON javob qaytaramiz
    res.status(HttpCodes.OK).json(result);
  } catch (err) {
    // Error holatida konsolga chiqaramiz
    console.log("Error in getMemberDetail:", err);

    // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni qaytaramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodni yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.updateMember = async ( req: ExtendedRequest, res: Response) => {
  try {
        // Log yozamiz, request kirganini bildirish uchun
    console.log("updateMember");
    const input: MemberUpdateInput = req.body
    if (req.file) input.memberImage = req.file.path.replace(/\\/, "/");
    const result = await memberService.updateMember(req.member, input);

    res.status(HttpCodes.OK).json(result);
  } catch (err) {
    // Error holatidni konsolga chiqaramiz
    console.log("Error, updateMember:", err);
        // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni qaytaramiz
    if(err instanceof Errors) res.status(err.code).json(err);
        // Aks holda, standart xato kodni yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard)
  }
}

memberController.getTopUsers = async (req: Request, res: Response) => {
   try {
        // Log yozamiz, request kirganini bildirish uchun
    console.log("getTopUsers");

    const result = await memberService.getTopUsers();
    
    res.status(HttpCodes.OK).json(result)
  } catch (err) {
    // Error holatidni konsolga chiqaramiz
    console.log("Error, getTopUsers:", err);
        // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni qaytaramiz
    if(err instanceof Errors) res.status(err.code).json(err);
        // Aks holda, standart xato kodni yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard)
  }
}

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1 Clientdan cookie orqali accessToken olish
    const token = req.cookies["accessToken"];

    // 2 Agar token mavjud bo‘lsa
    if (token) {
      // authService.checkAuth(token) – tokenni tekshiradi
      // Agar valid bo‘lsa, Member object qaytaradi
      req.member = await authService.checkAuth(token);
    }

    // 3 Agar req.member hali ham undefined bo‘lsa, ya'ni token yo‘q yoki invalid
    if (!req.member) {
      throw new Errors(HttpCodes.UNAUTHORIZED, Messages.NOT_AUTHENTICATED);
    }

    // 4 Agar hammasi to‘g‘ri bo‘lsa, keyingi middleware yoki route handlerga o‘tadi
    next();
}catch (err) {
    // 5 Xatolik yuz bersa, logga chiqaramiz
    console.log("Error, verifyAuth:", err);

    // Agar Errors klassidan bo‘lsa, xato kodini yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodini yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

   memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1 Clientdan cookie orqali accessToken olish
    const token = req.cookies["accessToken"];

    // 2 Agar token mavjud bo‘lsa
    if (token) {
      // authService.checkAuth(token) – tokenni tekshiradi
      // Agar valid bo‘lsa, Member object qaytaradi
      req.member = await authService.checkAuth(token);
    }

    // 3 Token mavjud bo‘lmasa yoki invalid bo‘lsa ham xatolik tashlanmaydi
    // Middleware davom etadi
    next();
  } catch (err) {
    // Xatolik yuz bersa (token invalid bo‘lsa)
    // Logga chiqaramiz, lekin route ishlashni to‘xtatmaymiz
    console.log("Error, retrieveAuth:", err);

    // next() chaqiriladi, route davom etadi
    next();
  } 
};

export default memberController;