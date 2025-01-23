import React, { useState } from 'react'
import "../../../assets/styles/vehicle.scss";
import ImageUpload from '../../HOC/inputBoxes/ImageUpload';
export default function Entry({onSubmit,onClose}) {
    const groups = [ 'Group1', 'Group2', 'Group3' ];
    const [formData, setFormData] = useState({
        photo: null,
        displayName: "",
        groupingType: "",
        inspectionDate: "",
        insuranceDate: "",
        note: "",
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: files ? files[0] : value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };
  return (
    <div className='entryContainer'>
        <div className='modelTitle'><p>Create New Vehicle</p></div>
        <div className='modelContent'>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="photo">Vehicle Photo *</label>
                    <ImageUpload/>
                </div>
                <div>
                    <label htmlFor="">
                      <small>[Required]</small>
                      <p>Display Name</p>
                      <small>Please enter display name (max 20 chars)</small>
                    </label>
                    <input type="text" name="" id="" placeholder='Enter your car display name'/>
                </div>
            </form>
        </div>
    </div>
  )
}
