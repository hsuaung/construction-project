import React from "react";
import "../assets/styles/accInfo.scss";
import Profile from "../assets/images/sampleProfile.jpg";
export default function userProfile() {
  return (
    <div className="container">
      <div className="coverDiv"></div>

      <img src={Profile} alt="" />
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
              <input type="text" value="KIITP" />
            </div>
            <div className="inputGp">
              <label htmlFor="staffName">
                <div>
                  <small>[optional]</small>
                  Staff Name
                </div>

                <span>You Can't Change Staff Name</span>
              </label>
              <input type="text" value="KIITP" className="disabledInput" />
            </div>
            <div className="inputGp">
              <label htmlFor="team">
                <div>
                  <small>[optional]</small>
                  Team
                </div>

                <span>You Can't Change Team</span>
              </label>
              <select name="" id="" className="disabledInput">
                <option value="teamone">Team One</option>
                <option value="teamtwo">Team Two</option>
                <option value="teamthree">Team Three</option>
              </select>
              {/* <input type="text" value="KIITP" /> */}
            </div>
          </div>
          <div>
            <div className="inputGp">
              <label htmlFor="displayName">
                <div>
                  <small>[optional]</small>
                  Display Name
                </div>

                <span>Please Enter Staff Name</span>
              </label>
              <input type="text" value="KIITP" />
            </div>
            <div className="inputGp">
              <label htmlFor="displayName">
                <div>
                  <small>[optional]</small>
                  Display Name
                </div>

                <span>Please Enter Staff Name</span>
              </label>
              <input type="text" value="KIITP" />
            </div>
            <div className="inputGp">
              <label htmlFor="address">
                <div>
                  <small>[optional]</small>
                  Address
                </div>

                <span>Please Enter Staff Address</span>
              </label>
              <textarea name="address" id="address"></textarea>
            </div>
          </div>
        </div>

        <hr />
        <div className="btnGp">
          <button className="buttonThree">Cancel</button>
          <button className="buttonTwo">Save</button>
        </div>
      </form>
    </div>
  );
}
