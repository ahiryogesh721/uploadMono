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
export default function L1({ to, from }) {
  const [chartArr, setChartArr] = useState([]);
  const [show, setShow] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        data: show.map((x) => x.ST),
        //data: show.slice(to, from).map((x) => x.ST),
        backgroundColor: "black",
        borderColor: "blue",
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
                display: true,
              },
              x: {
                display: true,
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
                  display: true,
                },
                x: {
                  display: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
