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
    //labels: show.map((x) => x.I),
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        /* label: "",
        data: show.map((x) =>
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
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "",
        data: show.map((x) => x.val),
        //data: show.slice(to, from).map((x) => x.val),
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
    setChartArr((pre) => [...pre, setData]);
    setShow((pre) => [...pre, setData]);
  });

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
      let newRes = numberAsinger(res.data);
      setChartArr(newRes);
      setShow(newRes);
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

  const last58 = () => {
    let ar = chartArr.slice(chartArr.length - 56, chartArr.length);
    let arLen = ar.filter((x) => x.val === 1).length;
    if (arLen === 0 && ar.length !== 0) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;
      console.log("sending api call");
      const data = {
        iPOint: chartArr[chartArr.length - 1]?.I,
        number: `DON`,
        time: timestamp,
      };
      sendTdata(data);
    } else console.log(`ar length is ${arLen}`);
  };

  const chek3 = (selecter) => {
    if (selecter === "Player A") {
      let atoken = localStorage.getItem("atoken");
      atoken = JSON.parse(atoken);
      if (atoken.val === false) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const timestamp = `${hours}:${minutes}:${seconds}`;
        chartArr.reduceRight(
          (c, cc, i) => {
            if (c?.i === 10) {
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
              chartArr[i + 2]?.val !== cc.val &&
              c?.elimineter
            ) {
              if (chartArr[i + 2] === undefined) {
                return c;
              }
              console.log(cc.I);
              return { i: c.i + 1, elimineter: true };
            }
            return c;
          },
          { i: 0, elimineter: true }
        );
      }
      if (atoken.val === false) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const timestamp = `${hours}:${minutes}:${seconds}`;
        chartArr.reduceRight(
          (c, cc, i) => {
            if (c?.i === 10) {
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
              chartArr[i + 2]?.val !== cc.val &&
              c?.elimineter
            ) {
              if (chartArr[i + 2] === undefined) {
                return c;
              }
              console.log(cc.I);
              return { i: c.i + 1, elimineter: true };
            }
            return c;
          },
          { i: 0, elimineter: true }
        );
      }
    } else if (selecter === "Player B") {
      let btoken = localStorage.getItem("btoken");
      btoken = JSON.parse(btoken);
      if (btoken.val === false) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const timestamp = `${hours}:${minutes}:${seconds}`;
        chartArr.reduceRight(
          (c, cc, i) => {
            if (c?.i === 3) {
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
              chartArr[i + 2]?.val !== cc.val &&
              c?.elimineter
            ) {
              if (chartArr[i + 2] === undefined) {
                console.log("close");
                return c;
              }
              return { i: c.i + 1, elimineter: true };
            }
            return c;
          },
          { i: 0, elimineter: true }
        );
      }
    }
  };

  const caler = (selecter) => {
    if (selecter === "PLayer A") {
      let atoken = localStorage.getItem("atoken");
      atoken !== null ? JSON.parse(atoken) : "";
      if (atoken.val) {
        if (
          chartArr[chartArr.length - 1]?.val === selecter &&
          chartArr[chartArr.length - 2]?.val === selecter
        ) {
          socket.emit("msg", `${selecter} place bet after 3rd`);
        }
        if (
          chartArr[chartArr.length - 1]?.val === selecter &&
          chartArr[chartArr.length - 2]?.val === selecter &&
          chartArr[chartArr.length - 3]?.val === selecter &&
          chartArr[chartArr.length - 4]?.val === selecter
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
          chartArr[chartArr.length - 1]?.val === selecter &&
          chartArr[chartArr.length - 2]?.val === selecter
        ) {
          socket.emit("msg", `${selecter} expired`);
        }
        if (
          chartArr[chartArr.length - 1]?.val === selecter &&
          chartArr[chartArr.length - 2]?.val === selecter &&
          chartArr[chartArr.length - 3]?.val === selecter &&
          chartArr[chartArr.length - 4]?.val === selecter
        ) {
          socket.emit("msg", `${selecter} expired`);
          localStorage.setItem("btoken", JSON.stringify({ val: false }));
        }
      }
    }
  };

  useEffect(() => {
    seter();
    last58();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {err?.message === undefined ? (
        <Bar
          className="rotate-90 p-6 md:rotate-0"
          data={data1}
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
