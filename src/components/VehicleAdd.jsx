import { useNavigate } from "react-router-dom";
import "./StaffAdd.scss";
export default function StaffAdd({ showVehicleAdd, setShowVehicleAdd }) {
  const navigate = useNavigate();
  const handleCancel = () => {
    setShowVehicleAdd(false);

    navigate("/");
  };
  return (
    <>
      <div className="bgBlur"></div>
      <div className="entryContainer homeAddContainer">
        <div className="modelTitle">
          <h4>Vehicle ADD</h4>
        </div>
        <div className="modelContent">
          <div className="current">Current</div>
          <div className="new">New</div>
        </div>
        <hr />
        <div className="btnGp">
          <button type="button" onClick={handleCancel} className="cancelBtn">
            Cancel
          </button>
          <button className="saveBtn">Save</button>
        </div>
      </div>
    </>
  );
}
