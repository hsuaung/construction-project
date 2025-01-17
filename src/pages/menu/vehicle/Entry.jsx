import React, { useState } from 'react'
import "../../../assets/styles/vehicle.scss";
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
                {/* image Component */}
            </form>
        </div>
    </div>
  )
}
