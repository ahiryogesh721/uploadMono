"use client";
require("dotenv").config();
import React from "react";
import BarC from "@/components/barX";
import LineM from "@/components/lineM";
import L2 from "@/components/L2";
import { Live } from "@styled-icons/fluentui-system-filled";
export default function Home() {
  let to = 51200,
    from = 51400;

  return (
    <div className="">
      <div className="p-10 flex flex-col gap-1">
        <p>notes:</p>
        <p className="text-blue-800">baiting application : crash/1xbet</p>
        <p className="text-blue-800">
          this website provides history of last 100 crashes
        </p>
        <p className="text-red-800">
          1:Highly recomend you to use this website on laptops or any anothe
          fullscren avoide using phones
        </p>
        <p className="text-yellow-600">
          2:this website is only publicly avalible till 26th of february 2024
          onwords it will be subscribtion based service
        </p>
        <p className="text-green-800">
          3:giving away lifetime access to 5 to 10 users for more information
          contact me
        </p>
        <p className="text-gray-400">
          4:this website will only provide service to 100 to 200 daily users
          depending on demand
        </p>
        <p className="text-gray-400">
          5:in subscribtion based plans you will be able to see history of upto
          last 1000 to 2000 crashess
        </p>
        <p className="text-gray-400">
          6:last 3 charts for players who plays on odds of 2, 3 and 5
        </p>
        <p className="text-gray-400">
          7:for any contact DM me on instagram:
          <a
            className="px-2 font-mono text-1xl text-pink-700"
            href="https://www.instagram.com/1X_parashoot721?igsh=MTBtaG1xdGxzNG54Zg%3D%3D&utm_source=qr"
            target="_blank"
          >
            1Xparashoot721
          </a>
        </p>
      </div>
      <div className=" px-10 flex flex-row gap-2 justify-start">
        <h1 className="text-gray-200 font-bold text-2xl">1Xparashoot.com</h1>
        <Live size={42} color="red"></Live>
      </div>
      <div className="py-10">
        <h3 className="flex justify-center">X Chart</h3>
        <BarC to={to} from={from} />
      </div>
      <div className="py-10">
        <h3 className="flex justify-center">Money Flow Chart</h3>
        <LineM to={to} from={from} />
      </div>
      <div className="py-10">
        <L2 to={to} from={from} />
      </div>
      {/* <div id="lineM">
        <LineM to={to - 1000} from={from + 1000} />
      </div> */}
    </div>
  );
}
