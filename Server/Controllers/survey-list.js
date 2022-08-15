"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayReportSurveyPage = exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.ProcessAnswerSurveyPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayAnswerSurvey = exports.DisplaySurveyList = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const answer_1 = __importDefault(require("../Models/answer"));
const Util_1 = require("../Util");
function DisplaySurveyList(req, res, next) {
    survey_1.default.find(function (err, surveyCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let currentDate = new Date();
        res.render('index', { title: 'Survey List', page: 'survey-list', surveys: surveyCollection, displayName: (0, Util_1.UserDisplayName)(req), today: currentDate });
    });
}
exports.DisplaySurveyList = DisplaySurveyList;
function DisplayAnswerSurvey(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, function (err, answerCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: answerCollection.Title, page: 'answerSurvey', surveys: answerCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayAnswerSurvey = DisplayAnswerSurvey;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add your survey', page: 'add-survey', surveys: '', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, function (err, surveyToEdit) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('index', { title: 'Edit your survey', page: 'edit-survey', surveys: surveyToEdit, displayName: (0, Util_1.UserDisplayName)(req) });
        }
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAnswerSurveyPage(req, res, next) {
    let id = req.params.id;
    let answer = [];
    answer.push(req.body.answer0);
    answer.push(req.body.answer1);
    answer.push(req.body.answer2);
    answer.push(req.body.answer3);
    answer.push(req.body.answer4);
    let newAnswerSurvey = new answer_1.default({
        "surveyId": id,
        "answer": answer
    });
    answer_1.default.create(newAnswerSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/api/survey-list');
    });
}
exports.ProcessAnswerSurveyPage = ProcessAnswerSurveyPage;
function ProcessAddPage(req, res, next) {
    let currentDate = new Date();
    let questions = [];
    questions.push(req.body.q1);
    questions.push(req.body.q2);
    questions.push(req.body.q3);
    questions.push(req.body.q4);
    questions.push(req.body.q5);
    let name = (0, Util_1.UserDisplayName)(req);
    let newSurvey = new survey_1.default({
        "Title": req.body.surveyTitle,
        "Owner": name,
        "StartDate": req.body.surveyStartDate,
        "EndDate": req.body.surveyEndDate,
        "QuestionType": req.body.surveyType,
        "Questions": questions
    });
    survey_1.default.create(newSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/api/survey-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let name = (0, Util_1.UserDisplayName)(req);
    let questions = [];
    questions.push(req.body.q1);
    questions.push(req.body.q2);
    questions.push(req.body.q3);
    questions.push(req.body.q4);
    questions.push(req.body.q5);
    let updatedSurvey = new survey_1.default({
        "_id": id,
        "Title": req.body.surveyTitle,
        "Owner": name,
        "StartDate": req.body.surveyStartDate,
        "EndDate": req.body.surveyEndDate,
        "Questions": questions
    });
    survey_1.default.updateOne({ _id: id }, updatedSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/api/survey-list');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            answer_1.default.remove({ "surveyId": id }, function (err) {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                else {
                    res.redirect('/api/survey-list');
                }
            });
        }
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
function DisplayReportSurveyPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, function (err, surveyReport) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            answer_1.default.find({ "surveyId": id }, function (err, docs) {
                let answerTrue = [0, 0, 0, 0, 0];
                let answerFalse = [0, 0, 0, 0, 0];
                let verySatisfied = [0, 0, 0, 0, 0];
                let satisfied = [0, 0, 0, 0, 0];
                let dissatisfied = [0, 0, 0, 0, 0];
                let veryDissatisfied = [0, 0, 0, 0, 0];
                let textQ1 = [0, 0, 0, 0, 0];
                let textQ2 = [0, 0, 0, 0, 0];
                let textQ3 = [0, 0, 0, 0, 0];
                let textQ4 = [0, 0, 0, 0, 0];
                let textQ5 = [0, 0, 0, 0, 0];
                for (let j = 0; j < docs.length; j++) {
                    for (let a = 0; a < docs[j].answer.length; a++) {
                        if (surveyReport.QuestionType == "True/False") {
                            if (docs[j].answer[a] == "true") {
                                answerTrue[a]++;
                            }
                            else {
                                answerFalse[a]++;
                            }
                        }
                        if (surveyReport.QuestionType == "RatingScale") {
                            switch (docs[j].answer[a]) {
                                case "very-satisfied":
                                    verySatisfied[a]++;
                                    break;
                                case "satisfied":
                                    satisfied[a]++;
                                    break;
                                case "dissatisfied":
                                    dissatisfied[a]++;
                                    break;
                                case "very-dissatisfied":
                                    veryDissatisfied[a]++;
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (surveyReport.QuestionType == "TextQuestion") {
                            switch (docs[j].answer[a]) {
                                case "":
                                    verySatisfied[a]++;
                                    break;
                                case "satisfied":
                                    satisfied[a]++;
                                    break;
                                case "dissatisfied":
                                    dissatisfied[a]++;
                                    break;
                                case "very-dissatisfied":
                                    veryDissatisfied[a]++;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
                if (surveyReport.QuestionType == "True/False") {
                    res.render('index', {
                        title: 'View survey report', page: 'reports', surveys: surveyReport,
                        votes: docs.length, answerTrue: answerTrue, answerFalse: answerFalse,
                        displayName: (0, Util_1.UserDisplayName)(req)
                    });
                }
                if (surveyReport.QuestionType == "RatingScale") {
                    res.render('index', {
                        title: 'View survey report', page: 'reports', surveys: surveyReport,
                        votes: docs.length, verySatisfied: verySatisfied, satisfied: satisfied,
                        dissatisfied: dissatisfied, veryDissatisfied: veryDissatisfied,
                        displayName: (0, Util_1.UserDisplayName)(req)
                    });
                }
            });
        }
    });
}
exports.DisplayReportSurveyPage = DisplayReportSurveyPage;
//# sourceMappingURL=survey-list.js.map