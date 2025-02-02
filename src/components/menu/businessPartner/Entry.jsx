
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCRUD } from "../../HOC/UseCRUD"
import { useFetchData } from "../../HOC/UseFetchData"
import "../../../assets/styles/entry.scss"
import "./entry.scss"
import ImageUpload from '../../HOC/inputBoxes/ImageUpload'
export default function Entry({ id, showCreateModelBox, setShowCreateModelBox,setShowEditModelBox,showEditModelBox}) {
  const [formData, setFormData] = useState({
    name: "",
    image:"",
    phonenumber: "",
    email:"",
    address:""
  })
  // const [errors, setErrors] = useState({}); //for validaiton


  const navigate = useNavigate();
  const { handleDelete,handleCreate, handleEdit, loading, error } = useCRUD();

  // Fetch data if id is provided
  const { data: operationTypeData } = useFetchData(id ? `http://localhost:8383/user/getByUserId/${id}` : null);
  // const { data: operationTypeData } = id ? useFetchData(`http://localhost:8383/user/getByUserId/${id}`) : null;
  
  useEffect(() => {
    if (operationTypeData) {
      setFormData(operationTypeData)
    }
  }, [operationTypeData])

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
  
    console.log("Form Submitted:", formData)

    const url = id ? `http://localhost:8383/user/update` : "http://localhost:8383/user/create"

    if (id) {
      handleEdit(url, id, formData).then(() => navigate("/operation-type"))
    } else {
      handleCreate(url, formData).then(() => navigate("/operation-type"))
    }
  }

  const handleDeleteData = async (id) => {
    const url = `http://localhost:1818/user/delete`;
    await handleDelete(url, id); // Trigger the delete action
  };

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      name: "",
      image:"",
      phonenumber: "",
      email:"",
      address:""
    })
  }
  const handleCancel = () => {
    if(!id){
      handleClear();
      setShowCreateModelBox(false);
    }else{
      setShowEditModelBox(false);
      handleClear();
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error occurred: {error.message}</div>

  return (
    <div className={`entryContainer BPentryContainer`}>
      <div className="modelTitle">
        <h4>{id ? "Edit Business Partner" : "Create Business Partner"}</h4>
      </div>
      <div className="modelContent">
        <form onSubmit={handleSubmit}>
          {/* <div className="formGroup">
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
          </div> */}
          <div className={`formGroup modelTwoColumn`}>
            <div>
              <div>
                <label htmlFor="name" className="inputLabel">
                  <div className="flexRow">
                    <small>[Required]</small>
                    <p>Partner Name</p>
                  </div>
                  <div className="instruction">
                    <small>Please enter partnername( max 20 chars )</small>
                  </div>
                </label>
                <input type="text" name="" value={formData.name}
                onChange={handleChange}
                required
                className="input" id="" placeholder="Enter business partner name" />
              </div>
              <div>
                <label htmlFor="name" className="inputLabel">
                  <div className="flexRow">
                    <small>[Required]</small>
                    <p>Phone Number</p>
                  </div>
                  <div className="instruction">
                    <small>Please enter phonenumber</small>
                  </div>
                </label>
                <input type="text" value={formData.phonenumber}
                onChange={handleChange}
                required
                className="input" name="" id="" placeholder="Enter business partner's phone number" />
              </div>
              <div>
                <label htmlFor="name" className="inputLabel">
                  <div className="flexRow">
                    <small>[Required]</small>
                    <p>Email</p>
                  </div>
                  <div className="instruction">
                    <small>Please enter email</small>
                  </div>
                </label>
                <input type="email" name="" value={formData.email}
                onChange={handleChange}
                required
                className="input" id="" placeholder="Enter business partner's mail" />
              </div>
              <div>
                <label htmlFor="name" className="inputLabel">
                  <div className="flexRow">
                    <small>[Optional]</small>
                    <p>Partner Name</p>
                  </div>
                  <div className="instruction">
                    <small>Please select address</small>
                  </div>
                </label>
                {/* Address map */}
                <input type="text" name="" value={formData.address}
                onChange={handleChange}
                required
                className="input" id="" placeholder="Enter business partner's address" />
              </div>
            </div>
            <div>
              <p>Profile Photo</p>
              <ImageUpload/>
            </div>
          </div>
          
          <div className="btnContainer">
            <button type="button" onClick={handleCancel} className="cancelBtn">
              Cancel
            </button>
            <button type="submit" className="saveBtn" onClick={handleSubmit}>
              {id ? "Update" : "Register"}
            </button>
            {id &&
              <button type="button" onClick={() =>handleDelete(id)} className="deleteBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 30 30" fill="none">
                <path d="M4.6875 7.5H8.4375V5.15625C8.4375 4.12207 9.27832 3.28125 10.3125 3.28125H19.6875C20.7217 3.28125 21.5625 4.12207 21.5625 5.15625V7.5H25.3125C25.8311 7.5 26.25 7.91895 26.25 8.4375V9.375C26.25 9.50391 26.1445 9.60938 26.0156 9.60938H24.2461L23.5225 24.9316C23.4756 25.9307 22.6494 26.7188 21.6504 26.7188H8.34961C7.34766 26.7188 6.52441 25.9336 6.47754 24.9316L5.75391 9.60938H3.98438C3.85547 9.60938 3.75 9.50391 3.75 9.375V8.4375C3.75 7.91895 4.16895 7.5 4.6875 7.5ZM10.5469 7.5H19.4531V5.39062H10.5469V7.5Z" fill="#F24822"/>
              </svg>
              </button>}
          </div>
        </form>
      </div>
    </div>
  )
}

