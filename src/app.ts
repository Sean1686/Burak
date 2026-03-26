import express from "express";
import cors from "cors";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import Memberservise from "./models/Member.servise";    
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: 'sessions'
});

/** 1-ENTRANCE */
const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static("/uploads"));
app.use(express.urlencoded({extended: true})); // HTML form kelayotgan requestlarni parse(tartib bilan orgniga qoyib beradi) qilish uchun
app.use(express.json()); // json formatdagi kelayotgan requestlarni obyektga ozgartirish uchun
app.use(cors({ credentials: true, origin: true})); // ixtiyoriy domain serveridan kirishiga ruxsat beradi
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));
/** 2-SESSION */
app.use(
    session({  
  secret: String(process.env.SESSION_SECRET),
  cookie: {
    maxAge: 1000 * 60 * 60 * 6, // 6hours
  },
  store: store,
 rolling: true,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

/** 3-VIEWS */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTERS */
app.use("/admin", routerAdmin); // SSR: EJS
app.use("/", router); // SPA: REACT

/** 5-error handling */
// app.use((req, res) => {
//     res.status(404).render("404 Page Not Found");
// });

export default app;