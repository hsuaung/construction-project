import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCRUD } from "../HOC/UseCRUD";
import { useFetchData } from "../HOC/UseFetchData";
import dayjs from "dayjs";
import OperationType from "./OperationType";
export default function OperationForm({
  onCancel,
  onSuccess,
  siteId,
  showCreateModelBox,
  setShowCreateModelBox,
  setShowEditModelBox,
  showEditModelBox,
}) {
  console.log("SITE ID IDIDID", siteId);
  const {
    handleDelete,
    handleCreate,
    handleEdit,
    loading: crudLoading,
    error: crudError,
    deleteStatus,
    refetch,
  } = useCRUD();
  const {
    data: initialOperations,
    loading,
    error,
    refetch: refetchOperationList,
  } = useFetchData("http://localhost:8383/operationtypes/list", deleteStatus);
  console.log("Operation", initialOperations);
  const [formData, setFormData] = useState({
    siteId: siteId || "", // Avoid undefined
    operationtypesId: "",
    startDate: "",
    endDate: "",
    workinghourStart: "",
    workinghourEnd: "",
    requiredStaff: "",
    requiredVehicle: "",
  });

  const [operationOptions, setOperationOptions] = useState([]);
  const [createOperation, setCreateOperation] = useState(false);
  useEffect(() => {
    setOperationOptions(initialOperations || []);
  }, [initialOperations]);
  console.log("Operation Option from Edit", operationOptions);

  const handleOperationCreated = (newOperation) => {
    setOperationOptions((prevOperations) => [...prevOperations, newOperation]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateOperation = () => {
    // navigate("/staff/team");
    console.log("handle Create Operation");
    setCreateOperation(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata0", formData);

    const url = "http://localhost:8383/siteoperation/add";
    const method = "POST";
    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      console.log(formData);
      if (onSuccess) {
        onSuccess();
      }
      onCancel();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  return (
    <div>
      <div className="bgBlur"> </div>

      <form onSubmit={handleSubmit} className="editScheduleTab  ">
        <div className="title">
          <h4>Add Operation to this site</h4>
        </div>

        <div className=" editScheduleTabContent">
          <div>
            <label htmlFor="operationtypesId" className="inputLabel">
              <div className="flexRow">
                <small>[Required]</small>
                <p>Operation Type</p>
              </div>
              <div className="instruction">
                <small>Please Select Operation</small>
              </div>
            </label>
            <div className="flexRow operationRow">
              <select
                name="operationtypesId"
                id="operationtypesId"
                onChange={handleChange}
                value={formData.operationtypesId}
                className="input"
                required
              >
                <option value="" disabled>
                  --- Select Operation ---
                </option>
                {operationOptions.map((option, index) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <button onClick={handleCreateOperation} className="addBtn">
                +
              </button>
              {createOperation && (
                <OperationType
                  createOperation={createOperation}
                  setCreateOperation={setCreateOperation}
                  operationOptions={operationOptions}
                  setOperationOptions={setOperationOptions}
                  onOperationCreated={handleOperationCreated}
                  showCreateModelBox={showCreateModelBox}
                  showEditModelBox={showEditModelBox}
                  setShowCreateModelBox={setShowCreateModelBox}
                  setShowEditModelBox={setShowEditModelBox}
                  onSuccess={refetchOperationList}
                />
              )}
            </div>
            <div>
              <label htmlFor="startDate" className="inputLabel">
                <div className="flexRow">
                  <small>[Required]</small>
                  <p>Schedule</p>
                </div>
                <div className="instruction">
                  <small>Please Select Schedule Date</small>
                </div>
              </label>
              <div className="flexContainer">
                <div className="flexDiv">
                  <p>Start: </p>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    className="input"
                    value={
                      formData.startDate
                        ? dayjs(formData.startDate).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="flexDiv">
                  <p>End:</p>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    className="input"
                    value={
                      formData.endDate
                        ? dayjs(formData.endDate).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="joinedDate" className="inputLabel">
                <div className="flexRow">
                  <small>[Required]</small>
                  <p>Working Hour</p>
                </div>
                <div className="instruction">
                  <small>Please Select Schedule Date</small>
                </div>
              </label>
              <div className="  flexContainer">
                <div className=" flexDiv">
                  <p>Start: </p>
                  <select
                    name="workinghourStart"
                    id="workinghourStart"
                    onChange={handleChange}
                    value={formData.workinghourStart}
                    className="input"
                    required
                  >
                    <option value="">Select Start Time</option>
                    <option value="6">6 AM</option>
                    <option value="7">7 AM</option>
                    <option value="8">8 AM</option>
                    <option value="9">9 AM</option>
                    <option value="10">10 AM</option>
                  </select>
                </div>
                <div className="flexRowm flexDiv ">
                  <p>End:</p>
                  <select
                    name="workinghourEnd"
                    id="workinghourEnd"
                    onChange={handleChange}
                    value={formData.workinghourEnd}
                    className="input"
                    required
                  >
                    <option value="">Select Start Time</option>
                    <option value="3">3 PM</option>
                    <option value="4">4 PM</option>
                    <option value="5">5 PM</option>
                    <option value="6">6 PM</option>
                    <option value="7">7 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="schedule" className="inputLabel">
              <div className="flexRow">
                <small>[Required]</small>
                <p>Requirements</p>
              </div>
              <div className="instruction">
                <small>Please type Requirement</small>
              </div>
            </label>
            <div className="flexContainer">
              <div className="flexDiv">
                <p>Staffs: </p>
                <input
                  type="number"
                  name="requiredStaff"
                  id="requiredStaff"
                  required
                  class="input"
                  min="1"
                  step="1"
                  readonly
                  onChange={handleChange}
                  value={formData.requiredStaff}
                />
              </div>
              <div className="flexDiv">
                <p>Vehicles:</p>
                <input
                  type="number"
                  name="requiredVehicle"
                  id="requiredVehicle"
                  required
                  class="input"
                  min="1"
                  step="1"
                  onkeydown="return false;"
                  onChange={handleChange}
                  value={formData.requiredVehicle}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="operationFormBtnContainer editBtnContainer ">
          <div></div>
          <div className="btnWrapper">
            <button onClick={onCancel} className="">
              Cancel
            </button>
            <button type="submit" className="saveBtn">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>

    // <div className="bgBlur">
    //   <form onSubmit={handleSubmit} className="editScheduleTab  ">
    //     <h4>Add Operation to this site</h4>

    //     <div className=" editScheduleTabContent">
    //       <div>
    //         <label htmlFor="operationtypesId" className="inputLabel">
    //           <div className="flexRow">
    //             <small>[Required]</small>
    //             <p>Operation Type</p>
    //           </div>
    //           <div className="instruction">
    //             <small>Please Select Operation</small>
    //           </div>
    //         </label>
    //         <div className="flexRow operationRow">
    //           <select
    //             name="operationtypesId"
    //             id="operationtypesId"
    //             onChange={handleChange}
    //             value={formData.operationtypesId}
    //             className="input"
    //             required
    //           >
    //             <option value="" disabled>
    //               --- Select Operation ---
    //             </option>
    //             {operationOptions.map((option, index) => (
    //               <option key={option.id} value={option.id}>
    //                 {option.name}
    //               </option>
    //             ))}
    //           </select>

    //           <button onClick={handleCreateOperation} className="addBtn">
    //             +
    //           </button>
    //           {createOperation && (
    //             <OperationType
    //               createOperation={createOperation}
    //               setCreateOperation={setCreateOperation}
    //               operationOptions={operationOptions}
    //               setOperationOptions={setOperationOptions}
    //               onOperationCreated={handleOperationCreated}
    //               showCreateModelBox={showCreateModelBox}
    //               showEditModelBox={showEditModelBox}
    //               setShowCreateModelBox={setShowCreateModelBox}
    //               setShowEditModelBox={setShowEditModelBox}
    //               onSuccess={refetchOperationList}
    //             />
    //           )}
    //         </div>
    //         <div>
    //           <label htmlFor="startDate" className="inputLabel">
    //             <div className="flexRow">
    //               <small>[Required]</small>
    //               <p>Schedule</p>
    //             </div>
    //             <div className="instruction">
    //               <small>Please Select Schedule Date</small>
    //             </div>
    //           </label>
    //           <div className="flexContainer">
    //             <div className="flexDiv">
    //               <p>Start: </p>
    //               <input
    //                 type="date"
    //                 name="startDate"
    //                 id="startDate"
    //                 required
    //                 className="input"
    //                 value={
    //                   formData.startDate
    //                     ? dayjs(formData.startDate).format("YYYY-MM-DD")
    //                     : ""
    //                 }
    //                 onChange={handleChange}
    //               />
    //             </div>
    //             <div className="flexDiv">
    //               <p>End:</p>
    //               <input
    //                 type="date"
    //                 name="endDate"
    //                 id="endDate"
    //                 required
    //                 className="input"
    //                 value={
    //                   formData.endDate
    //                     ? dayjs(formData.endDate).format("YYYY-MM-DD")
    //                     : ""
    //                 }
    //                 onChange={handleChange}
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div>
    //           <label htmlFor="joinedDate" className="inputLabel">
    //             <div className="flexRow">
    //               <small>[Required]</small>
    //               <p>Working Hour</p>
    //             </div>
    //             <div className="instruction">
    //               <small>Please Select Schedule Date</small>
    //             </div>
    //           </label>
    //           <div className="  flexContainer">
    //             <div className=" flexDiv">
    //               <p>Start: </p>
    //               <select
    //                 name="workinghourStart"
    //                 id="workinghourStart"
    //                 onChange={handleChange}
    //                 value={formData.workinghourStart}
    //                 className="input"
    //                 required
    //               >
    //                 <option value="">Select Start Time</option>
    //                 <option value="6">6 AM</option>
    //                 <option value="7">7 AM</option>
    //                 <option value="8">8 AM</option>
    //                 <option value="9">9 AM</option>
    //                 <option value="10">10 AM</option>
    //               </select>
    //             </div>
    //             <div className="flexRowm flexDiv ">
    //               <p>End:</p>
    //               <select
    //                 name="workinghourEnd"
    //                 id="workinghourEnd"
    //                 onChange={handleChange}
    //                 value={formData.workinghourEnd}
    //                 className="input"
    //                 required
    //               >
    //                 <option value="">Select Start Time</option>
    //                 <option value="3">3 PM</option>
    //                 <option value="4">4 PM</option>
    //                 <option value="5">5 PM</option>
    //                 <option value="6">6 PM</option>
    //                 <option value="7">7 PM</option>
    //               </select>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <label htmlFor="schedule" className="inputLabel">
    //           <div className="flexRow">
    //             <small>[Required]</small>
    //             <p>Requirements</p>
    //           </div>
    //           <div className="instruction">
    //             <small>Please type Requirement</small>
    //           </div>
    //         </label>
    //         <div className="flexContainer">
    //           <div className="flexDiv">
    //             <p>Staffs: </p>
    //             <input
    //               type="number"
    //               name="requiredStaff"
    //               id="requiredStaff"
    //               required
    //               class="input"
    //               min="1"
    //               step="1"
    //               readonly
    //               onChange={handleChange}
    //               value={formData.requiredStaff}
    //             />
    //           </div>
    //           <div className="flexDiv">
    //             <p>Vehicles:</p>
    //             <input
    //               type="number"
    //               name="requiredVehicle"
    //               id="requiredVehicle"
    //               required
    //               class="input"
    //               min="1"
    //               step="1"
    //               onkeydown="return false;"
    //               onChange={handleChange}
    //               value={formData.requiredVehicle}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="editBtnContainer">
    //       <div></div>
    //       <div className="btnWrapper">
    //         <button onClick={onCancel} className="">
    //           Cancel
    //         </button>
    //         <button type="submit" className="saveBtn">
    //           Update
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}
