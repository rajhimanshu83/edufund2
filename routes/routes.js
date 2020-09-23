const express = require("express");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
// require("dotenv").config();

const api_key = "Tpk_c548b69f38f242c2ba5d20305003a574";
const sb_api_key = "Tpk_c548b69f38f242c2ba5d20305003a574";
const { handleSignin, handleRegister, handleGetuser,handleGetCompany,handleGetStockInfo,handleGetAllCompany } = require('../controllers/auth');

const router = express.Router();

// For Testing
router.get('/hello', (req, res, next) => {
    res.json('Hello World');
    next()
});


// APIs
router.get("/dailydata/:ticker/:time", async (req, res) => {
    const { ticker, time } = req.params;
    handleGetStockInfo(req,res,ticker,time);
  });
  
router.get("/info/:ticker", async (req, res) => {
    const { ticker } = req.params;
    handleGetCompany(req, res,ticker);
    // const response = await fetch(
    //   `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${sb_api_key}`
    // );
    // const data = await response.json();
    // console.log(data)
    // res.json(data);
  });

router.get("/allticker/info", async (req, res) => {
    handleGetAllCompany(req, res);
});
  
router.get("/logo/:ticker", async (req, res) => {
    const { ticker } = req.params;
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/logo?token=${sb_api_key}`
    );
    const data = await response.json();
    res.json(data);
  });
  
router.get("/price/:ticker", async (req, res) => {
    const { ticker } = req.params;
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=${sb_api_key}`
    );
    const data = await response.json();
    res.json(data);
  });
  
router.get("/news/:ticker", async (req, res) => {
    const { ticker } = req.params;
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/news/last/3?token=${sb_api_key}`
    );
    const data = await response.json();
    res.json(data);
  });
router.post('/signin', (req, res) => { handleSignin(req, res,bcrypt) });
router.post('/register', (req, res) => { handleRegister(req, res) });
router.post('/getuser', (req, res) => { handleGetuser(req, res) });

module.exports = router
