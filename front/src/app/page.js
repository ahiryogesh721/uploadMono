"use client";
require("dotenv").config();
import React from "react";
import BarC from "@/components/barX";
import LineM from "@/components/lineM";

export default function Home() {
  /* let to = 60,
    from = 160; */
  let to = 370,
    from = 470;
  return (
    <div className="relative m-15 mt-40 md:mt-0  md:relative md:m-15 flex flex-row md:flex-col">
      <div className="absolute md:h-screen md:relative md:rotate-0 md:mb-0">
        <BarC to={to} from={from} />
      </div>
      <div
        id="lineM"
        className="absolute left-24 md:left-0 md:relative md:rotate-0 md:mt-0"
      >
        <LineM to={to} from={from} />
      </div>
    </div>
  );
}
