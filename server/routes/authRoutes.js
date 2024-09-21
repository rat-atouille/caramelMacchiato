const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const session = require('express-session');
const nodemailer = require('nodemailer');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.use(session ({
  secret: process.env.SECRET_KEY,
  cookie: {secure: false},
  resave: false,
  saveUninitialized: true,
}))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// creates verfication code
function getRandomInt() {
  let temp = ''
  for (let i = 0; i < 6; i++) {
    temp += Math.floor(Math.random() * 9);
  }
  return temp
}

router.post("/register", async(req, res) => {
  const { email, username } = req.body;
  const verificationCode = getRandomInt();    // create 6 digit verification code

  const checkExist = 'SELECT';

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Email',
    text: `${username}, Welcome to Caramel Macchiato! Your verification code is ${verificationCode}`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (error) {
      res.status(500).send('error sending email')
  }
})
/*


// Registration endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send('Error creating user');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.length === 0) return res.status(404).send('User not found');

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Incorrect password');
    }

    req.session.userId = user.id; // Set session user ID
    res.status(200).send('Login successful');
  });
});

// Send email example (e.g., password reset or confirmation)
router.post('/send-email', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Test Email',
    text: 'This is a test email from your Node.js app!'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      res.status(500).send('Error sending email');
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});
*/

module.exports = router;
