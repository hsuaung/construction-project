import React from "react";
import "../assets/styles/accInfo.scss";
import Profile from "../assets/images/sampleProfile.jpg";
import Orange from "../assets/images/orange.png";
import Blue from "../assets/images/blue.png";
import Green from "../assets/images/green.png";
export default function userProfile() {
  return (
    <div className="infoContainer">
      <div className="coverDiv">
        <img src={Profile} alt="" />
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
              <input type="text" value="July" />
            </div>
            <div className="inputGp">
              <label htmlFor="staffName">
                <div>Staff Name</div>

                <span>You Can't Change Staff Name</span>
              </label>
              <input
                type="text"
                value="July"
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
                <option value="teamone">&#x1F7E0; Team One</option>
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
                  Manager
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
              <input type="text" value="+9541547" />
            </div>
            <div className="inputGp">
              <label htmlFor="address">
                <div>
                  <small>[optional]</small>
                  Address
                </div>

                <span>Please Enter Staff Address</span>
              </label>
              <textarea name="address" id="address">
                No.44, Holying Road, Hout City
              </textarea>
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <hr />
          <div className="btnGp">
            <button className="cancelBtn">Cancel</button>
            <button className="saveBtn">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
