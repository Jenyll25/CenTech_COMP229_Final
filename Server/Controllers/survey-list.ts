import express from 'express';
import { CallbackError } from 'mongoose';

import Survey from '../Models/survey';
import Answer from '../Models/answer';

import { UserDisplayName } from '../Util';

export function DisplaySurveyList(req: express.Request, res: express.Response, next: express.NextFunction)
{
    Survey.find(function(err, surveyCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        // Get current day
        let currentDate = new Date()
        //show the edit views
        res.render('index', {title: 'Survey List', page: 'survey-list', surveys: surveyCollection, displayName: UserDisplayName(req), today: currentDate});
        //res.json({success: true, msg: 'Movie-List Displayed Successfully', movies: moviesCollection, user: req.user});
    });
}

export function DisplayAnswerSurvey(req: express.Request, res: express.Response, next: express.NextFunction)
{
  let id = req.params.id;
    Survey.findById(id,{}, {}, function(err, answerCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        //show the survey answer page
        res.render('index', {title: answerCollection.Title, page: 'answerSurvey', surveys: answerCollection, displayName: UserDisplayName(req)});
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  //renders the add survey page
  res.render('index', { title: 'Add your survey', page: 'add-survey', surveys:'', displayName: UserDisplayName(req) });
  //res.json({success: true, msg: 'Add Page Displayed Successfully!'});
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the db and read the survey into the edit page
  Survey.findById(id,{}, {}, function(err, surveyToEdit){
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        res.render('index', { title: 'Edit your survey', page: 'edit-survey', surveys: surveyToEdit, displayName: UserDisplayName(req) });
    // show the edit view with the data
    }
  });
}

export function ProcessAnswerSurveyPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id
  let answer = [];
  answer.push(req.body.answer0);
  answer.push(req.body.answer1);
  answer.push(req.body.answer2);
  answer.push(req.body.answer3);
  answer.push(req.body.answer4);

  let newAnswerSurvey = new Answer({
      "surveyId": id,
      "answer": answer
  });

  // Insert the new survey object into the database (survey collection)
  Answer.create(newAnswerSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new survey has been added -> refresh the survey-list
    res.redirect('/api/survey-list');
    });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{

  let currentDate = new Date();

  let questions = [];
    questions.push(req.body.q1);
    questions.push(req.body.q2);
    questions.push(req.body.q3);
    questions.push(req.body.q4);
    questions.push(req.body.q5);

  let name = UserDisplayName(req);

  // instantiate a new survey to Add
  let newSurvey = new Survey
  ({
    "Title": req.body.surveyTitle,
    "Owner": name,
    "StartDate": req.body.surveyStartDate,
    "EndDate": req.body.surveyEndDate,
    "QuestionType": req.body.surveyType,
    "Questions": questions
  });

  // Insert the new survey object into the database (survey collection)
  Survey.create(newSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new survey has been added -> refresh the survey-list
    res.redirect('/api/survey-list');
    });
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;
  let name = UserDisplayName(req);

  let questions = [];
  questions.push(req.body.q1);
  questions.push(req.body.q2);
  questions.push(req.body.q3);
  questions.push(req.body.q4);
  questions.push(req.body.q5);

  // instantiate a new survey to Edit
  let updatedSurvey = new Survey
  ({
    "_id": id,
    "Title": req.body.surveyTitle,
    "Owner": name,
    "StartDate": req.body.surveyStartDate,
    "EndDate": req.body.surveyEndDate,
    "Questions": questions
  });

  // update the survey in the database
  Survey.updateOne({_id: id}, updatedSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the survey-list page
    res.redirect('/api/survey-list');
    });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the survey
  Survey.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    else{
      Answer.remove({"surveyId": id}, function(err: CallbackError){
        if(err)
        {
          console.error(err);
          res.end(err);
        }
        else{
          // delete was successful
          res.redirect('/api/survey-list');
        }
      })
    }
  });
}

export function DisplayReportSurveyPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the db and read the report
  Survey.findById(id,{}, {}, function(err, surveyReport){
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        Answer.find({"surveyId": id}, function(err: CallbackError, docs: any){
          let answerTrue = [0,0,0,0,0];
          let answerFalse = [0,0,0,0,0];
          let verySatisfied = [0,0,0,0,0];
          let satisfied = [0,0,0,0,0];
          let dissatisfied = [0,0,0,0,0];
          let veryDissatisfied = [0,0,0,0,0];
          let textQ1 = [0,0,0,0,0];
          let textQ2 = [0,0,0,0,0];
          let textQ3 = [0,0,0,0,0];
          let textQ4 = [0,0,0,0,0];
          let textQ5 = [0,0,0,0,0];

          for (let j=0; j < docs.length; j++) {
            for ( let a=0; a < docs[j].answer.length; a++) {
                if ( surveyReport.QuestionType == "True/False" ) {
                    if (docs[j].answer[a] == "true") {
                        answerTrue[a]++;
                    }
                    else {
                        answerFalse[a]++;
                    }
                }
                if ( surveyReport.QuestionType == "RatingScale" ) {
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
                if(surveyReport.QuestionType == "TextQuestion"){
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

          if ( surveyReport.QuestionType == "True/False" ) {
            res.render('index', { 
              title: 'View survey report', page: 'reports', surveys: surveyReport,
              votes: docs.length, answerTrue: answerTrue, answerFalse: answerFalse,
              displayName: UserDisplayName(req) });
          }

          if ( surveyReport.QuestionType == "RatingScale" ) {
            res.render('index', { 
              title: 'View survey report', page: 'reports', surveys: surveyReport,
              votes: docs.length, verySatisfied: verySatisfied, satisfied: satisfied,
              dissatisfied: dissatisfied, veryDissatisfied: veryDissatisfied,
              displayName: UserDisplayName(req) });
          }
        });

        //res.render('index', { title: 'Edit your survey', page: 'edit-survey', surveys: surveyToEdit, displayName: UserDisplayName(req) });
    }
  });
}
