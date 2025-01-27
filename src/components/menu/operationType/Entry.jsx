
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCRUD } from "../../HOC/UseCRUD"
import { useFetchData } from "../../HOC/UseFetchData"
import "../../../assets/styles/vehicle.scss"

export default function Entry({showCreateModelbox,setShowCreateModelBox}) {
  const [formData, setFormData] = useState({
    name: "",
    color: "#FF4400", // Default color
  })
  // const [errors, setErrors] = useState({}); //for validaiton


  const { id } = useParams()
  const navigate = useNavigate()
  const { handleCreate, handleEdit, loading, error } = useCRUD()

  // Fetch data if id is provided
  const { data: operationTypeData } = useFetchData(id ? `http://localhost:8383/user/getByUserId/${id}` : null)

  useEffect(() => {
    if (operationTypeData) {
      setFormData(operationTypeData)
    }
  }, [operationTypeData])

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
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   return; // Do not submit if there are validation errors
    // }
  
    console.log("Form Submitted:", formData)

    const url = id ? `http://localhost:8383/user/update` : "http://localhost:8383/user/create"

    if (id) {
      handleEdit(url, id, formData).then(() => navigate("/operation-type"))
    } else {
      handleCreate(url, formData).then(() => navigate("/operation-type"))
    }
  }

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      name: "",
      color: "#FF4400",
    })
  }
  const handleCancel = () => {
    handleClear();
    setShowCreateModelBox(false);
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error occurred: {error.message}</div>

  return (
    <div className="entryContainer">
      <div className="modelTitle">
        <h4>{id ? "Edit Operation Type" : "Create New Operation Type"}</h4>
      </div>
      <div className="modelContent">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="name" className="inputLabel">
              <div className="flexRow">
                <small>[Required]</small>
                <p>Operation Type Name</p>
              </div>
              <div className="instruction">
                <small>Please enter Operation type</small>
              </div>
            </label>
            <div className="flexRow colorFlexRow">
              <div className="colorPickerWrapper">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="colorInput"
                  aria-label="Choose color"
                />
                <div className="colorPreview" style={{ backgroundColor: formData.color }} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter operation type name"
              />
            </div>
          </div>
          
          <div className="btnContainer">
            <button type="button" onClick={handleCancel} className="cancelBtn">
              Cancel
            </button>
            <button type="submit" className="saveBtn" onClick={handleSubmit}>
              {id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

