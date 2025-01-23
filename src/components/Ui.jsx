import React from "react";
import Checkbox from "./HOC/inputBoxes/Checkbox";
import ImageUpload from "./HOC/inputBoxes/ImageUpload";
import BtnModelBox from "./HOC/buttons/BtnModelBox";
import ShowDate from "./HOC/buttons/ShowDate";
export default function Home() {
  return (
    <div>
      <div>
        <h2>Checkbox</h2>
        <Checkbox
          label={"Certificate One"}
          id="certificateOne"
          value="Certificate One"
          name="certificateGp"
        />
      </div>
      <div>
        <h2>Image Upload</h2>
        <ImageUpload />
      </div>
      <div>
        <h2>Btn Model Box</h2>
        <BtnModelBox cancel="Return" save="Add" />
      </div>
      <div>
        <h2>Show Date</h2>
        <ShowDate />
      </div>
    </div>
  );
}
