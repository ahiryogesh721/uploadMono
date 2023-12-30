"use client";
require("dotenv").config();
import React from "react";
import BarC from "@/components/barX";
import LineM from "@/components/lineM";
import L1 from "@/components/L1";
import L2 from "@/components/L2";
import Ab from "@/components/ab";

export default function Home() {
  let to = 100,
    from = 200;
  return (
    <div>
      <h1>hello</h1>
      <BarC to={to} from={from} />
      <Ab to={to} from={from} />
    </div>
  );
}
