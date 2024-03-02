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
    labels: show.map((x) => x.time),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        data: show.map((x) => x.buger),
        //data: show.slice(to, from).map((x) => x.buger),
        backgroundColor: "blue",
        borderColor: "black",
        pointBorderColor: "blue",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const data1 = {
    labels: show.slice(show.length - 100, show.length).map((x) => x.I),
    //labels: show.slice(to - 2000, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        data: show.slice(show.length - 100, show.length).map((x) => x.buger),
        //data: show.slice(to - 2000, from).map((x) => x.buger),
        backgroundColor: "red",
        borderColor: "blue",
        pointBorderColor: "black",
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

  const seter = () => {
    if (show.length >= 10) {
      let setArr = show.slice(show.length - 3000, show.length);
      setShow(setArr);
    }
    if (chartArr.length >= 2000) {
      let setArr = chartArr.slice(chartArr.length - 2000, chartArr.length);
      setChartArr(setArr);
    }
  };

  useEffect(() => {
    seter();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  console.log(show);
  return (
    <div>
      {err?.message === undefined ? (
        <div>
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
          <Line
            className="rotate-90 p-6 md:rotate-0"
            data={data1}
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
      ) : (
        <div>
          <h1> {err?.message}</h1>
        </div>
      )}
    </div>
  );
}
