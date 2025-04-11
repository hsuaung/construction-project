import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../components/HOC/UseFetchData";
import { useCRUD } from "../components/HOC/UseCRUD";
import Search from "./HOC/searchAndFilter/Search";
import axios from "axios";
import "./StaffAdd.scss";

export default function VehicleAdd({
  showVehicleAdd,
  setShowVehicleAdd,
  site,
  siteOperationId,
}) {
  const navigate = useNavigate();
  const handleCancel = () => {
    setShowVehicleAdd(false);
    navigate("/");
  };

  const { deleteStatus } = useCRUD();
  const { data: Vehicles } = useFetchData(
    "http://localhost:8383/vehicle/list",
    deleteStatus
  );
  console.log("VEHICLES", Vehicles);
  const { data: Groups } = useFetchData(
    "http://localhost:8383/group/list",
    deleteStatus
  );
  console.log("Groups", Groups);
  const { data: selectedVehicles } = useFetchData(
    `http://localhost:8383/siteoperationstaffvehicle/getvehiclebysiteoperationtypeid/${siteOperationId}`,
    deleteStatus
  );
  console.log("SELECTED VEHICLES", selectedVehicles);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState([]);

  useEffect(() => {
    if (selectedVehicles) {
      setSelectedVehicle(selectedVehicles);
    }
  }, [selectedVehicles]);

  const addToPreview = (vehicle) => {
    setSelectedVehicle((prev) => {
      const exists = prev.some((s) => s.Vehicle?.id === vehicle.id);
      if (exists) {
        console.log("vehicle already exists! Not adding.");
        return prev; // ❌ Prevent duplicate addition
      }
      return [...prev, { Vehicle: vehicle }]; // ✅ Add only if unique
    });
  };

  // Remove staff from preview
  const removeFromPreview = (id) => {
    setSelectedVehicle((prev) =>
      prev.filter((vehicle) => vehicle.Vehicle?.id !== id)
    );
  };

  // Filter staff based on search query
  const filteredVehicles = Vehicles.filter((vehicle) => {
    const query = searchQuery.toLowerCase();
    return (
      vehicle.name.toLowerCase().includes(query) ||
      vehicle.status.toLowerCase().includes(query)
    );
  });
  console.log("FILTEREDVEHICLES", filteredVehicles);
  const handleSave = async () => {
    try {
      const payload = {
        siteoperationtypesId: siteOperationId,
        selectedVehicle: selectedVehicle.map((vehicle) => ({
          vehicleId: vehicle.Vehicle?.id,
        })),
      };
      console.log("Payload to send:", payload);
      const response = await axios.post(
        "http://localhost:8383/siteoperationstaffvehicle/addVehicle",
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
        setShowVehicleAdd(false); // Close modal
        // navigate("/"); // Redirect if needed
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error saving staff:", error);
      alert(`Failed to save staff. Error: ${error.message}`);
    }
  };
  // console.log(" vehicles", Vehicles);
  // console.log("filtered vehicles", filteredVehicles);
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
              {selectedVehicle.map((vehicle) => {
                const groupId = vehicle?.Vehicle?.groupId;
                const group = Groups?.find((g) => g.id === groupId) || {};

                return (
                  <div
                    key={vehicle.Vehicle?.id}
                    className="singleAddData"
                    style={{
                      borderLeft: `12px solid ${group.color || "gray"}`,
                    }}
                  >
                    <img
                      src={vehicle.Vehicle?.image || "/default-avatar.png"}
                      alt={vehicle.Vehicle?.name}
                      width="30px"
                      height="30px"
                    />
                    <div className="data">
                      <p>{vehicle.Vehicle?.name}</p>
                      <p>{vehicle.Vehicle?.position}</p>
                    </div>
                    <svg
                      onClick={() => removeFromPreview(vehicle.Vehicle?.id)}
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
              {filteredVehicles.map((vehicle) => {
                const group =
                  Groups?.find((group) => group.id === vehicle.groupId) || {};

                const isSelected = selectedVehicle.some(
                  (v) => v.Vehicle?.id === vehicle.id
                );

                return (
                  <div
                    key={vehicle.id}
                    className={`singleAddData ${isSelected ? "disabled" : ""}`}
                    style={{
                      borderLeft: `12px solid ${group.color || "gray"}`,
                      cursor: isSelected ? "not-allowed" : "pointer",
                      opacity: isSelected ? 0.5 : 1,
                    }}
                    onClick={() => !isSelected && addToPreview(vehicle)}
                  >
                    <img
                      src={vehicle.image || "/default-avatar.png"}
                      alt={vehicle.name}
                      width="30px"
                      height="30px"
                    />
                    <div className="data">
                      <p>{vehicle.name}</p>
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
