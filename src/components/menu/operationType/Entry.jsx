import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useCRUD } from "../../HOC/UseCRUD";
import { useFetchData } from "../../HOC/UseFetchData";

export default function Entry() {
  const [formData, setFormData] = useState({
    // name: "",
    // color: "",
    user_name:"",
    user_email:""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleCreate, handleEdit, loading, error } = useCRUD();

  // Fetch student data if id is provided
  const { data: operationTypeData } = useFetchData(
    id ? `http://localhost:8383/user/getByUserId/${id}` : null
  );
  useEffect(() => {
    if (operationTypeData) {
      setFormData(operationTypeData);
    }
  }, [operationTypeData]);

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
    console.log("Form Submitted:", formData);
    // Add your form submission logic here, like sending data to an API
    const url = id
      ? `http://localhost:8383/user/update`
      : "http://localhost:8383/student/create";
    if (id) {
      handleEdit(url, id, formData).then(() => navigate("/operation-type/show-details"));
    } else {
      handleCreate(url, formData).then(() => navigate("/operation-type"));
    }
  };

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      // name: "",
      // color: "",
      user_name:"",
      user_email:""
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="form-container">
      <h1>{id ? "Student Update Form" : "Student Registration Form"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            {id ? "Update" : "Register"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn delete-btn"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
