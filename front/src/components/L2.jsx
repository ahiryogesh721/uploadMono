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
export default function L1({ to, from, c1, c2 }) {
  const [chartArr, setChartArr] = useState([]);
  const [show, setShow] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "2",
        data: show.map((x) => x.D3),
        //data: show.slice(to, from).map((x) => x.D2),
        backgroundColor: "pink",
        borderColor: "plink",
        pointBorderColor: "black",
        fill: true,
        tension: 0.1,
      },
      {
        label: "3",
        //data: show.map((x) => x.D3),
        data: show.slice(to, from).map((x) => x.D3),
        backgroundColor: "yellow",
        borderColor: "yellow",
        pointBorderColor: "black",
        fill: true,
        tension: 0.1,
      },
      {
        label: "5",
        data: show.map((x) => x.D5),
        //data: show.slice(to, from).map((x) => x.D5),
        backgroundColor: "red",
        borderColor: "red",
        pointBorderColor: "black",
        fill: true,
        tension: 0.1,
      },
      {
        label: "10",
        data: show.map((x) => x.D10),
        //data: show.slice(to, from).map((x) => x.D10),
        backgroundColor: "blue",
        borderColor: "blue",
        pointBorderColor: "black",
        fill: true,
        tension: 0.1,
      },
      {
        label: "20",
        data: show.map((x) => x.D20),
        //data: show.slice(to, from).map((x) => x.D20),
        backgroundColor: "white",
        borderColor: "white",
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

  function con2(arr) {
    return arr.map((x, I) => {
      if (+x.X?.split("x")[0] >= 2 && I > 20) {
        let finder = true;
        let i = 1;
        while (finder) {
          let indexOfBreker = I - i;
          let lx = arr[indexOfBreker]?.X?.split("x")[0];
          if (lx >= 2) {
            finder = false;
            return {
              ...x,
              D2: i <= 2 ? -i : i - 1,
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

  function con3(arr) {
    return arr.map((x, I) => {
      if (+x.X?.split("x")[0] >= 3 && I > 30) {
        let finder = true;
        let i = 1;
        while (finder) {
          let indexOfBreker = I - i;
          let lx = arr[indexOfBreker]?.X?.split("x")[0];
          if (lx >= 3) {
            finder = false;
            return {
              ...x,
              D3: i <= 2 ? -i : i - 1,
            };
          }
          i++;
        }
      }
      return {
        ...x,
        D3: 0,
      };
    });
  }

  function con5(arr) {
    return arr.map((x, I) => {
      if (+x.X?.split("x")[0] >= 5 && I > 50) {
        let finder = true;
        let i = 1;
        while (finder) {
          let indexOfBreker = I - i;
          let lx = arr[indexOfBreker]?.X?.split("x")[0];
          if (lx >= 5) {
            finder = false;
            return {
              ...x,
              D5: i <= 5 ? -i : i - 1,
            };
          }
          i++;
        }
      }
      return {
        ...x,
        D5: 0,
      };
    });
  }

  function con10(arr) {
    return arr.map((x, I) => {
      if (+x.X?.split("x")[0] >= 10 && I > 100) {
        let finder = true;
        let i = 1;
        while (finder) {
          let indexOfBreker = I - i;
          let lx = arr[indexOfBreker]?.X?.split("x")[0];
          if (lx >= 10) {
            finder = false;
            return {
              ...x,
              D10: i <= 3 ? -i : i - 1,
            };
          }
          i++;
        }
      }
      return {
        ...x,
        D10: 0,
      };
    });
  }

  function con20(arr) {
    return arr.map((x, I) => {
      if (+x.X?.split("x")[0] >= 20 && I > 100) {
        let finder = true;
        let i = 1;
        while (finder) {
          let indexOfBreker = I - i;
          let lx = arr[indexOfBreker]?.X?.split("x")[0];
          if (lx >= 10) {
            finder = false;
            return {
              ...x,
              D20: i <= 5 ? -i + -1 : i - 1,
            };
          }
          i++;
        }
      }
      return {
        ...x,
        D20: 0,
      };
    });
  }

  socket.on("error", (error) => {
    console.error("Connection error:", error);
  });

  socket.off("banger");
  socket.once("banger", (data) => {
    let ar = [...chartArr, data];
    let newArr = changer(con2(con3(con5(con10(con20(ar))))));
    setChartArr(newArr);
    setShow(newArr);
  });

  const getData = async () => {
    try {
      const res = await axios.get("/post");
      const seterArr = con2(con3(con5(con10(con20(res.data)))));
      setChartArr(changer(seterArr));
      setShow(changer(seterArr));
    } catch (error) {
      setErr(error);
    }
  };

  const seter = () => {
    if (show.length >= 100) {
      let setArr = show.slice(show.length - 100, show.length);
      setShow(setArr);
    }
    if (chartArr.length >= 800) {
      let setArr = chartArr.slice(chartArr.length - 800, chartArr.length);
      setChartArr(setArr);
    }
  };

  const sendTdata = async (data) => {
    try {
      await axios.post("/post/records", data);
    } catch (error) {}
  };

  const cheker = () => {
    const re10 = () => {
      let ar = chartArr.slice(chartArr.length - 10, chartArr.length);
      ar = ar.map((x) => (x = { ...x, X: +x.X?.split("x")[0] }));
      const diss = ar.filter((x) => x?.X >= 10).length;
      if (
        chartArr[chartArr.length - 11]?.D10 !== 1 &&
        diss === 0 &&
        chartArr.length >= 80
      ) {
        socket.emit("msg", "10");
        localStorage.setItem("token10", JSON.stringify({ val: false }));
      }
    };

    let token10 = localStorage.getItem("token10");
    if (token10 === null) return;
    token10 = JSON.parse(token10);
    if (token10.val) {
      re10();
    }
    if (chartArr[chartArr.length - 1]?.D10 >= 25) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;
      const data = {
        iPOint: chartArr[chartArr.length - 1]?.I,
        number: chartArr[chartArr.length - 1]?.D10,
        time: timestamp,
      };
      sendTdata(data);
      localStorage.setItem(
        "token10",
        JSON.stringify({
          val: true,
        })
      );
    }
  };

  useEffect(() => {
    seter();
    cheker();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  /* chartArr.forEach((x) => {
    if (x.D10 >= 20) {
      console.log(x.I);
    }
  }); */

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
                display: true,
              },
              x: {
                display: true,
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
