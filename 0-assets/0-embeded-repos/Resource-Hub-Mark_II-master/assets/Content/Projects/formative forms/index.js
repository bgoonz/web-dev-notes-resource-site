const express = require("express");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');


const app = express();
const port = process.env.PORT || 3000;

const csrfProtection = csrf( { cookie: true } )
app.use(cookieParser());
app.use(express.urlencoded());
app.set("view engine", "pug");

// const validate = (req, res, next) => {
//     const {firstName, lastName, email, password, confirmedPassword} = req.body;
//     const errors = [];
//     if (!firstName) {
//         errors.push('Please provide a first name.');
//     }

//     if (!lastName) {
//         errors.push('Please provide a last name.');
//     }

//     if (!email) {
//         errors.push('Please provide an email.');
//     }

//     if (!password) {
//         errors.push('Please provide a password.');
//     }

//     if (password !== confirmedPassword) {
//         errors.push('The provided values for the password and password confirmation fields did not match.');
//     }

//     req.errors = errors;
//     next();
// }

app.get("/", (req, res) => {
//   res.send("Hello World!");
  res.render('index', { users });
});

app.get('/create', csrfProtection, (req, res) => {
    res.render("create", { title:'create', csrfToken:req.csrfToken() })
});

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.post('/create', csrfProtection, (req, res, next) => {
  // const errors = req.errors;
  const {firstName, lastName, email, password, confirmedPassword} = req.body;

  const errors = [];
      if (!firstName) {
          errors.push('Please provide a first name.');
      }

      if (!lastName) {
          errors.push('Please provide a last name.');
      }

      if (!email) {
          errors.push('Please provide an email.');
      }

      if (!password) {
          errors.push('Please provide a password.');
      }

      if (password !== confirmedPassword) {
          errors.push('The provided values for the password and password confirmation fields did not match.');
      }

  if (errors.length > 0) {
      res.render('create', {
        title: 'Create User',
        firstName,
        lastName,
        email,
        password,
        messages: errors,
        csrfToken: req.csrfToken() });
      return;
  }
  users.push({ id: users.length + 2, firstName, lastName, email });
  res.redirect('/');

});

app.get('/create-interesting', csrfProtection, (req, res) => {
    res.render("create-interesting", { title:'create interesting user', csrfToken:req.csrfToken() })
});

app.post('/create-interesting', csrfProtection, (req, res) => {
    const {firstName, lastName, email, password, confirmedPassword, age, favoriteBeatle, iceCream} = req.body;
    const members = ['John', 'Paul', 'Ringo', 'George'];
    const ageNumber = parseInt(age);

    const errors = [];

      if (!firstName) {
          errors.push('Please provide a first name.');
      }

      if (!lastName) {
          errors.push('Please provide a last name.');
      }

      if (!email) {
          errors.push('Please provide an email.');
      }

      if (!password) {
          errors.push('Please provide a password.');
      }

      if (password !== confirmedPassword) {
          errors.push('The provided values for the password and password confirmation fields did not match.');
      }

      //age field validation
      if (!age) {
          errors.push('age is required');
      }

      if (ageNumber < 0 || ageNumber > 120) {
          errors.push('age must be a valid age');
      }

      //favoriteBeatle field validation
      if (!favoriteBeatle) {
        errors.push('favoriteBeatle is required');
      }

      if (!members.includes(favoriteBeatle)) {
        errors.push('favoriteBeatle must be a real Beatle member');
      }

      if (typeof age !== 'number') {
          errors.push('age must be a valid age');
      }

      //iceCream field validation
      if (iceCream !== "on") {
        errors.push('ice cream is required');
      }


  if (errors.length > 0) {
      res.render('create-interesting', {
        title: 'Create Interesting User',
        firstName,
        lastName,
        email,
        password,
        age,
        favoriteBeatle,
        iceCream,
        messages: errors,
        csrfToken: req.csrfToken() });
      return;
  }

  users.push({ id: users.length + 2, firstName, lastName, email, age, favoriteBeatle, iceCream: iceCream === "on" });
  res.redirect(302, '/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
