import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCRUD } from "../../HOC/UseCRUD";
import { useFetchData } from "../../HOC/UseFetchData";
import "../../../assets/styles/vehicle.scss";
import "../../menu/staff/entry.scss";
import ImageUpload from "../../HOC/inputBoxes/ImageUpload";
import Checkbox from "../../HOC/inputBoxes/Checkbox";
import BtnModelBox from "../../HOC/buttons/BtnModelBox";
export default function Entry({ showCreateModelbox, setShowCreateModelBox }) {
  const [formData, setFormData] = useState({
    name: "",
    color: "#FF4400", // Default color
  });
  // const [errors, setErrors] = useState({}); //for validaiton

  const { id } = useParams();
  const navigate = useNavigate();
  const { handleCreate, handleEdit, loading, error } = useCRUD();

  // Fetch data if id is provided
  const { data: operationTypeData } = useFetchData(
    id ? `http://localhost:8383/user/getByUserId/${id}` : null
  );

  useEffect(() => {
    if (operationTypeData) {
      setFormData(operationTypeData);
    }
  }, [operationTypeData]);

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

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      name: "",
      color: "#FF4400",
    });
  };
  const handleCancel = () => {
    handleClear();
    setShowCreateModelBox(false);
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
                    <input
                      type="text"
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter Team"
                    />
                    <button>+</button>
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
                      <small>Please Select Employment Status</small>
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
                      <small>Please Select Working Status</small>
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
                      value={formData.name}
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

                <div>
                  <label htmlFor="working" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Working Status</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Working Status</small>
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
                  <label htmlFor="working" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Working Status</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Working Status</small>
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
                  <label htmlFor="working" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Working Status</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Working Status</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <select name="working" id="working" className="select">
                      <option value="">Avaliable</option>
                      <option value="">Busy</option>
                    </select>
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
                    <div className="instruction">
                      <small>Please Enter Staff Address</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <ImageUpload />
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
                  <label htmlFor="working" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Working Status</p>
                    </div>
                    <div className="instruction">
                      <small>Please Select Working Status</small>
                    </div>
                  </label>
                  <div className="flexRow inputRow">
                    <select name="working" id="working" className="select">
                      <option value="">Avaliable</option>
                      <option value="">Busy</option>
                    </select>
                  </div>
                </div>

                <div className="checkBoxContaier">
                  <label htmlFor="name" className="inputLabel">
                    <div className="flexRow">
                      <small>[Required]</small>
                      <p>Staff Name</p>
                    </div>
                    <div className="instruction">
                      <small>Please Enter Staff Name</small>
                    </div>
                  </label>
                  <div className=" formTwoCol ">
                    <div>
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
                    <div>
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
            <BtnModelBox cancel="Cancel" save="Save" />
          </div>
          {/* <div className="btnContainer">
            <button type="button" onClick={handleCancel} className="cancelBtn">
              Cancel
            </button>
            <button type="submit" className="saveBtn" onClick={handleSubmit}>
              {id ? "Update" : "Save"}
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
