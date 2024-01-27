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

  const data10 = {
    //labels: show.map((x) => x.I),
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "a",
        //data: show.map((x) => x.a15),
        data: show.slice(to, from).map((x) => x.a10),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "b",
        //data: show.map((x) => x.b15),
        data: show.slice(to, from).map((x) => x.b10),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const data15 = {
    //labels: show.map((x) => x.I),
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "a",
        //data: show.map((x) => x.a15),
        data: show.slice(to, from).map((x) => x.a15),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "b",
        //data: show.map((x) => x.b15),
        data: show.slice(to, from).map((x) => x.b15),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const data20 = {
    //labels: show.map((x) => x.I),
    labels: show.slice(to, from).map((x) => x.I),
    datasets: [
      {
        label: "a",
        //data: show.map((x) => x.a15),
        data: show.slice(to, from).map((x) => x.a20),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "b",
        //data: show.map((x) => x.b15),
        data: show.slice(to, from).map((x) => x.b20),
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
        let saver = arr.slice(I - 30, I).reduceRight(
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

  const tryy = () => {
    x;
    let bolA = true;
    let bolB = true;
    let ar = [];

    chartArr.forEach((x, i) => {
      if (x.a10 <= 2 && chartArr[i + 1]?.val !== x.val && bolA) {
        let finder = true;
        let I = 1;
        while (finder) {
          let nextVal = chartArr[i + I];
          let next1Val = chartArr[i + I + 1];
          if (nextVal?.val === "Player A") {
            finder = false;
            /* console.log(
              x.I,
              x.a10 <= 2 ? "A" : "B",
              nextVal?.val === next1Val?.val
            ); */
            ar.push({
              i: x.I,
              val: x.a10 <= 2 ? "A" : "B",
              bool: nextVal?.val === next1Val?.val,
            });
          }
          I++;
        }
        bolA = false;
      } else if (x.a10 >= 5) {
        bolA = true;
      }

      if (x.b10 === 2 && chartArr[i + 1]?.val !== x.val && bolB) {
        let finder = true;
        let I = 1;
        while (finder) {
          let nextVal = chartArr[i + I];
          let next1Val = chartArr[i + I + 1];
          if (nextVal?.val === "Player B") {
            finder = false;
            /* console.log(
              x.I,
              x.b10 <= 2 ? "B" : "A",
              nextVal?.val === next1Val?.val
            ); */
            ar.push({
              i: x.I,
              val: x.b10 <= 2 ? "B" : "A",
              bool: nextVal?.val === next1Val?.val,
            });
          }
          I++;
        }
        bolB = false;
      } else if (x.b10 >= 5) {
        bolB = true;
      }
    });

    if (ar.length !== 0) {
      let print = true;
      ar.forEach((x, i) => {
        if (x.bool === false && ar[i - 1]?.bool === false && print) {
          console.log(x.i, ar[i + 1]?.bool /* ar[i + 2]?.bool */);
          print = false;
        } else if (x.bool === false) {
          print = true;
        }
      });
    }
    console.log(ar);
  };

  useEffect(() => {
    //seter();
  }, [chartArr.length]);

  useEffect(() => {
    getData();
  }, []);

  /*  */

  let aA = true;
  let aB = true;
  let box = [];
  chartArr.forEach((x, i) => {
    if (x.a10 === 8 && aA) {
      let mapeAr = chartArr
        .slice(i + 1, i + 21)
        .map((x) => ((x.val = x.val[x.val.length - 1]) === "A" ? 1 : 0));
      let statAD = mapeAr.reduce(
        (c, cc, i) => {
          if (cc === 0 && c.entrys.length === 0) {
            return { ...c, allow: true };
          }
          if (cc === 1 && c.allow) {
            if (mapeAr[i + 1] === 1) {
              return {
                ...c,
                entrys: [...c.entrys, { val: 1, indexs: `${i}:${i + 1}` }],
                allow: false,
              };
            } else
              return {
                ...c,
                entrys: [...c.entrys, { val: 1, indexs: `${i}:0` }],
              };
          }
          return c;
        },
        {
          entrys: [],
          allow: x.val[x.val.length - 1] !== "A" ? true : false,
        }
      );
      let bob1 = { allow: true, i: null };
      mapeAr.forEach((x1, i1) => {
        if (x1 === 1 && bob1.allow) {
          bob1.i = i1 + 1;
          bob1.allow = false;
        }
      });

      box.push({
        iX: "A",
        i: x.I,
        ar: mapeAr,
        //ar: mapeAr,
        //dis: bob1?.i,
        len: statAD.entrys.length - 1,
      });
      aA = false;
    } else if (x.a10 === 15) {
      aA = true;
    }
    if (x.b10 === 8 && aB) {
      let mapeAr = chartArr
        .slice(i + 1, i + 21)
        .map((x) => ((x.val = x.val[x.val.length - 1]) === "B" ? 1 : 0));
      let statBD = mapeAr.reduce(
        (c, cc, i) => {
          if (cc === 0 && c.entrys.length === 0) {
            return { ...c, allow: true };
          }
          if (cc === 1 && c.allow) {
            if (mapeAr[i + 1] === 1) {
              return {
                ...c,
                entrys: [...c.entrys, { val: 1, indexs: `${i}:${i + 1}` }],
                allow: false,
              };
            } else
              return {
                ...c,
                entrys: [...c.entrys, { val: 1, indexs: `${i}:0` }],
              };
          }
          return c;
        },
        {
          entrys: [],
          allow: x.val[x.val.length - 1] !== "B" ? true : false,
        }
      );
      let bob1 = { allow: true, i: null };
      mapeAr.forEach((x1, i1) => {
        if (x1 === 1 && bob1.allow) {
          bob1.i = i1 + 1;
          bob1.allow = false;
        }
      });
      box.push({
        iX: "B",
        i: x.I,
        ar: mapeAr,
        //arr: mapeAr,
        //dis: bob1?.i,
        len: statBD.entrys.length - 1,
      });
      aB = false;
    } else if (x.b10 === 15) {
      aB = true;
    }
  });
  console.log(box);
  /* let aq = true;
  box.forEach((z1, i1) => {
    if (
      z1.len === 0 &&
      box[i1 - 1]?.len === 0 &&
      box[i1 - 2]?.len === 0 &&
      aq
    ) {
      console.log(z1.iX, z1.i, "0", box[i1 + 1]?.i, "1", box[i1 + 1]?.len);
      aq = false;
    } else if (z1.len !== 0) {
      aq = true;
    }
  }); */
  //console.log("cathch", box.filter((x) => x.len >= 4).length);

  /* let g1 = true;
   chartArr.forEach((x, i) => {
    if (
      x.val !== chartArr[i - 1]?.val &&
      chartArr[i - 1]?.val !== chartArr[i - 2]?.val &&
      chartArr[i - 2]?.val !== chartArr[i - 3]?.val &&
      chartArr[i - 3]?.val !== chartArr[i - 4]?.val &&
      chartArr[i - 4]?.val !== chartArr[i - 5]?.val &&
      chartArr[i - 5]?.val !== chartArr[i - 6]?.val &&
      g1
    ) {
      console.log(x.I);
      let g1 = false;
    } else if (x.val === chartArr[i - 1]?.val) {
      g1 = true;
    }
  }); */

  return (
    <div>
      <div>
        15
        <Bar
          data={data15}
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
      <div>
        10
        <Bar
          data={data10}
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
      <div>
        20
        <Bar
          data={data20}
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
    </div>
  );
}
