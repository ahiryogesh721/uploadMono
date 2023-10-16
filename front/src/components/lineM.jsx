"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "@/api/axios";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import io from "socket.io-client";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);
const socket = io("http://localhost:3100");
export default function LineM() {
  const [chartArr, setChartArr] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    labels: chartArr.map((x) => x.I),
    datasets: [
      {
        label: "M",
        data: chartArr.map((x) => x.buger),
        backgroundColor: "red",
        borderColor: "aqua",
        pointBorderColor: "white",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  socket.on("error", (error) => {
    console.error("Connection error:", error);
  });

  socket.off("banger");
  socket.once("banger", (data) => {
    setChartArr((pre) => [...pre, data]);
  });

  const getData = () => {
    new Promise((resolve, reject) => {
      axios
        .get("/post")
        .then((res) => {
          resolve(setChartArr(res.data));
        })
        .catch((err) => {
          reject(setErr(err));
        });
    });
  };

  const sendTdata = (data) => {
    new Promise(() => {
      axios
        .post("/post/records", data)
        .then((res) => {
          return;
        })
        .catch((err) => {
          return;
        });
    });
  };

  const seterr = () => {
    if (chartArr.length >= 100) {
      let setArr = chartArr.slice(chartArr.length - 100, chartArr.length);
      setChartArr(setArr);
    }
  };

  const chek5 = (ar) => {
    if (ar.length < 30) return false;
    let setAr = ar.map((x) => {
      return { ...x, X: x.X.split("x")[0] };
    });
    let count = 0;
    for (let i = 0; i < setAr.length; i++) {
      if (setAr[i]?.X >= 5) {
        count++;
        if (count > 1) {
          return false;
        }
      }
    }
    return count === 1 || count === 0;
  };

  const sndMsg = () => {
    let obj1 = chartArr[chartArr.length - 1]?.buger;
    let obj2 = chartArr[chartArr.length - 2]?.buger;
    if (obj1 < obj2) {
      let obj3 = chartArr[chartArr.length - 3]?.buger;
      if (obj2 < obj3) {
        let obj4 = chartArr[chartArr.length - 4]?.buger;
        if (obj3 < obj4) {
          let obj5 = chartArr[chartArr.length - 5]?.buger;
          if (obj4 < obj5) {
            let obj6 = chartArr[chartArr.length - 6]?.buger;
            if (obj5 < obj6) {
              let obj7 = chartArr[chartArr.length - 7]?.buger;
              if (obj6 < obj7) {
                let obj = chartArr[chartArr.length - 1];
                const data = {
                  number: "6D",
                  iPOint: obj?.I,
                };
                sendTdata(data);
              }
            }
          }
        }
      }
    }
  };

  const chek1 = (ar) => {
    if (ar.length < 10) return false;
    let setAr = ar.map((x) => {
      return { ...x, X: x.X.split("x")[0] };
    });
    let count = 0;
    for (let i = 0; i < setAr.length; i++) {
      if (setAr[i]?.X >= 2) {
        count++;
        if (count > 1) {
          return false;
        }
      }
    }
    return count === 0;
  };

  const cheker = () => {
    let arr5 = chartArr.slice(chartArr.length - 35, chartArr.length);
    let ar1 = chartArr.slice(chartArr.length - 5, chartArr.length);
    if (chek5(arr5)) {
      let obj = chartArr[chartArr.length - 1];
      const data = {
        number: 5,
        iPOint: obj?.I,
      };
      sendTdata(data);
    } else if (chek1(ar1)) {
      const data = {
        number: 1,
        iPOint: obj?.I,
      };
      sendTdata(data);
    }
    sndMsg();
  };

  useEffect(() => {
    seterr();
    cheker();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center">line chart</h1>
      {err?.message === undefined ? (
        <Line
          className=""
          data={data}
          options={{
            responsive: true,
            scales: {
              y: {
                display: false,
              },
              x: {
                display: false,
              },
            },
          }}
        />
      ) : (
        <h1 className="flex justify-center">{err?.message}</h1>
      )}
    </div>
  );
}
