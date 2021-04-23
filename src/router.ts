import { Request, Response, Router } from 'express';
import passport from 'passport';

import usersController from './controllers/usersController';
const router = Router();  

router.post('/login', passport.authenticate('local'), usersController.index);
router.post('/register', usersController.create);


router.get('/', (request: Request, response: Response) => {
  response.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>')
})

router.get('/register', (request: Request, response: Response) => {
  const form = '<h1>Register page</h1><form method="post" action="register">\
  <br>Enter username: <br><input type="text" name="username" />\
  <br><br><input type="submit" value="submit" /><form>';

  response.send(form);
})

router.get('/login', (request: Request, response: Response) => {
  const form = '<h1>login page</h1><form method="post" action="login">\
  <br>Enter username: <br><input type="text" name="username" />\
  <br>Enter password: <br><input type="password" name="password" />\
  <br><br><input type="submit" value="submit" /><form>';

  response.send(form)
})

router.get('/protected-route', (req, res, next) => {
    
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});


export default router;