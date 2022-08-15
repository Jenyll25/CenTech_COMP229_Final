"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayMySurveyList = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const Util_1 = require("../Util");
const survey_1 = __importDefault(require("../Models/survey"));
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayMySurveyList(req, res, next) {
    survey_1.default.find(function (err, mySurveyCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let currentDate = new Date();
        res.render('index', { title: 'My Survey', page: 'userPage', surveys: mySurveyCollection, displayName: (0, Util_1.UserDisplayName)(req), today: currentDate });
    });
}
exports.DisplayMySurveyList = DisplayMySurveyList;
//# sourceMappingURL=index.js.map