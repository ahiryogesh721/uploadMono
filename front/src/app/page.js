"use client";
require("dotenv").config();
import React from "react";
import BarC from "@/components/barX";
import LineM from "@/components/lineM";
import L2 from "@/components/L2";
export default function Home() {
  let to = 4600,
    from = 4800;
  return (
    <div className="mt-32 flex flex-row md:mt-0 md:flex-col ">
      <div>
        <BarC to={to} from={from} />
      </div>
      <div id="lineM">
        <L2 to={to} from={from} />
      </div>
      <div id="lineM">
        <LineM to={to} from={from} />
      </div>
    </div>
  );
}
