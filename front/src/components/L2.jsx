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
    //labels: show.map((x) => x.I),
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "2",
        //data: show.map((x) => x.D3),
        data: show.slice(to, from).map((x) => x.D2),
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
        //data: show.map((x) => x.D5),
        data: show.slice(to, from).map((x) => x.D5),
        backgroundColor: "red",
        borderColor: "red",
        pointBorderColor: "black",
        fill: true,
        tension: 0.1,
      },
      {
        label: "10",
        //data: show.map((x) => x.D10),
        data: show.slice(to, from).map((x) => x.D10),
        backgroundColor: "blue",
        borderColor: "blue",
        pointBorderColor: "black",
        fill: true,
        tension: 0.1,
      },
      {
        label: "20",
        //data: show.map((x) => x.D20),
        data: show.slice(to, from).map((x) => x.D20),
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
              D2: i <= 1 ? -i : i,
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
              D3: i <= 1 ? -i : i,
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
              D5: i <= 3 ? -i : i,
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
              D10: i <= 5 ? -i : i,
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
              D20: i <= 5 ? -i : i,
            };
          }
          i++;
        }
      }else if(+x.X?.split("x")[0] >= 10 && I > 100){
        return {
          ...x,
          D20: -10,
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
    if (show.length >= 10) {
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

  const init5 = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}:${seconds}`;

    let token = localStorage.getItem("mainTok5");
    if (token === null) {
      chartArr.reduceRight(
        (c, cc, i) => {
          if (cc.D5 > 0) {
            return { ...c, plu: c?.plu + 1, min: c?.min };
          }
          if (cc.D5 < 0) {
            return { ...c, plu: c?.plu, min: c?.min + 1 };
          }
          if (c.plu === 5 && c.min === 0) {
            const data = {
              iPOint: chartArr[chartArr.length - 1]?.I,
              number: 5,
              time: timestamp,
            };
            sendTdata(data);
            localStorage.setItem("mainTok5", JSON.stringify({ val: true }));
          }
          return c;
        },
        { plu: 0, min: 0 }
      );
    }
  };

  const init20 = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}:${seconds}`;

    let token = localStorage.getItem("mainTok20");
    if (token === null) {
      chartArr.reduceRight(
        (c, cc, i) => {
          if (c.min < 0) {
            console.log(c);
          }
          if (cc.D20 > 0) {
            return { ...c, plu: c?.plu + 1, min: c?.min };
          }
          if (cc.D20 < 0) {
            return { ...c, plu: c?.plu, min: c?.min + 1 };
          }
          if (c.plu === 12 && c.min === 0) {
            const data = {
              iPOint: chartArr[chartArr.length - 1]?.I,
              number: 20,
              time: timestamp,
            };
            sendTdata(data);
            localStorage.setItem("mainTok20", JSON.stringify({ val: true }));
          }
          return c;
        },
        { plu: 0, min: 0 }
      );
    }
  };

  const caler5 = () => {
    const LD5 = chartArr[chartArr.length - 1]?.D5;
    if (LD5 < 0) {
      socket.emit("msg", "faill");
      localStorage.removeItem("mainTok5");
    }
  };

  const caler20 = () => {
    const LD20 = chartArr[chartArr.length - 1];
    if (LD20?.D20 > 0 || LD20?.D10 > 0) {
      socket.emit("msg", "GO ON");
    }
    if (LD20?.D20 < 0) {
      socket.emit("msg", "faill");
      localStorage.removeItem("mainTok20");
    }
  };

  const chek5 = () => {
    init5();
    let token = localStorage.getItem("mainTok5");
    if (token === null) return;
    token = JSON.parse(token);
    if (token.val) {
      caler5();
    }
  };

  const chek20 = () => {
    init20();
    let token = localStorage.getItem("mainTok20");
    if (token === null) return;
    token = JSON.parse(token);
    if (token.val) {
      caler20();
    }
  };

  const cheker = () => {
    //chek5();
    //chek20();
  };

  useEffect(() => {
    //seter();
    cheker();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

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
