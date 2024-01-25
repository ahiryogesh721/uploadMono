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
      //const res = await axios.get("/post");
      const seterArr = con2(con3(con5(con10(con20(jsonData)))));
      //const seterArr = con2(con3(con5(con10(con20(res.data)))));
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

  const box2Fun = () => {
    let box2 = [];
    let alow1 = true;
    chartArr.forEach((x, i) => {
      if (alow1 && x.D2 === 2) {
        /* let obj = {};
        let condition = true;
        let I = 1;
        obj.IP = x.I;
        obj.MS = [];
        while (condition) {
          let nextInVal = chartArr[i + I];
          if (nextInVal?.D2 === -1) {
            obj.MS.push({ i: nextInVal?.I, val: nextInVal?.D2 });
          } else if (nextInVal?.D2 === 0) {
            box2.push(obj);
            condition = false;
          }
          I++;
        } */
        chartArr[i + 1]?.D2 === -1
          ? box2.push({ i: x.I, val: 1 })
          : box2.push({ i: x.I, val: 0 });
        alow1 = false;
      } else if (x.D2 === 0) {
        alow1 = true;
      }
    });
    //console.log(box2);

    let box3 = [];
    let alllow = true;
    box2.forEach((x, i) => {
      if (x.val === 1 && alllow) {
        box3.push({ i: x.i, val: box2[i + 1]?.val });
        alllow = false;
      } else if (x.val === 0) {
        alllow = true;
      }
    });
    //console.log(box3);
  };

  const box5Fun = () => {
    /* 
    25+
    5-
    5Val
    */
    let box5 = [];
    let alow = true;
    chartArr.forEach((x, i) => {
      if (+x.D5 === -1 && alow) {
        +chartArr[i + 1]?.D5 <= -1
          ? box5.push({ iX: x.D5, i: x.I, val: 1 })
          : +chartArr[i + 2]?.D5 <= -1
          ? box5.push({ iX: x.D5, i: x.I, val: 2 })
          : +chartArr[i + 3]?.D5 <= -1
          ? box5.push({ iX: x.D5, i: x.I, val: 3 })
          : +chartArr[i + 4]?.D5 <= -1
          ? box5.push({ iX: x.D5, i: x.I, val: 4 })
          : +chartArr[i + 5]?.D5 <= -1
          ? box5.push({ iX: x.D5, i: x.I, val: 5 })
          : /* : +chartArr[i - 1]?.X?.split("x")[0] >= 5
          ? ""
          : +chartArr[i - 2]?.X?.split("x")[0] >= 5
          ? ""
          : +chartArr[i - 3]?.X?.split("x")[0] >= 5
          ? ""
          : +chartArr[i - 4]?.X?.split("x")[0] >= 5
          ? "" */
            box5.push({ iX: x.D5, i: x.I, val: 0 });
        alow = false;
      } else if (+x.D5 === 0) {
        alow = true;
      }
    });
    console.log(box5);

    /* let alow1 = true;
    let boxag = [];
    box5.forEach((x, i) => {
      if (x.val !== 0 && alow1) {
        console.log(x.i, box5[i + 1]?.val);
        alow1 = false;
      } else if (x.val !== 0) {
        alow1 = true;
      }
    }); */
  };

  const box3Fun = () => {
    let allow = true;
    let box3 = [];
    chartArr.forEach((x, i) => {
      if (x.D3 === 2 || x.D3 === 3 || x.D3 === 4) {
        chartArr[i + 1]?.D3 === -1
          ? box3.push({ i: x.I, val: 1 })
          : box3.push({ i: x.I, val: 0 });
        allow = false;
      } else if (x.D3 === 0) {
        allow = true;
      }
    });
    console.log(box3);
  };

  useEffect(() => {
    //seter();
    //cheker();
    //box2Fun();
    box3Fun();
    //box5Fun();
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
