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
export default function LineM({ to, from }) {
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

  socket.on("error", (error) => {
    console.error("Connection error:", error);
  });

  socket.off("banger");
  socket.once("banger", (data) => {
    setChartArr((pre) => [...pre, data]);
    setShow((pre) => [...pre, data]);
  });

  const getData = async () => {
    try {
      const res = await axios.get("/post");
      setChartArr(res.data);
      setShow(res.data);
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
    let ar30 = chartArr.slice(chartArr.length - 30, chartArr.length);
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
    console.log(val2.val);
    if (val2.val <= 3.2 && val2.i >= 30) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;
      const data = {
        iPOint: chartArr[chartArr.length - 1]?.I,
        number: `3:${val2.val}`,
        time: timestamp,
      };
      sendTdata(data);
      /* let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token.val9 = true;
      token.valL = false;
      localStorage.setItem("token", JSON.stringify(token)); */
    }
  };

  const c9 = () => {
    console.log("caling c9");
    let ar = chartArr.slice(chartArr.length - 9, chartArr.length);
    ar = ar.map((x) => +x.X.split("x")[0]);
    const val = ar.filter((x) => x >= 5);
    if (val.length === 0) {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token.valC = true;
      token.val9 = false;
      localStorage.setItem("token", JSON.stringify(token));
    }
  };

  const cancel = () => {
    console.log("caling cancel");
    let lastX = +chartArr[chartArr.length - 1]?.X.split("x")[0];
    if (lastX >= 5) {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      token.valL = true;
      token.valC = false;
      localStorage.setItem("token", JSON.stringify(token));
    }
  };

  const cheker = () => {
    /* let token = localStorage.getItem("token");
    token = JSON.parse(token);
    if (token?.valC) {
      cancel();
    }
    if (token?.val9) {
      c9();
    }
    if (token?.valL) {
    } */
    loop();
  };

  const seter = () => {
    if (show.length >= 100) {
      let setArr = show.slice(show.length - 100, show.length);
      setShow(setArr);
    }
    if (chartArr.length >= 500) {
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
