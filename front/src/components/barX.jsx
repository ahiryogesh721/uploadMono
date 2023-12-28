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
        //data: show.map((x) => x.X?.split("x")[0]),
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

  const chek3 = (selecter) => {
    if (selecter === "Player A") {
      chartArr.reduceRight(
        (c, cc, i) => {
          if (c?.i === 3 && c?.elemineter === false) {
            const data = {
              iPOint: chartArr[chartArr.length - 1]?.I,
              number: `${selecter}`,
              time: timestamp,
            };
            sendTdata(data);
            localStorage.setItem("atoken", JSON.stringify({ val: true }));
          }
          if (
            //cheking for 4
            cc.val === selecter &&
            chartArr[i - 1] === selecter &&
            chartArr[i - 2] === selecter &&
            chartArr[i - 3] === selecter
          ) {
            return { ...c, elemineter: false };
          }
          if (
            //cheking for 3
            cc.val === selecter &&
            chartArr[i - 1] === selecter &&
            chartArr[i + 1] === selecter &&
            chartArr[i - 2] !== selecter &&
            chartArr[i + 2] !== selecter &&
            c?.elemineter
          ) {
            return { ...c, i: c?.i + 1 };
          }
          return c;
        },
        { i: 0, elimineter: true }
      );
    } else if (selecter === "Player B") {
      let bob = chartArr.reduceRight(
        (c, cc, i) => {
          if (c?.i === 3 && c?.elemineter === false) {
            const data = {
              iPOint: chartArr[chartArr.length - 1]?.I,
              number: `${selecter}`,
              time: timestamp,
            };
            sendTdata(data);
            localStorage.setItem("btoken", JSON.stringify({ val: true }));
          }
          if (
            //cheking for 4
            cc.val === selecter &&
            chartArr[i - 1] === selecter &&
            chartArr[i - 2] === selecter &&
            chartArr[i - 3] === selecter
          ) {
            return { ...c, elemineter: false };
          }
          if (
            //cheking for 3
            cc.val === selecter &&
            chartArr[i - 1] === selecter &&
            chartArr[i + 1] === selecter &&
            chartArr[i - 2] !== selecter &&
            chartArr[i + 2] !== selecter &&
            c?.elemineter
          ) {
            return { ...c, i: c?.i + 1 };
          }
          return c;
        },
        { i: 0, elimineter: true }
      );
      console.log(bob);
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

  const sendTdata = async (data) => {
    try {
      await axios.post("/post/records", data);
    } catch (error) {}
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
          socket.emit("msg", selecter);
        }
        if (
          chartArr[chartArr.length - 1] === selecter &&
          chartArr[chartArr.length - 2] === selecter &&
          chartArr[chartArr.length - 3] === selecter &&
          chartArr[chartArr.length - 4] === selecter
        ) {
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
          socket.emit("msg", selecter);
        }
        if (
          chartArr[chartArr.length - 1] === selecter &&
          chartArr[chartArr.length - 2] === selecter &&
          chartArr[chartArr.length - 3] === selecter &&
          chartArr[chartArr.length - 4] === selecter
        ) {
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
