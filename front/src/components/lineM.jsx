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
const socket = io(process.env.NEXT_PUBLIC_SOCK_URL);
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

  const down = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}:${seconds}`;
    let ar30 = chartArr.map((x) => (x = { ...x, X: +x.X.split("x")[0] }));
    let val = ar30.reduceRight(
      (c, cc) => {
        c.i++;
        if (5 <= cc.X) {
          c.val = c.val + 1;
        }

        if (c.i === 16) {
          console.log("16:", c.val);
        }
        if (c.i === 30) {
          console.log("30:", c.val);
        }
        if (c.i === 90) {
          console.log("90:", c.val);
        }

        if (c.i === 17 && c.val === 0) {
          const data = {
            iPOint: chartArr[chartArr.length - 1]?.I,
            number: `${c.i}:${c.val}`,
            time: timestamp,
          };
          sendTdata(data);
        } else if (c.i === 30 && c.val <= 1) {
          const data = {
            iPOint: chartArr[chartArr.length - 1]?.I,
            number: `${c.i}:${c.val}`,
            time: timestamp,
          };
          sendTdata(data);
        } else if (c.i === 90 && c.val <= 9) {
          const data = {
            iPOint: chartArr[chartArr.length - 1]?.I,
            number: `${c.i}:${c.val}`,
            time: timestamp,
          };
          sendTdata(data);
        }

        return { ...c, val: Number(c.val) };
      },
      { val: 0, i: 0 }
    );
  };

  const cheker = () => {
    down();
  };

  const seter = () => {
    if (show.length >= 50) {
      let setArr = show.slice(show.length - 50, show.length);
      setShow(setArr);
    }
    if (chartArr.length >= 600) {
      let setArr = chartArr.slice(chartArr.length - 600, chartArr.length);
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
        <div>
          <h1> {err?.message}</h1>
          <Line
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
