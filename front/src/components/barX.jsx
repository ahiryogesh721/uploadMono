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
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        data: show.map((x) =>
          x.val === "Player A" ? 1 : x.val === "Player B" ? 2 : 0
        ),
        /* data: show
          .slice(to, from)
          .map((x) =>
            x.val === "Player A" ? 1 : x.val === "Player B" ? 2 : 0
          ), */
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
    setChartArr((pre) => [...pre, data]);
    setShow((pre) => [...pre, data]);
  });

  const getData = async () => {
    try {
      const res = await axios.get("/cards");
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

  const chek3 = (selecter) => {
    if (selecter === "Player A") {
      chartArr.reduceRight(
        (c, cc, i) => {
          if (c?.i === 3 && c?.elemineter) {
            const data = {
              iPOint: chartArr[chartArr.length - 1]?.I,
              number: `${selecter} inbounde`,
              time: timestamp,
            };
            sendTdata(data);
            localStorage.setItem("atoken", JSON.stringify({ val: true }));
          }
          if (
            cc.val === selecter &&
            chartArr[i - 1]?.val === selecter &&
            chartArr[i - 2]?.val === selecter &&
            chartArr[i - 3]?.val === selecter
          ) {
            return { ...c, elimineter: false };
          }
          if (
            cc.val === selecter &&
            chartArr[i - 1]?.val === cc.val &&
            chartArr[i - 2]?.val !== cc.val &&
            chartArr[i + 1]?.val === cc.val &&
            chartArr[i + 2]?.val !== cc.val
          ) {
            return { i: c.i + 1, elimineter: true };
          }
          return c;
        },
        { i: 0, elimineter: true }
      );
    } else if (selecter === "Player B") {
      chartArr.reduceRight(
        (c, cc, i) => {
          if (c?.i === 3 && c?.elemineter) {
            const data = {
              iPOint: chartArr[chartArr.length - 1]?.I,
              number: `${selecter} inbounde`,
              time: timestamp,
            };
            sendTdata(data);
            localStorage.setItem("btoken", JSON.stringify({ val: true }));
          }
          if (
            cc.val === selecter &&
            chartArr[i - 1]?.val === selecter &&
            chartArr[i - 2]?.val === selecter &&
            chartArr[i - 3]?.val === selecter
          ) {
            return { ...c, elimineter: false };
          }
          if (
            cc.val === selecter &&
            chartArr[i - 1]?.val === cc.val &&
            chartArr[i - 2]?.val !== cc.val &&
            chartArr[i + 1]?.val === cc.val &&
            chartArr[i + 2]?.val !== cc.val
          ) {
            return { i: c.i + 1, elimineter: true };
          }
          return c;
        },
        { i: 0, elimineter: true }
      );
    }
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

  const caler = (selecter) => {
    if (selecter === "PLayer A") {
      let atoken = localStorage.getItem("atoken");
      atoken !== null ? JSON.parse(atoken) : "";
      if (atoken.val) {
        if (
          chartArr[chartArr.length - 1] === selecter &&
          chartArr[chartArr.length - 2] === selecter
        ) {
          socket.emit("msg", `${selecter} place bet after 3rd`);
        }
        if (
          chartArr[chartArr.length - 1] === selecter &&
          chartArr[chartArr.length - 2] === selecter &&
          chartArr[chartArr.length - 3] === selecter &&
          chartArr[chartArr.length - 4] === selecter
        ) {
          socket.emit("msg", `${selecter} expired`);
          localStorage.setItem("atoken", JSON.stringify({ val: false }));
        }
      }
    } else if (selecter === "PLayer B") {
      let btoken = localStorage.getItem("btoken");
      btoken !== null ? JSON.parse(btoken) : "";
      if (btoken.val) {
        if (
          chartArr[chartArr.length - 1] === selecter &&
          chartArr[chartArr.length - 2] === selecter
        ) {
          socket.emit("msg", `${selecter} expired`);
        }
        if (
          chartArr[chartArr.length - 1] === selecter &&
          chartArr[chartArr.length - 2] === selecter &&
          chartArr[chartArr.length - 3] === selecter &&
          chartArr[chartArr.length - 4] === selecter
        ) {
          socket.emit("msg", `${selecter} expired`);
          localStorage.setItem("btoken", JSON.stringify({ val: false }));
        }
      }
    }
  };

  useEffect(() => {
    seter();
    chek3("Player A");
    chek3("Player B");
    caler("Player A");
    caler("Player B");
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {err?.message === undefined ? (
        <Bar
          className="rotate-90 p-6 md:rotate-0"
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
