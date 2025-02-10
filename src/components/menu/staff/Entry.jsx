import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCRUD } from "../../HOC/UseCRUD";
import { useFetchData } from "../../HOC/UseFetchData";
import "../../../assets/styles/vehicle.scss";
import "../../menu/staff/entry.scss";
import ImageUpload from "../../HOC/inputBoxes/ImageUpload";
import Checkbox from "../../HOC/inputBoxes/Checkbox";
import MapComponent from "../../HOC/inputBoxes/MapComponent";
export default function Entry({
  id,
  showCreateModelBox,
  setShowCreateModelBox,
  setShowEditModelBox,
  showEditModelBox,
}) {
  const [formData, setFormData] = useState({
    name: "",
    color: "#FF4400", // Default color
  });
  // const [errors, setErrors] = useState({}); //for validaiton

  const navigate = useNavigate();
  const { handleDelete, handleCreate, handleEdit, loading, error } = useCRUD();

  // Fetch data if id is provided
  const { data: staffData } = useFetchData(
    id ? `http://localhost:8383/user/getByUserId/${id}` : null
  );

  useEffect(() => {
    if (staffData) {
      setFormData(staffData);
    }
  }, [staffData]);
  const [address, setAddress] = useState("");

  const handleAddressSelect = (address) => {
    setAddress(address); // Update the address state when a user selects an address
  };
  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.name.trim()) {
  //     newErrors.name = "Operation type name is required.";
  //   }

  //   if (!/^#[0-9A-Fa-f]{6}$/.test(formData.color)) {
  //     newErrors.color = "Invalid color code.";
  //   }

  //   setErrors(newErrors);

  //   // Return true if no errors
  //   return Object.keys(newErrors).length === 0;
  // };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   return; // Do not submit if there are validation errors
    // }

    console.log("Form Submitted:", formData);

    const url = id
      ? `http://localhost:8383/user/update`
      : "http://localhost:8383/user/create";

    if (id) {
      handleEdit(url, id, formData).then(() => navigate("/operation-type"));
    } else {
      handleCreate(url, formData).then(() => navigate("/operation-type"));
    }
  };

  const handleDeleteData = async (id) => {
    const url = `http://localhost:1818/user/delete`;
    await handleDelete(url, id); // Trigger the delete action
  };

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      name: "",
      color: "#FF4400",
    });
  };
  const handleCancel = () => {
    if (!id) {
      handleClear();
      setShowCreateModelBox(false);
    } else {
      setShowEditModelBox(false);
      handleClear();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="modalForm staffModal ">
      <div className="modelTitle">
        <h4>{id ? "Edit Staff Data" : "Create New Staff"}</h4>
      </div>
      <div className="modelContent">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <div className="formTwoCol">
              <div>
                <div>
                  <label htmlFor="team" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Team</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Team</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <select name="team" id="team" className="select">
                      <option value="">Team One</option>
                      <option value="">Team Two</option>
                    </select>
                    <button className="svgAddButton">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="17"
                        viewBox="0 0 19 17"
                        fill="none"
                      >
                        <path
                          d="M5.91699 8.25C7.2977 8.25 8.41699 7.13071 8.41699 5.75C8.41699 4.36929 7.2977 3.25 5.91699 3.25C4.53628 3.25 3.41699 4.36929 3.41699 5.75C3.41699 7.13071 4.53628 8.25 5.91699 8.25Z"
                          stroke="#F27D14"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9.68495 6.24977C9.81532 6.02048 9.98975 5.81924 10.1982 5.65764C10.4067 5.49603 10.645 5.37726 10.8996 5.30815C11.1541 5.23904 11.4198 5.22097 11.6814 5.25496C11.9429 5.28896 12.1952 5.37436 12.4236 5.50624C12.652 5.63813 12.8521 5.81389 13.0123 6.02341C13.1725 6.23293 13.2897 6.47208 13.3572 6.72708C13.4246 6.98208 13.4409 7.24789 13.4052 7.50922C13.3694 7.77055 13.2824 8.02223 13.149 8.24977C12.8819 8.70538 12.4454 9.03685 11.9348 9.17185C11.4242 9.30684 10.8809 9.23439 10.4236 8.97032C9.96619 8.70625 9.63183 8.27198 9.49346 7.7623C9.35508 7.25262 9.42392 6.70889 9.68495 6.24977Z"
                          stroke="#F27D14"
                        />
                        <path
                          d="M10.417 15.75H1.41705V16.75H10.417V15.75ZM1.00505 15.336C1.13505 14.522 1.44705 13.365 2.18105 12.421C2.89605 11.501 4.03605 10.75 5.91705 10.75V9.75C3.71805 9.75 2.29105 10.65 1.39105 11.807C0.511048 12.941 0.160049 14.287 0.0180485 15.178L1.00505 15.336ZM5.91705 10.75C7.79805 10.75 8.93705 11.5 9.65305 12.421C10.387 13.365 10.699 14.521 10.829 15.336L11.816 15.178C11.674 14.288 11.324 12.941 10.443 11.808C9.54305 10.65 8.11605 9.75 5.91705 9.75V10.75ZM1.41705 15.75C1.12505 15.75 0.974048 15.533 1.00505 15.336L0.0180485 15.178C-0.124951 16.072 0.604048 16.75 1.41705 16.75V15.75ZM10.417 16.75C11.23 16.75 11.958 16.072 11.816 15.178L10.829 15.336C10.86 15.533 10.709 15.75 10.417 15.75V16.75Z"
                          fill="#F27D14"
                        />
                        <path
                          d="M9.71708 11.731L9.44908 11.309L8.93408 11.636L9.35608 12.076L9.71708 11.731ZM14.3121 15.75H10.4171V16.75H14.3121V15.75ZM14.7291 15.288C14.7821 15.503 14.6251 15.75 14.3121 15.75V16.75C15.1821 16.75 15.9321 15.978 15.6991 15.045L14.7291 15.288ZM11.4171 11.75C12.4451 11.75 13.1671 12.253 13.6951 12.957C14.2351 13.675 14.5511 14.582 14.7291 15.288L15.6991 15.045C15.5071 14.281 15.1491 13.229 14.4951 12.356C13.8301 11.47 12.8371 10.75 11.4171 10.75V11.75ZM9.98508 12.153C10.3751 11.906 10.8431 11.75 11.4171 11.75V10.75C10.6491 10.75 9.99608 10.962 9.44908 11.309L9.98508 12.153ZM9.35608 12.076C10.3031 13.066 10.6821 14.415 10.8291 15.336L11.8161 15.178C11.6561 14.178 11.2331 12.592 10.0791 11.385L9.35608 12.076ZM10.8291 15.336C10.8601 15.533 10.7091 15.75 10.4171 15.75V16.75C11.2301 16.75 11.9581 16.072 11.8161 15.178L10.8291 15.336Z"
                          fill="#F27D14"
                        />
                        <path
                          d="M18.417 3H14.417C14.2789 3 14.167 3.11193 14.167 3.25C14.167 3.38807 14.2789 3.5 14.417 3.5H18.417C18.5551 3.5 18.667 3.38807 18.667 3.25C18.667 3.11193 18.5551 3 18.417 3Z"
                          stroke="#F27D14"
                          stroke-width="0.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M16.667 5.25V1.25C16.667 1.11193 16.5551 1 16.417 1C16.2789 1 16.167 1.11193 16.167 1.25V5.25C16.167 5.38807 16.2789 5.5 16.417 5.5C16.5551 5.5 16.667 5.38807 16.667 5.25Z"
                          stroke="#F27D14"
                          stroke-width="0.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Staff Name</p>
                    </div>
                    <div className="instruction">
                      <small>Please Enter Staff Name</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter Staff Name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="employment" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Employment Status</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Status</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <select
                      name="employment"
                      id="employment"
                      className="select"
                    >
                      <option value="">Currently Employed</option>
                      <option value="">Retired</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="working" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Working Status</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Status</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <select name="working" id="working" className="select">
                      <option value="">Avaliable</option>
                      <option value="">Busy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="phonenumber" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Phone</p>
                    </div>
                    <div className="instruction">
                      <small>Please Enter Staff Phone</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <input
                      type="text"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter Staff Phone"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Address</p>
                    </div>
                    <div className="instruction">
                      <small>Please Enter Staff Address</small>
                    </div>
                  </label>

                  <div className="flexRow inputRow">
                    <textarea name="address" id="address"></textarea>
                  </div>
                </div>
                {/* <div>
                  <div>
                    <label>Address</label>
                    <MapComponent onAddressSelect={handleAddressSelect} />
                  </div>

                  <div>
                    <label>Your Address:</label>
                    <input type="text" value={address} readOnly />
                  </div>
                </div> */}
                <div>
                  <label htmlFor="position" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Position</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Position</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <select name="position" id="position" className="select">
                      <option value="">Manager</option>
                      <option value="">Engineer</option>
                      <option value="">Driver</option>
                      <option value="">Craftman</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="dob" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>DOB</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select DOB</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter Staff DOB"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="joinedDate" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Joined Date</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Joined Date</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <input
                      type="date"
                      name="joinedDate"
                      value={formData.joinedDate}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter Joined Date"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="address" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Profile Photo</p>
                    </div>
                  </label>
                  <div className=" inputRow">
                    <ImageUpload />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Staff Email</p>
                    </div>
                    <div className="instruction">
                      <small>Please Enter Staff Email</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Staff Password</p>
                    </div>
                    <div className="instruction">
                      <small>Please Enter Staff Password</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter Staff Password"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="accType" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Account Type</p>
                    </div>
                    <div className="instruction">
                      <small>Please Account Type</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <select name="accType" id="accType" className="select">
                      <option value="">Admin</option>
                      <option value="">Staff</option>
                    </select>
                  </div>
                </div>

                <div className="checkBoxContaier">
                  <label htmlFor="name" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Skills</p>
                    </div>
                    <div className="instruction">
                      <small>Choose Staff Skills</small>
                    </div>
                  </label>
                  <div className=" formTwoCol ">
                    <div className="skillContainer">
                      <Checkbox
                        label={"Certificate One"}
                        id="certificateOne"
                        value="Certificate One"
                        name="certificateGp"
                      />
                      <Checkbox
                        label={"Certificate One"}
                        id="certificateOne"
                        value="Certificate One"
                        name="certificateGp"
                      />
                      <Checkbox
                        label={"Certificate One"}
                        id="certificateOne"
                        value="Certificate One"
                        name="certificateGp"
                      />
                    </div>
                    <div className="skillContainer">
                      <Checkbox
                        label={"Certificate One"}
                        id="certificateOne"
                        value="Certificate One"
                        name="certificateGp"
                      />
                      <Checkbox
                        label={"Certificate One"}
                        id="certificateOne"
                        value="Certificate One"
                        name="certificateGp"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="btnGp">
            <hr />
            <div className="btnContainer">
              <button
                type="button"
                onClick={handleCancel}
                className="cancelBtn"
              >
                Cancel
              </button>
              <button type="submit" className="saveBtn" onClick={handleSubmit}>
                {id ? "Update" : "Register"}
              </button>
              {id && (
                <button
                  type="button"
                  onClick={() => handleDelete(id)}
                  className="deleteBtn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M4.6875 7.5H8.4375V5.15625C8.4375 4.12207 9.27832 3.28125 10.3125 3.28125H19.6875C20.7217 3.28125 21.5625 4.12207 21.5625 5.15625V7.5H25.3125C25.8311 7.5 26.25 7.91895 26.25 8.4375V9.375C26.25 9.50391 26.1445 9.60938 26.0156 9.60938H24.2461L23.5225 24.9316C23.4756 25.9307 22.6494 26.7188 21.6504 26.7188H8.34961C7.34766 26.7188 6.52441 25.9336 6.47754 24.9316L5.75391 9.60938H3.98438C3.85547 9.60938 3.75 9.50391 3.75 9.375V8.4375C3.75 7.91895 4.16895 7.5 4.6875 7.5ZM10.5469 7.5H19.4531V5.39062H10.5469V7.5Z"
                      fill="#F24822"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
