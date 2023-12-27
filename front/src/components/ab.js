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

export default function Ab({ to, from }) {
  const [chartArr, setChartArr] = useState([]);
  const [show, setShow] = useState([]);
  const [err, setErr] = useState({});

  const data = {
    //labels: show.map((x) => x.I),
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "a",
        //data: show.map((x) => x.X?.split("x")[0]),
        data: show.slice(to, from).map((x) => x.a10),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "b",
        //data: show.map((x) => x.X?.split("x")[0]),
        data: show.slice(to, from).map((x) => x.b10),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      }
    ],
  };

  const ab10=(arr)=>{
    return arr.map((x,I)=>{
        if(I>=20){
            let saver= arr.slice(I-20,I).reduceRight((c,cc)=>{
                if(cc.val==='Player A'){
                    return {...c,a:c.a+1}
                }if(cc.val==='Player B'){
                    return {...c,b:c.b+1}
                }else return c
            },{a:0,b:0})
            return {...x,a10:saver.a,b10:saver.b}
        }
        return {...x,a10:0,b10:0}
    })
  }

  const getData = async () => {
    try {
      const res = await axios.get("/cards");
      setChartArr(ab10(res.data));
      setShow(ab10(res.data));
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

  useEffect(() => {
    //seter();
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
