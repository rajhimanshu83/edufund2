
const url = "mongodb://127.0.0.1:27017/edufund";
const mongoose = require('mongoose'); 
const Stock = require('./models/Stock');
const _ = require('lodash');
const csvtojson = require("csvtojson");
// const readFile = require('./fileList');

  try {
    mongoose.connect(url, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true
    }, async () => {
        console.log("connected")
        const csvData = await csvtojson().fromFile("symbols.csv");
        const stocksDataCsv = csvData.map((s) => ({symbol:s.Symbol, companyname: s["Security Name"]}))
        const stockChunks = _.chunk(
          csvData.map((s) => ({symbol:s.Symbol, companyname: s["Security Name"]})),
          1000
        )
        const stocksData = await Stock.find().select({ "companyname": 1,"symbol": 1, "_id": 0});
        if(stocksData.length === 0) {
        await Promise.all(stockChunks.map(async chunk => {
          const response = await Stock.insertMany(chunk,{ordered:false});  
          console.log(response);
        }));
        return true;
       }
        const diff = _.intersectionWith(stocksDataCsv, stocksData,_.isEqual);
              if(dif.length){
              await Stock.insertMany(diff,{ordered:false});
         }
        // const res = await readFile('stocks');
       process.exit()
    })
  } catch (error) {
    console.log(error);
  }
