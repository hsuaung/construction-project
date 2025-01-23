import React from "react";
import BtnModelBox from "./HOC/buttons/BtnModelBox";
import "../assets/styles/buttons/btnModalBox.scss";
export default function Home() {
  return (
    <div>
      home
      <BtnModelBox cancel="Return" save="Add" />
    </div>
  );
}
