import express from 'express';
const routerAdmin = express.Router();
import restaurantController from './controllers/restaurant.controller';


/** Restaurant Controller */
routerAdmin.get('/', restaurantController.goHome);

routerAdmin
    .get("/login", restaurantController.goLogin)
    .post("/login/process", restaurantController.processLogin);

routerAdmin
    .get("/signup", restaurantController.goSignup)
    .post("/signup/process", restaurantController.processSignup);

    /** Product */
    /** User */

export default routerAdmin;