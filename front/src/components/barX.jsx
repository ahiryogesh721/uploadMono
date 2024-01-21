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
      //const res = await axios.get("/cards");
      //let newRes = numberAsinger(con2(res.data));
      setChartArr(require("../../../front/data.json"));
      setShow(require("../../../front/data.json"));
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
    let li1v = chartArr[chartArr.length - 1]?.val;
    let li2v = chartArr[chartArr.length - 2]?.val;
    let li3v = chartArr[chartArr.length - 3]?.val;
    let li4v = chartArr[chartArr.length - 4]?.val;
    let li5v = chartArr[chartArr.length - 5]?.val;

    let con1 = li1v === li2v;
    let con2 = li2v === li3v;
    let con3 = li3v === li4v;
    let con4 = li4v !== li5v;

    console.log(li1v, li2v, li3v, li4v, li5v);
    console.log(con1, con2, con3, con4);

    if (con1 && con2 && con3 && con4) {
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
        let li1v = chartArr[chartArr.length - 1]?.val;
        let li2v = chartArr[chartArr.length - 2]?.val;
        let li3v = chartArr[chartArr.length - 3]?.val;
        let li4v = chartArr[chartArr.length - 4]?.val;
        let li5v = chartArr[chartArr.length - 5]?.val;
        let li6v = chartArr[chartArr.length - 6]?.val;

        if (
          li1v === li2v &&
          li2v === li3v &&
          li3v === li4v &&
          li4v === li5v &&
          li5v === li6v
        ) {
          socket.emit("msg", "pass");
          localStorage.setItem("c6", JSON.stringify({ val: false }));
        }
      }
    }
  };

  const c10 = () => {
    let ar = chartArr.slice(chartArr.length - 11, chartArr.length - 1);
    let abVal = ar.reduce(
      (c, cc) => {
        if (cc.val === "Player A") {
          return { ...c, a: c.a + 1 };
        } else if (cc.val == "Player B") {
          return { ...c, b: c.b + 1 };
        }
        return c;
      },
      { a: 0, b: 0 }
    );
    console.log(abVal);
    let token = localStorage.getItem("c10");
    if (token !== null) {
      token = JSON.parse(token);
      let currentDate = new Date();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      let timestamp = hours + ":" + minutes + ":" + seconds;
      if (token.a && abVal.a <= 2 && ar.length !== 0) {
        const data = {
          iPOint: chartArr[chartArr.length - 1]?.I,
          number: "A",
          time: timestamp,
        };
        sendTdata(data);
        localStorage.setItem("c10", JSON.stringify({ ...token, a: false }));
        localStorage.setItem(
          "TFS",
          JSON.stringify({
            target: "Player A",
            curentWin: chartArr[chartArr.length - 1]?.val,
          })
        );
      } else if (token.b && abVal.b <= 2 && ar.length !== 0) {
        const data = {
          iPOint: chartArr[chartArr.length - 1]?.I,
          number: "B",
          time: timestamp,
        };
        sendTdata(data);
        localStorage.setItem("c10", JSON.stringify({ ...token, b: false }));
        localStorage.setItem(
          "TFS",
          JSON.stringify({
            target: "Player B",
            curentWin: chartArr[chartArr.length - 1]?.val,
          })
        );
      } else if (token.a === false && abVal.a >= 5 && ar.length !== 0) {
        localStorage.setItem("c10", JSON.stringify({ ...token, a: true }));
      } else if (token.b === false && abVal.b >= 5 && ar.length !== 0) {
        localStorage.setItem("c10", JSON.stringify({ ...token, b: true }));
      }
    }
  };

  const statusSeter = () => {
    let token = localStorage.getItem("TFS");

    const watcher = () => {
      if (token.target === chartArr[chartArr.length - 2]?.val) {
        chartArr[chartArr.length - 1]?.val === token.target
          ? socket.emit("msg", "pass")
          : socket.emit("msg", "fails");
        localStorage.removeItem("TFS");
      }
    };

    const skiper = () => {
      let alows = false;
      if (chartArr[chartArr.length - 1]?.val !== token.target) {
        alows = true;
      }
      alows ? watcher() : "";
    };
    if (token !== null) {
      token = JSON.parse(token);
      token.target === token.curentWin ? skiper() : watcher();
    }
  };

  useEffect(() => {
    //seter();
    //c10();
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
