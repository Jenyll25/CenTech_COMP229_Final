import express from 'express';
import { UserDisplayName } from '../Util';
import Survey from '../Models/survey';
import { CallbackError } from 'mongoose';

export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}

export function DisplayAboutPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    res.render('index', { title: 'About Us', page: 'about', displayName: UserDisplayName(req)});
}

export function DisplayMySurveyList(req: express.Request, res: express.Response, next: express.NextFunction)
{
    Survey.find(function(err, mySurveyCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        // Get current day
        let currentDate = new Date()
        //show the edit views
        res.render('index', {title: 'My Survey', page: 'userPage', surveys: mySurveyCollection, displayName: UserDisplayName(req), today: currentDate});
        //res.json({success: true, msg: 'Movie-List Displayed Successfully', movies: moviesCollection, user: req.user});
    });
}