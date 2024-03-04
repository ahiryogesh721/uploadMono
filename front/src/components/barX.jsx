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
import jsonData from "../../../front/file_667c37c4-afc3-4ad3-a29d-625c1bd5795f.json";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const socket = io(process.env.NEXT_PUBLIC_SOCK_URL);

export default function BarC({ to, from }) {
  const [chartArr, setChartArr] = useState([]);
  const [show, setShow] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        data: show.map((x) => x.X?.split("x")[0]),
        //data: show.slice(to, from).map((x) => +x.X?.split("x")[0]),
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
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

  const seter = () => {
    if (show.length >= 100) {
      let setArr = show.slice(show.length - 100, show.length);
      setShow(setArr);
    }
    if (chartArr.length >= 350) {
      let setArr = chartArr.slice(chartArr.length - 200, chartArr.length);
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
      {err?.message === undefined ? (
        <div>
          <Bar
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
        </div>
      ) : (
        <div>
          <h1> {err?.message}</h1>
        </div>
      )}
    </div>
  );
}
