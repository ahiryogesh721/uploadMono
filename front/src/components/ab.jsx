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

export default function Ab({ to, from }) {
  const [chartArr, setChartArr] = useState([]);
  const [show, setShow] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    labels: show.map((x) => x.I),
    //labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "a",
        data: show.map((x) => x.a10),
        //data: show.slice(to, from).map((x) => x.a10),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "b",
        data: show.map((x) => x.b10),
        //data: show.slice(to, from).map((x) => x.b10),
        backgroundColor: "red",
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
    setChartArr((pre) => ab10(ab15(ab20([...pre, data]))));
    setShow((pre) => ab10(ab15(ab20([...pre, data]))));
  });

  const ab10 = (arr) => {
    return arr.map((x, I) => {
      if (I >= 10) {
        let saver = arr.slice(I - 10, I).reduceRight(
          (c, cc) => {
            if (cc.val === "Player A") {
              return { ...c, a: c.a + 1 };
            }
            if (cc.val === "Player B") {
              return { ...c, b: c.b + 1 };
            } else return c;
          },
          { a: 0, b: 0 }
        );
        return { ...x, a10: saver.a, b10: saver.b };
      }
      return { ...x, a10: 0, b10: 0 };
    });
  };

  const ab15 = (arr) => {
    return arr.map((x, I) => {
      if (I >= 10) {
        let saver = arr.slice(I - 15, I).reduceRight(
          (c, cc) => {
            if (cc.val === "Player A") {
              return { ...c, a: c.a + 1 };
            }
            if (cc.val === "Player B") {
              return { ...c, b: c.b + 1 };
            } else return c;
          },
          { a: 0, b: 0 }
        );
        return { ...x, a15: saver.a, b15: saver.b };
      }
      return { ...x, a15: 0, b15: 0 };
    });
  };

  const ab20 = (arr) => {
    return arr.map((x, I) => {
      if (I >= 10) {
        let saver = arr.slice(I - 20, I).reduceRight(
          (c, cc) => {
            if (cc.val === "Player A") {
              return { ...c, a: c.a + 1 };
            }
            if (cc.val === "Player B") {
              return { ...c, b: c.b + 1 };
            } else return c;
          },
          { a: 0, b: 0 }
        );
        return { ...x, a20: saver.a, b20: saver.b };
      }
      return { ...x, a20: 0, b20: 0 };
    });
  };

  const getData = async () => {
    try {
      const res = await axios.get("/cards");
      setChartArr(ab10(ab15(ab20(res.data))));
      setShow(ab10(ab15(ab20(res.data))));
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
      let setArr = chartArr.slice(chartArr.length - 350, chartArr.length);
      setChartArr(setArr);
    }
  };

  const sendTdata = async (data) => {
    try {
      await axios.post("/post/records", data);
    } catch (error) {}
  };

  const lChek = () => {
    const lastEntry = chartArr[chartArr.length - 1];
    console.log(`A:${lastEntry?.a10}||B:${lastEntry?.b10}`);
    if (lastEntry?.a10 <= 2 || lastEntry?.b10 <= 2) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;

      const data = {
        iPOint: lastEntry.I,
        number: lastEntry?.a10 <= 2 ? "A" : "B",
        time: timestamp,
      };
      sendTdata(data);
    }
  };

  useEffect(() => {
    //seter();
    //lChek();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
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
    </div>
  );
}
