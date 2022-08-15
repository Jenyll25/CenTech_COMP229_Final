"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const survey_list_1 = require("../Controllers/survey-list");
router.get('/survey-list', survey_list_1.DisplaySurveyList);
router.get('/answer/:id', survey_list_1.DisplayAnswerSurvey);
router.get('/add', survey_list_1.DisplayAddPage);
router.get('/edit/:id', survey_list_1.DisplayEditPage);
router.post('/answer/:id', survey_list_1.ProcessAnswerSurveyPage);
router.post('/add', survey_list_1.ProcessAddPage);
router.post('/edit/:id', survey_list_1.ProcessEditPage);
router.get('/delete/:id', survey_list_1.ProcessDeletePage);
router.get('/report/:id', survey_list_1.DisplayReportSurveyPage);
exports.default = router;
//# sourceMappingURL=survey-list.js.map