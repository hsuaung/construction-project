import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../components/HOC/UseFetchData";
import { useCRUD } from "../components/HOC/UseCRUD";
import Search from "./HOC/searchAndFilter/Search";
import axios from "axios";
import "./StaffAdd.scss";

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

  const { deleteStatus } = useCRUD();
  const { data: Staffs } = useFetchData(
    "http://localhost:8383/staff/list",
    deleteStatus
  );
  const { data: Teams } = useFetchData(
    "http://localhost:8383/team/list",
    deleteStatus
  );
  const { data: selectedStaffs } = useFetchData(
    `http://localhost:8383/siteoperationstaffvehicle/getstaffbysiteoperationtypeid/${siteOperationId}`,
    deleteStatus
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState([]);

  useEffect(() => {
    if (selectedStaffs) {
      setSelectedStaff(selectedStaffs);
    }
  }, [selectedStaffs]);

  const addToPreview = (staff) => {
    setSelectedStaff((prev) => {
      const exists = prev.some((s) => s.Staff?.id === staff.id);
      if (exists) {
        console.log("Staff already exists! Not adding.");
        return prev; // ❌ Prevent duplicate addition
      }
      return [...prev, { Staff: staff }]; // ✅ Add only if unique
    });
  };

  // Remove staff from preview
  const removeFromPreview = (id) => {
    setSelectedStaff((prev) => prev.filter((staff) => staff.Staff?.id !== id));
  };

  // Filter staff based on search query
  const filteredStaffs = Staffs.filter((staff) => {
    const query = searchQuery.toLowerCase();
    return (
      staff.name.toLowerCase().includes(query) ||
      staff.position.toLowerCase().includes(query)
    );
  });

  const handleSave = async () => {
    try {
      // Prepare payload: Include siteOperationId and selectedStaff (can be empty)
      const payload = {
        siteoperationtypesId: siteOperationId,
        selectedStaff: selectedStaff.map((staff) => ({
          staffId: staff.Staff?.id,
          // Ensure this is correctly named
        })),
      };

      console.log("Payload to send:", payload); // Debugging log

      const response = await axios.post(
        "http://localhost:8383/siteoperationstaffvehicle/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data); // Debugging log

      if (response.status === 200 || response.status === 201) {
        // alert(response.data.message || "Data saved successfully!");
        setShowStaffAdd(false); // Close modal
        // navigate("/"); // Redirect if needed
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error saving staff:", error);
      alert(`Failed to save staff. Error: ${error.message}`);
    }
  };

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
          <div className="current">
            <div className="searchBox"></div>
            <div className="singleAddContainer">
              {selectedStaff.map((staff) => {
                const team =
                  Teams?.find((team) => team.id === staff.Staff?.teamId) || {};
                return (
                  <div
                    key={staff.Staff?.id}
                    className="singleAddData"
                    style={{ borderLeft: `12px solid ${team.color || "gray"}` }}
                  >
                    <img
                      src={staff.Staff?.image || "/default-avatar.png"}
                      alt={staff.Staff?.name}
                      width="30px"
                      height="30px"
                    />
                    <div className="data">
                      <p>{staff.Staff?.name}</p>
                      <p>{staff.Staff?.position}</p>
                    </div>
                    <svg
                      onClick={() => removeFromPreview(staff.Staff?.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M16 1L1 16M1 1L16 16"
                        stroke="#FF7B04"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="new">
            <Search
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              className="search"
            />

            <div className="singleAddContainer">
              {filteredStaffs.map((staff) => {
                const team =
                  Teams?.find((team) => team.id === staff.teamId) || {};
                const isSelected = selectedStaff.some(
                  (s) => s.Staff?.id === staff.id
                ); // ✅ FIXED

                return (
                  <div
                    key={staff.id}
                    className={`singleAddData ${isSelected ? "disabled" : ""}`}
                    style={{
                      borderLeft: `12px solid ${team.color || "gray"}`,
                      cursor: isSelected ? "not-allowed" : "pointer",
                      opacity: isSelected ? 0.5 : 1,
                    }}
                    onClick={() => !isSelected && addToPreview(staff)}
                  >
                    <img
                      src={staff.image || "/default-avatar.png"}
                      alt={staff.name}
                      width="30px"
                      height="30px"
                    />
                    <div className="data">
                      <p>{staff.name}</p>
                      <p>{staff.position}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="btnGp">
          <button type="button" onClick={handleCancel} className="cancelBtn">
            Cancel
          </button>
          <button className="saveBtn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}
