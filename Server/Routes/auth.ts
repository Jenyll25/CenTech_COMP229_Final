import express from 'express';
const router = express.Router();

//import controller module
import {ProcessLoginPage, DisplayLoginPage, ProcessRegisterPage, DisplayRegisterPage, ProcessLogoutPage} from "../Controllers/auth";

/* Display auth pages. */
router.get('/login', DisplayLoginPage);
router.get('/register', DisplayRegisterPage);

// Three methods that are processing (login, register, logout)
/* Process Login page. */
router.post('/login', ProcessLoginPage); //post request mean when you submit a form in the login page it's going to call the process login page

/* Process Register page. */
router.post('/register', ProcessRegisterPage);

/* Process Logout page. */
router.get('/login', ProcessLoginPage);

/* Process Logout page. */
router.get('/logout', ProcessLogoutPage);

export default router;
