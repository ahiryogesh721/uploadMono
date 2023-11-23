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
export default function LineM({ to, from, c1, c2 }) {
  const [chartArr, setChartArr] = useState([]);
  const [show, setShow] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        data: show.map((x) => x.buger),
        //data: show.slice(to, from).map((x) => x.buger),
        backgroundColor: "black",
        borderColor: "red",
        pointBorderColor: "blue",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  function changer(data) {
    const uniqueIds = new Set();
    return data.filter((entry) => {
      if (uniqueIds.has(entry.I)) {
        return false;
      }

      uniqueIds.add(entry.I);

      return true;
    });
  }

  socket.on("error", (error) => {
    console.error("Connection error:", error);
  });

  socket.off("banger");
  socket.once("banger", (data) => {
    setChartArr((pre) => changer([...pre, data]));
    setShow((pre) => changer([...pre, data]));
  });

  const getData = async () => {
    try {
      const res = await axios.get("/post");
      setChartArr(changer(res.data));
      setShow(changer(res.data));
    } catch (error) {
      setErr(error);
    }
  };

  const sendTdata = async (data) => {
    try {
      await axios.post("/post/records", data);
    } catch (error) {}
  };

  const loop = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}:${seconds}`;
    let ar30 = chartArr.map((x) => (x = { ...x, X: +x.X.split("x")[0] }));
    let val = ar30.reduceRight(
      (c, cc) => {
        c.i++;
        if (2.85 < cc.X) {
          if (9 <= cc.X) c.val = c.val + 0.8;
          else if (6 <= cc.X) c.val = c.val + 0.6;
          else if (2.85 < cc.X) c.val = c.val + 0.3;
        }

        if (30 === c.i) {
          console.log("30", c);
        } else if (50 === c.i) {
          console.log("50", c);
        } else if (75 === c.i) {
          console.log("75", c);
        } else if (150 === c.i) {
          console.log("150", c);
        }

        if (30 <= c.i && c.i <= 35 && c.val <= 2.9) {
          const data = {
            iPOint: chartArr[chartArr.length - 1]?.I,
            number: `${c.i}:${c.val}`,
            time: timestamp,
          };
          sendTdata(data);
        } else if (50 <= c.i && c.i <= 55 && c.val <= 3.5) {
          const data = {
            iPOint: chartArr[chartArr.length - 1]?.I,
            number: `${c.i}:${c.val}`,
            time: timestamp,
          };
          sendTdata(data);
        } else if (70 <= c.i && c.i <= 85 && c.val <= 7.5) {
          const data = {
            iPOint: chartArr[chartArr.length - 1]?.I,
            number: `${c.i}:${c.val}`,
            time: timestamp,
          };
          sendTdata(data);
        } else if (150 <= c.i && c.i <= 190 && c.val <= 18) {
          const data = {
            iPOint: chartArr[chartArr.length - 1]?.I,
            number: `${c.i}:${c.val}`,
            time: timestamp,
          };
          sendTdata(data);
        }
        return { ...c, val: Number(c.val.toFixed(2)) };
      },
      { val: 0, i: 0 }
    );
  };

  const bob = () => {
    let I1 = chartArr.findIndex((x) => x.I === c1),
      I2 = chartArr.findIndex((x) => x.I === c2);
    let ar30 = chartArr.slice(I1, I2);
    ar30 = ar30.map((x) => (x = { ...x, X: +x.X.split("x")[0] }));
    const val2 = ar30.reduceRight(
      (c, cc) => {
        c.i++;
        if (2.85 < cc.X) {
          if (9 <= cc.X) c.val = c.val + 0.8;
          else if (6 <= cc.X) c.val = c.val + 0.6;
          else if (2.85 < cc.X) c.val = c.val + 0.3;
        }
        return { ...c, val: Number(c.val.toFixed(2)) };
      },
      { val: 0, i: 0 }
    );
    console.log(ar30[0]?.I, ar30[ar30.length - 1]?.I, val2);
  };

  const cheker = () => {
    loop();
    //bob();
  };

  const seter = () => {
    if (show.length >= 100) {
      let setArr = show.slice(show.length - 100, show.length);
      setShow(setArr);
    } else if (chartArr.length >= 500) {
      let setArr = chartArr.slice(chartArr.length - 500, chartArr.length);
      setChartArr(setArr);
    }
  };

  useEffect(() => {
    cheker();
    seter();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>buger</h1>
      {err?.message === undefined ? (
        <Line
          className="rotate-90 p-6 md:rotate-0"
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
        <div className="flex justify-center">
          <h1> {err?.message}</h1>
          <Line
            className="rotate-90 p-6 md:rotate-0"
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
        </div>
      )}
    </div>
  );
}
