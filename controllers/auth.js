const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const StockHistory = require('../models/StockHistories');
const Stock = require('../models/Stock');
const keys = require('../config/keys');
const moment = require('moment');
const fetch = require("node-fetch");

require("dotenv").config();

const api_key = "Tpk_c548b69f38f242c2ba5d20305003a574";
const sb_api_key = "Tpk_c548b69f38f242c2ba5d20305003a574";
// User Register
module.exports.handleRegister = (req, res) => {
	const { email, username, password } = req.body;
	if(!email && !username && !password){
		return res.status(400).json({
			status: 400,
			messages: ["All fields are required."],
		   });
	}

	if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
	{
	  return res.status(400).json({
		  status: 400,
		  messages: ["Enter Valid Email Address"],
		 });
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
		//   errors.email = 'Email already exists';
		return res.status(400).json({
			status: 400,
			messages: ["Enter Already Taken"],
		   });
		} else {
		  const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		  });
		  bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
			  if (err) throw err;
			  newUser.password = hash;
			  newUser
				.save()
				.then((user) => res.json(user))
				.catch((err) => console.log(err));
			});
		  });
		}
	  });	
}

// User Signin
module.exports.handleSignin = async (req, res, bcrypt) => {
	const { email, password } = req.body;
	if ( !email || !password ) {
		return res.status(400).json({
			status: 400,
			messages: ["Email & Password is required"],
		   });
	}

 if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
  {
    return res.status(400).json({
		status: 400,
		messages: ["Invalid Email Address"],
	   });
  }
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
    //   errors.email = 'User not found';
	return res.status(404).json({
		status: 404,
		messages: ["User not found! Kindly Register"],
	   });
    }
    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, username: user.username }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          async (err, token) => {
			await User.findOneAndUpdate({ email : email},{ $set: {token:token} });
            res.json({
              success: true,
			  token: token,
			  user: {username: user.username}
            });
          }
        );
      } else {
        // errors.password = 'Password incorrect';
        return res.status(400).json({
			status: 400,
			messages: ["Incorrect Password"],
		   });
      }
    });
  });
}

// User Getuser
module.exports.handleGetuser = async (req, res) => {
	const { token } = req.body;
	// const authHeader = req.headers.authorization;
    if(!token) {
	res.sendStatus(401);
    }
    jwt.verify(token, keys.secretOrKey, (err, user) => {
	if (err) {
		return res.sendStatus(403);
	}
    });
    // Find user by email
    User.findOne({ token }).then((user) => {
    // Check for user
    if (!user) {
    //   errors.email = 'User not found';
      return res.status(404).json('User not found');
    }
	// Check Password
    res.json({
		success: true,
		token: user.token,
		user: {username: user.username}
	  });
  });
}

module.exports.handleGetCompany = async (req, res,ticker) => {
	// const { token } = req.body;
	// if ( !token ) {
	// 	return res.status(400).json('Invalid Token');
	// }
  // Find user by email
  Stock.findOne({ symbol:ticker }).then((stock) => {
    // Check for user
    if (!stock) {
      return res.status(404).json('Stock not found');
    }
	// Check Password
    res.json(stock);
  });
}

module.exports.handleGetAllCompany = async (req, res) => {
  Stock.find().limit(50).then((stocks) => {
    // Check for user
    if (!stocks) {
      return res.status(404).json('Stocks not found');
    }
	// Check Password
    res.json(stocks);
  });
}
module.exports.handleGetStockInfo = async (req,res,ticker,time) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
	res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, keys.secretOrKey, (err, user) => {
	if (err) {
		return res.sendStatus(403);
	}
  });
  let startDate;
  let endDate;
  switch(time) {
	case "1D":
	startDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
	break;
	case "1m":
	startDate = moment().subtract(1, 'months').format("YYYY-MM-DD");
	break;
	case "1y":
	startDate = moment().subtract(1, 'years').format("YYYY-MM-DD");
	break;
	case "5y":
	startDate = moment().subtract(5, 'years').format("YYYY-MM-DD");
	break;
	default:
	console.log("invalidDate")
	  // code block
  }
  const stocks = await StockHistory.find({ symbol:ticker, date:{$gte:startDate} });
  if (stocks.length == 0) {
	const fetch_response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${sb_api_key}`
    );
    const data = await fetch_response.json();
    return res.json(data);
	}
    res.json(stocks);
}

// User Logout
module.exports.handleLogout = (req, res, db, bcrypt) => {
	const { id } = req.params;
	if ( !id ) {
		return res.status(400).json('incorrect form submission');
	}

	db('users').where({ id })
	.update({
		status: 'offline',
	})
	.returning('*')
	.then((result) => {
		return res.status(200).json(result);
	})
	.catch((err) => res.status(400).json('Unable to log out'))
	
}