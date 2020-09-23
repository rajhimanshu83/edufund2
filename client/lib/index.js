const API_URL = "http://localhost:8000";
import moment from 'moment';
import Cookie from "js-cookie";
import axios from "axios";

export const fetchDailyData = async (ticker, time) => {
    const token = Cookie.get("token");
    const response = await axios.get(`${API_URL}/api/dailydata/${ticker}/${time}`, {
     headers: {
      'Authorization': `Bearer ${token}`
    }
   });
    // const response = await fetch(`${API_URL}/api/dailydata/${ticker}/${time}`);
    console.log("fetched: " + ticker);
    const data = await response.data;
    return data.map((val, i) => {
      return { date: moment(data[i].date).format("YYYY-MM-DD"), close: data[i].close };
    });
  };
  
  export const fetchInfo = async (ticker) => {
    const response = await fetch(`${API_URL}/api/info/${ticker}`);
    const { symbol, companyname } = await response.json();
    return { symbol, companyName: companyname};
  };

  export const fetchAllTickersInfo = async () => {
    const response = await fetch(`${API_URL}/api/allticker/info`);
    const data = await response.json();
    return data;
  };
  
  export const fetchLogo = async (ticker) => {
    const response = await fetch(`${API_URL}/api/logo/${ticker}`);
    const { url } = await response.json();
    return url;
  };
  
  export const fetchCurrentPrice = async (ticker) => {
    const response = await fetch(`${API_URL}/api/price/${ticker}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchNews = async (ticker) => {
    const response = await fetch(`${API_URL}/api/news/${ticker}`);
    const data = await response.json();
    return data;
  };
  