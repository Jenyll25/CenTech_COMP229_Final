import express from 'express';
const router = express.Router();

import {DisplayAddPage, DisplayAnswerSurvey, DisplayEditPage, DisplaySurveyList, ProcessAnswerSurveyPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage, DisplayReportSurveyPage} from '../Controllers/survey-list';

router.get('/survey-list', DisplaySurveyList);

router.get('/answer/:id', DisplayAnswerSurvey);

router.get('/add', DisplayAddPage);

router.get('/edit/:id', DisplayEditPage);

router.post('/answer/:id', ProcessAnswerSurveyPage);

router.post('/add', ProcessAddPage);

router.post('/edit/:id', ProcessEditPage);

router.get('/delete/:id', ProcessDeletePage);

router.get('/report/:id', DisplayReportSurveyPage);

export default router;