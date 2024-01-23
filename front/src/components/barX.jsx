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
    setChartArr((pre) => [...pre, data]);
    setShow((pre) => [...pre, data]);
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

  useEffect(() => {
    //seter();
    //c10();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  chartArr.forEach((x, i) => {
    if (
      x.val === chartArr[i - 1]?.val &&
      chartArr[i - 1]?.val === chartArr[i - 2]?.val &&
      chartArr[i - 2]?.val === chartArr[i - 3]?.val &&
      chartArr[i - 3]?.val === chartArr[i - 4]?.val &&
      chartArr[i - 4]?.val === chartArr[i - 5]?.val &&
      chartArr[i - 5]?.val === chartArr[i - 6]?.val
    ) {
      console.log(x.val, x.I, chartArr.slice(i + 1, i + 11));
    }
  });

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
