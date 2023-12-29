"use client";
require("dotenv").config();
import React from "react";
import BarC from "@/components/barX";
import Ab from "@/components/ab";

export default function Home() {
  let to = 2750,
    from = 2880;
  return (
    <div>
      <h1>hello</h1>
      <BarC to={to} from={from} />
      {/* <Ab to={to} from={from} /> */}
    </div>
  );
}
