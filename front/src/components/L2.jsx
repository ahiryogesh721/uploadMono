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
import jsonData from "../../../front/file_667c37c4-afc3-4ad3-a29d-625c1bd5795f.json";

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
        backgroundColor: "#7FFF00",
        borderColor: "#7FFF00",
        pointBorderColor: "black",
        fill: true,
        tension: 0.1,
      },
      {
        label: "3",
        //data: show.map((x) => x.D3),
        data: show.slice(to, from).map((x) => x.D3),
        backgroundColor: "purple",
        borderColor: "purple",
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

  const data2 = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "2",
        data: show.map((x) => x.D2),
        //data: show.slice(to, from).map((x) => x.D2),
        backgroundColor: "black",
        borderColor: "gray",
        pointBorderColor: "gray",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const data3 = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "3",
        data: show.map((x) => x.D3),
        //data: show.slice(to, from).map((x) => x.D3),
        backgroundColor: "black",
        borderColor: "gray",
        pointBorderColor: "gray",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const data5 = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "5",
        data: show.map((x) => x.D5),
        //data: show.slice(to, from).map((x) => x.D5),
        backgroundColor: "black",
        borderColor: "gray",
        pointBorderColor: "gray",
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
              D2: i <= 2 ? -i : i,
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
              D3: i <= 3 ? -i : i,
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
              D5: i <= 5 ? -i : i,
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
              D10: i <= 20 ? -i : i,
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
          if (lx >= 20) {
            finder = false;
            return {
              ...x,
              D20: i <= 10 ? -i : i,
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
    if (show.length >= 10) {
      let setArr = show.slice(show.length - 100, show.length);
      setShow(setArr);
    }
    if (chartArr.length >= 800) {
      let setArr = chartArr.slice(chartArr.length - 500, chartArr.length);
      setChartArr(setArr);
    }
  };

  const sendTdata = async (data) => {
    try {
      await axios.post("/post/records", data);
    } catch (error) {}
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
          <Line
            className="p-10"
            data={data2}
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
            className="p-10"
            data={data3}
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
            className="p-10"
            data={data5}
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
