import React, { useState, useEffect } from "react";
import "../assets/styles/accInfo.scss";

import ImageUpload from "./HOC/inputBoxes/ImageUpload";
import BtnModelBox from "./HOC/buttons/BtnModelBox";
import { useFetchData } from "./HOC/UseFetchData";
export default function UserProfile() {
  const id = localStorage.getItem("id");
  console.log("ID ", id);
  const { data: userData } = useFetchData(
    `http://localhost:8383/staff/getbyid/${id}`
  );

  console.log("UserData  ", userData);

  const [formData, setFormData] = useState({
    name: "sampleName",
    image: "sampleImage",
    team: "sampleTeam",
    position: "samplePosition",
    phone: "samplePhone",
    address: "sampleAddress",
  });
  // useEffect(() => {
  //   if (userData) {
  //     setFormData(userData);
  //     console.log(":WWW", formData);
  //   }
  // }, [userData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="infoContainer">
      <div className="coverDiv">
        <div className="img">
          <ImageUpload
            handleFileChange={handleFileChange}
            value={formData.image}
          />
        </div>
      </div>
      <form>
        <div className="inputFieldContainer">
          <div>
            <div className="inputGp">
              <label htmlFor="displayName">
                <div>
                  <small>[optional]</small>
                  Display Name
                </div>

                <span>Please Enter Staff Name</span>
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div className="inputGp">
              <label htmlFor="staffName">
                <div>Staff Name</div>

                <span>You Can't Change Staff Name</span>
              </label>
              <input
                type="text"
                value={userData.name}
                className="disabledInput"
                disabled
              />
            </div>

            <div className="inputGp">
              <label htmlFor="team">
                <div>Team</div>

                <span>You Can't Change Team</span>
              </label>
              <select name="" id="" className="disabledInput" disabled>
                <option value="teamone">&#x1F7E0; {userData.name}</option>
                <option value="teamtwo">&#x1F535; Team Two</option>
                <option value="teamthree">&#x1F7E2; Team Three</option>
              </select>
            </div>
          </div>

          <div>
            <div className="inputGp">
              <label htmlFor="position">
                <div>Position</div>

                <span>Can't Change Position</span>
              </label>
              <select
                name="position"
                id="position"
                className="disabledInput"
                disabled
              >
                <option value="manager" className="option">
                  {userData.position}
                </option>
                <option value="engineer">Engineer</option>
                <option value="craftman">Craftman</option>
              </select>
            </div>
            <div className="inputGp">
              <label htmlFor="phone">
                <div>Phone</div>

                <span>Please Enter Staff Phone</span>
              </label>
              <input type="text" value={userData.phoneNumber} />
            </div>
            <div className="inputGp">
              <label htmlFor="address">
                <div>
                  <small>[optional]</small>
                  Address
                </div>

                <span>Please Enter Staff Address</span>
              </label>
              <textarea
                name="address"
                id="address"
                value={userData.address}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <hr />
          <BtnModelBox cancel="Cancel" save="Save" />
          {/* <div className="btnGp">
            <button className="cancelBtn">Cancel</button>
            <button className="saveBtn">Save</button>
          </div> */}
        </div>
      </form>
    </div>
  );
}
