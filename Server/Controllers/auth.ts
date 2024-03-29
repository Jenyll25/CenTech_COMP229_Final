import express from 'express';

// need passport functionality
import passport from 'passport';

// need to include the User model for authentication functions
import User from '../Models/user';

//import the display name utility method
import { UserDisplayName } from '../Util';

// Display Functions
export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    if(!req.user)
    {
        return res.render('index', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)});
    }
    return res.redirect('/api/survey-list');
}


// Processing Functions
export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    //self calling function that passess is the req, res, next object from the signature
    passport.authenticate('local', function(err, user, info)
    {
        //are there server errors?
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //are there login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error!');
            return res.redirect('/api/login');
        }

        //no problem - good username and password
        req.logIn(user, function(err)
        {
            //are there db errors?
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            return res.redirect('/api/survey-list');
        });
    })(req, res, next);
}

export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    req.logOut(function(err)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        console.log("User Logged Out!");
    });

    res.redirect('/api/login');
}

export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    //instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });

    //this will pass the data to the database and will hash the password so that it will not be recognizable
    User.register(newUser, req.body.password, function(err)
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('ERROR! User already exists!');
                req.flash('registerMessage', 'Registration Error!');
            }
            else
            {
                console.error(err.name); //other error
                req.flash('registerMessage', 'Server Error!');
            }
            return res.redirect('/api/register');
        }

        //everything is okay - user has been registered
        //automatically login the user
        return passport.authenticate('local')(req,res, function()
        {
            return res.redirect('/api/login');
        });
    });
}

export function DisplayRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    if(!req.user)
    {
        return res.render('index', {title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)});
    }
    return res.redirect('/api/survey-list');
}