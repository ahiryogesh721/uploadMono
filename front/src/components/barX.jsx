"use client";
import axios from "@/api/axios";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import io from "socket.io-client";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const socket = io("http://localhost:3100");

export default function BarC() {
  const [chartArr, setChartArr] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    labels: chartArr.map((x) => x.I),
    datasets: [
      {
        label: "X",
        data: chartArr.map((x) => x.X.split("x")[0]),
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("error", (error) => {
    console.error("Connection error:", error);
  });

  socket.off("banger");
  socket.once("banger", (data) => {
    setChartArr((pre) => [...pre, data]);
  });

  const getData = () => {
    new Promise(function (resolve, rejected) {
      axios
        .get("/post")
        .then((res) => {
          resolve(setChartArr(res.data));
        })
        .catch((err) => {
          rejected(setErr(err));
        });
    });
  };

  const seterr = () => {
    if (chartArr.length >= 100) {
      let setArr = chartArr.slice(chartArr.length - 100, chartArr.length);
      setChartArr(setArr);
    }
  };

  useEffect(() => {
    seterr();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="flex justify-center">bar chart</h1>
      {err?.message === undefined ? (
        <Bar data={data} options={{}} />
      ) : (
        <h1 className="flex justify-center">{err?.message}</h1>
      )}
    </>
  );
}
