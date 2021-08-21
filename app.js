const express = require('express');
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
app.use(flash());
const PORT = 3000;
var randomText;

// setting view engine
app.set('view engine', 'ejs');

// load assets
app.use('/public', express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false
}));

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    randomText = ""

    //setting random captcha text
    let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 6; i++) {
        let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        randomText += `${randomCharacter}`;
    }

    res.render('login', { randomText, message: req.flash('message') });
})

app.post('/login', (req, res) => {
    const { name, captcha } = req.body

    if (captcha == randomText) {
        req.flash('message', 'Congrats Captcha Matched! Logged In Successfully!')
        res.redirect('/dashboard')
    } else {
        req.flash('message', 'Invalid Captcha')
        res.redirect('/login')
    }
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { message: req.flash('message') })
})

//Listening to port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})