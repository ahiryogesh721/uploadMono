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

const socket = io(process.env.NEXT_PUBLIC_SOCK_URL);

export default function BarC({ to, from }) {
  const [chartArr, setChartArr] = useState([]);
  const [show, setShow] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    /* labels: show.map((x) => {
      function millisecondsToHMS(milliseconds) {
        var seconds = Math.floor(milliseconds / 1000);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var remainingSeconds = Math.floor(seconds % 60);

        // Add leading zeros if necessary
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        remainingSeconds =
          remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

        return "==>>" + hours + ":" + minutes + ":" + remainingSeconds;
      }
      return x.I; //millisecondsToHMS(x.time);
    }), */
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        /* data: show.map((x) =>
          x.val === "Player A" ? 1 : x.val === "Player B" ? 2 : 0
        ), */
        data: show
          .slice(to, from)
          .map((x) =>
            x.val === "Player A" ? 1 : x.val === "Player B" ? 2 : 0
          ),
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const data1 = {
    //labels: show.map((x) => x.I),
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        //data: show.map((x) => x.val),
        data: show.slice(to, from).map((x) => x.val),
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  socket.on("error", (error) => {
    console.error("Connection error:", error);
  });

  socket.off("banger");
  socket.once("banger", (data) => {
    let setData = data;
    if (data.val[0] === "A") {
      setData.val = 1;
    } else if (data.val[0] === "B") {
      setData.val = 2;
    } else if (data.val[0] === "C") {
      setData.val = 3;
    } else if (data.val[0] === "D") {
      setData.val = 4;
    } else if (data.val[0] === "E") {
      setData.val = 5;
    } else if (data.val[0] === "F") {
      setData.val = 6;
    } else setData = setData;
    setChartArr((pre) => [...pre, data]);
    setShow((pre) => [...pre, data]);
  });

  function con2(arr) {
    return arr.map((x, I) => {
      if (x.val === 2 && x.I > 20) {
        let finder = true;
        let i = 1;
        while (finder) {
          let indexOfBreker = I - i;
          if (x.val === 2) {
            finder = false;
            return {
              ...x,
              D2: i,
            };
          }
          i++;
        }
      }
      return {
        ...x,
        D2: 0,
      };
    });
  }

  const numberAsinger = (arr) => {
    let newArr = arr.map((x) => {
      return { ...x, val: x.val[0] };
    });
    return newArr.map((x) => {
      if (x.val === "A") {
        return { ...x, val: 1 };
      } else if (x.val === "B") {
        return { ...x, val: 2 };
      } else if (x.val === "C") {
        return { ...x, val: 3 };
      } else if (x.val === "D") {
        return { ...x, val: 4 };
      } else if (x.val === "E") {
        return { ...x, val: 5 };
      } else if (x.val === "F") {
        return { ...x, val: 6 };
      } else return x;
    });
  };

  const getData = async () => {
    try {
      const res = await axios.get("/cards");
      let newRes = numberAsinger(con2(res.data));
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

  const seter = () => {
    if (show.length >= 100) {
      let setArr = show.slice(show.length - 100, show.length);
      setShow(setArr);
    }
    if (chartArr.length >= 350) {
      let setArr = chartArr.slice(chartArr.length - 350, chartArr.length);
      setChartArr(setArr);
    }
  };

  const l5 = () => {
    if (
      chartArr[chartArr.length - 1]?.val ===
        chartArr[chartArr.length - 2]?.val &&
      chartArr[chartArr.length - 2]?.val ===
        chartArr[chartArr.length - 3]?.val &&
      chartArr[chartArr.length - 3]?.val ===
        chartArr[chartArr.length - 4]?.val &&
      chartArr[chartArr.length - 4]?.val !== chartArr[chartArr.length - 5]?.val
    ) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;
      const data = {
        iPOint: chartArr[chartArr.length - 1]?.I,
        number: chartArr[chartArr.length - 1]?.val,
        time: timestamp,
      };
      sendTdata(data);
      localStorage.setItem("c6", JSON.stringify({ val: true }));
    }
  };

  const caler = () => {
    let token = localStorage.getItem("c6");
    if (token !== null) {
      token = JSON.stringify(token);
      if (token.val) {
        if (
          chartArr[chartArr.length - 1]?.val ===
            chartArr[chartArr.length - 2]?.val &&
          chartArr[chartArr.length - 2]?.val ===
            chartArr[chartArr.length - 3]?.val &&
          chartArr[chartArr.length - 3]?.val ===
            chartArr[chartArr.length - 4]?.val &&
          chartArr[chartArr.length - 4]?.val ===
            chartArr[chartArr.length - 5]?.val &&
          chartArr[chartArr.length - 6]?.val ===
            chartArr[chartArr.length - 6]?.val
        ) {
          socket.emit("msg", "pass");
          localStorage.setItem("c6", JSON.stringify({ val: false }));
        } else if (
          chartArr[chartArr.length - 1]?.val ===
            chartArr[chartArr.length - 2]?.val &&
          chartArr[chartArr.length - 2]?.val ===
            chartArr[chartArr.length - 3]?.val &&
          chartArr[chartArr.length - 3]?.val ===
            chartArr[chartArr.length - 4]?.val &&
          chartArr[chartArr.length - 4]?.val ===
            chartArr[chartArr.length - 5]?.val &&
          chartArr[chartArr.length - 5]?.val !==
            chartArr[chartArr.length - 6]?.val
        ) {
          socket.emit("msg", "faill");
          localStorage.setItem("c6", JSON.stringify({ val: false }));
        }
      }
    }
  };

  useEffect(() => {
    //seter();
    l5();
    caler();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {err?.message === undefined ? (
        <Bar
          data={data}
          options={{
            responsive: true,
            scales: {
              y: {
                display: true,
              },
            },
          }}
        />
      ) : (
        <div>
          <h1> {err?.message}</h1>
          <Bar
            data={data}
            options={{
              responsive: true,
              scales: {
                y: {
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
