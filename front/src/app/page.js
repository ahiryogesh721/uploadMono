"use client";
import React from "react";
import BarC from "@/components/barX";
import LineM from "@/components/lineM";

export default function Home() {
  return (
    <div>
      <h1 className="flex justify-center">charts</h1>
      <div className="flex flex-col gap-5">
        <BarC />
        <LineM />
      </div>
    </div>
  );
}
