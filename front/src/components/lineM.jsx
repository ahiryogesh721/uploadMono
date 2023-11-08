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
        pointBorderColor: "black",
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

  const getData = () => {
    new Promise(() => {
      axios
        .get("/post")
        .then((res) => {
          setChartArr(res.data);
          setShow(res.data);
        })
        .catch((err) => {
          setErr(err);
        });
    });
  };

  const sendTdata = async (data) => {
    try {
      await axios.post("/post/records", data);
    } catch (error) {}
  };

  const S3 = () => {
    let token = localStorage.getItem("token");
    if (token === null) return;
    token = JSON.parse(token);
    const now = new Date();
    if (now.getTime() > token.exp) localStorage.removeItem("token");
    let l1 = +chartArr[chartArr.length - 1]?.X.split("x")[0];
    let l2 = +chartArr[chartArr.length - 2]?.X.split("x")[0];
    let l3 = +chartArr[chartArr.length - 3]?.X.split("x")[0];
    if (l1 < 3 && l2 < 3 && l3 < 3) {
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;
      socket.emit("msg", timestamp);
    }
  };

  const loop = () => {
    let ar30 = chartArr.slice(chartArr.length - 30, chartArr.length);
    ar30 = ar30;
    ar30 = ar30.map((x) => (x = { ...x, X: +x.X.split("x")[0] }));
    const val = ar30.reduceRight(
      (c, cc) => {
        c.i++;
        if (2.85 < cc.X) {
          if (9 <= cc.X) c.val = c.val + 0.8;
          else if (5 <= cc.X) c.val = c.val + 0.6;
          else if (2.85 < cc.X) c.val = c.val + 0.3;
        }
        return { ...c, val: Number(c.val.toFixed(2)) };
      },
      { val: 0, i: 0 }
    );
    console.log(val.val);
    if (val.val <= 3 && val.i >= 30) {
      let SAM = ar30.slice(0, 25);
      const SAMVAL = SAM.reduceRight(
        (c, cc) => {
          c.i++;
          if (2.85 < cc.X) {
            if (9 <= cc.X) c.val = c.val + 0.8;
            else if (5 <= cc.X) c.val = c.val + 0.6;
            else if (2.85 < cc.X) c.val = c.val + 0.3;
          }
          return { ...c, val: Number(c.val.toFixed(2)) };
        },
        { val: 0, i: 0 }
      );
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;
      const data = {
        iPOint: chartArr[chartArr.length - 1]?.I,
        number: `25:${SAMVAL.val} 30:${val.val}`,
        time: timestamp,
      };
      sendTdata(data);
      /* const item = {
        exp: now.getTime() + 30 * 60 * 1000,
      };
      localStorage.setItem("token", JSON.stringify(item)); */
    }
  };

  const cheker = () => {
    loop();
    S3();
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
        <h1 className="flex justify-center">{err?.message}</h1>
      )}
    </div>
  );
}
