import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import Memberservise from "./models/Member.servise";    
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGODB_URL),
  collection: 'mySessions'
});

/** 1-ENTRANCE */
const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true})); // HTML form kelayotgan requestlarni parse(tartib bilan orgniga qoyib beradi) qilish uchun
app.use(express.json()); // json formatdagi kelayotgan requestlarni obyektga ozgartirish uchun
app.use(morgan(MORGAN_FORMAT));
/** 2-SESSION */

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