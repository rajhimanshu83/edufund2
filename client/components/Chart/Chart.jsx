import React from "react";
import { fetchDailyData } from "../../lib";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import TimePicker from "./TimerPicker/TimePicker";
import { Price } from "../index";

import styles from "./Chart.module.css";
import moment from 'moment';
import * as d3 from "d3";

const Chart = ({ ticker }) => {
  const [dailyData, setDailyData] = useState([]);
  const [timePeriod, setTimePeriod] = useState("1m");
  // const { deviation, setDeviation } = useContext(AppContext);
  // const { returns, setReturns } = useContext(AppContext);
  let sortedDailyData;
  let deviation;
  let averageReturn;
  if(timePeriod === "1D") {
    sortedDailyData = dailyData.reverse();
  } else {
     sortedDailyData = dailyData.sort((a, b) => moment(b.date).format('YYYYMMDD') - moment(a.date).format('YYYYMMDD'));
  }
  if(sortedDailyData.length > 0) {
    const ret = sortedDailyData.map((data,i,elements) =>{
      let calculatedreturn;
      let nextDate = elements[i+1];
      if(i == sortedDailyData.length -1) {
        return calculatedreturn = 0;
      }
      if(!data.close || !nextDate.close) {
        return calculatedreturn = 0;
      }
      calculatedreturn = ((data.close/nextDate.close)-1)*100;
      return Number(calculatedreturn.toFixed(4));
    })
    const filteredData = ret.filter(item => item);
    if(filteredData.length > 0){
      deviation = d3.deviation(filteredData, r => r).toFixed(4);
      averageReturn = d3.mean(filteredData).toFixed(4);
    }
    // setDeviation(`${devia}`);
  }

  // console.log(returns)
  useEffect(() => {
    const fetch = async () => {
      setDailyData(await fetchDailyData(ticker, timePeriod));
    };
    fetch();
  }, [ticker, timePeriod]);
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const height = document.getElementById("chart-wrapper").offsetHeight;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#41E2BA");
    gradient.addColorStop(1, "rgba(65,225,186,0)");
    return {
      labels: dailyData.map(({ date }) => date).reverse(),
      datasets: [
        {
          data: dailyData.map(({ close }) => close).reverse(),
          label: "Close Price",
          pointRadius: 0,
          lineTension: 0.1,
          backgroundColor: gradient,
          borderColor: "#41E2BA",
        },
      ],
    };
  };

  const options = {
    legend: { display: false },
    scales: { xAxes: [{ display: true }] },
  };

  return (
    <>
    <div className={styles.container}>
      <TimePicker setTimePeriod={setTimePeriod} />
      <div id="chart-wrapper" className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
    </div>
    <Price deviation={deviation} returns={averageReturn}/>
  {/* <div>{deviation} {averageReturn}</div> */}
    </>
  );
};

export default Chart;
