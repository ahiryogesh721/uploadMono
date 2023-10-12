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

  const cheker = (arr) => {
    let objM1 = chartArr[chartArr.length - 1];
    let objM2 = chartArr[chartArr.length - 2];
    if (objM1?.buger < objM2?.buger) {
      let objM2 = chartArr[chartArr.length - 2];
      let objM3 = chartArr[chartArr.length - 3];
      if (objM2?.buger < objM3?.buger) {
        let objM3 = chartArr[chartArr.length - 3];
        let objM4 = chartArr[chartArr.length - 4];
        if (objM3?.buger < objM4?.buger) {
          let objM4 = chartArr[chartArr.length - 4];
          let objM5 = chartArr[chartArr.length - 5];
          if (objM4.buger < objM5?.buger) {
            let objM5 = chartArr[chartArr.length - 5];
            let objM6 = chartArr[chartArr.length - 6];
            if (objM5?.buger < objM6?.buger) {
              let objM6 = chartArr[chartArr.length - 6];
              let objM7 = chartArr[chartArr.length - 7];
              if (objM6?.buger < objM7?.buger) {
                let objM7 = chartArr[chartArr.length - 7];
                let objM8 = chartArr[chartArr.length - 8];
                if (objM7?.buger < objM8?.buger) {
                  let objM8 = chartArr[chartArr.length - 8];
                  let objM9 = chartArr[chartArr.length - 9];
                  if (objM8?.buger < objM9?.buger) {
                    let objM9 = chartArr[chartArr.length - 9];
                    let objM10 = chartArr[chartArr.length - 10];
                    if (objM9?.buger < objM10?.buger) {
                      let objM10 = chartArr[chartArr.length - 10];
                      let objM11 = chartArr[chartArr.length - 11];
                      if (objM10?.buger < objM11?.buger) {
                        const sendData = {
                          iPOint: objM11?.I,
                          iPointSBuger: objM11?.buger,
                          iPointEBuger: objM1?.buger,
                        };
                        sendTdata(sendData);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    seterr();
    cheker();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="flex justify-center">line chart</h1>
      {err?.message === undefined ? (
        <Line data={data} options={{}} />
      ) : (
        <h1 className="flex justify-center">{err?.message}</h1>
      )}
    </>
  );
}
