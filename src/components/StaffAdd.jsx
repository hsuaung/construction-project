import { useNavigate } from "react-router-dom";
import "./StaffAdd.scss";
import { useFetchData } from "../components/HOC/UseFetchData";
import { useCRUD } from "../components/HOC/UseCRUD";
export default function StaffAdd({
  showStaffAdd,
  setShowStaffAdd,
  site,
  siteOperationId,
}) {
  const navigate = useNavigate();
  const handleCancel = () => {
    setShowStaffAdd(false);
    navigate("/");
  };
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
    data: Staffs,
    loading,
    error,
    refetch: refetchStaffs,
  } = useFetchData("http://localhost:8383/staff/list", deleteStatus);

  return (
    <>
      <div className="bgBlur"></div>
      <div className="entryContainer homeAddContainer">
        <div className="modelTitle">
          <h4>
            {site} {siteOperationId}
          </h4>
        </div>
        <div className="modelContent">
          <div className="current">Current</div>
          <div className="new">
            New
            {Staffs.map((staff) => (
              <p>{staff.name}</p>
            ))}
          </div>
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
