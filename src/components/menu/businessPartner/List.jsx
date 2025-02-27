import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../HOC/searchAndFilter/Search";
import { useFetchData } from "../../HOC/UseFetchData";
import { useCRUD } from "../../HOC/UseCRUD";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Entry from "./Entry";
import Column from "./Column/Column";
import "../../../assets/styles/list.scss"

export default function List(params) {
  const { handleDelete, loading: crudLoading, error: crudError, deleteStatus } = useCRUD();
  const { data: businesspartners, loading, error } = useFetchData("http://localhost:8383/businesspartner/list", deleteStatus);
  
  
  const [businessPartners, setBusinessPartners] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [projectCounts,setProjectCounts] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModelBox, setShowCreateModelBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (businesspartners) {
      setBusinessPartners(businesspartners);
      fetchAdminData();
      fetchProjectCounts();
    }
  }, [businesspartners]);

  

  // fetch not in db datas
  const fetchAdminData = async () => {
    try {
      const staffIds = [...new Set(businesspartners.map((bp) => bp.staffId))];
  
      if (staffIds.length === 0) return; // Avoid unnecessary requests
  
      const staffPromises = staffIds.map((id) =>
        axios.get(`http://localhost:8383/staff/getbyid/${id}`)
      );
  
      const staffResponses = await Promise.all(staffPromises);
  
      const staffDataMap = staffResponses.reduce((acc, response) => {
        if (response.data && response.data.id) {
          acc[response.data.id] = response.data.name;
        }
        return acc;
      }, {});
  
      setAdminData(staffDataMap);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const fetchProjectCounts = async () => {
    try {
      const countPromises = businesspartners.map((bp) =>
        axios.get(`http://localhost:8383/site/getbybusinesspartnerid/${bp.id}`)
      );
  
      const countResponses = await Promise.all(countPromises);
  
      const projectCountMap = countResponses.reduce((acc, response, index) => {
        acc[businesspartners[index].id] = response.data.length || 0;
        return acc;
      }, {});
  
      setProjectCounts(projectCountMap);
    } catch (error) {
      console.error("Error fetching project counts:", error);
    }
  };
  


  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = businessPartners.findIndex((item) => item.id === active.id);
    const newIndex = businessPartners.findIndex((item) => item.id === over.id);

    const updatedBusinessPartners = arrayMove(businessPartners, oldIndex, newIndex);
    setBusinessPartners(updatedBusinessPartners);

     // Persist the updated order to the backend
     try {
      await axios.post("http://localhost:8383/businesspartner/update-order", { items: updatedBusinessPartners });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const sortBusinessPartners = (key, isDate = false) => {
    setBusinessPartners((prevBusinessPartners) => {
      return [...prevBusinessPartners].sort((a, b) => {
        const valA = a[key] || "";
        const valB = b[key] || "";
        return isDate ? new Date(valA) - new Date(valB) : valA.localeCompare(valB);
      });
    });
  };

  // sort not in db datas
  const sortAdminName = () => {
    if (Object.keys(adminData).length === 0) return; // Ensure adminData is populated
  
    setBusinessPartners((prevBusinessPartners) => {
      return [...prevBusinessPartners].sort((a, b) => {
        const staffNameA = adminData[a.staffId] || "";
        const staffNameB = adminData[b.staffId] || "";
        return staffNameA.localeCompare(staffNameB);
      });
    });
  };

  const sortNumberOfProjects = () => {
    setBusinessPartners((prevBusinessPartners) => {
      return [...prevBusinessPartners].sort((a, b) => {
        const projectsA = projectCounts[a.id] || 0
        const projectsB = projectCounts[b.id] || 0
        return projectsA - projectsB
      })
    })
  }

  

  // const filteredBusinessPartners = businessPartners.filter((businessPartner) =>
  //   ["name", "email","phonenumber"].some((key) =>
  //     String(businessPartner[key] || "").toLowerCase().includes(searchQuery.toLowerCase())||
  // (adminData[businessPartner.StaffId] || "").toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );
  const filteredBusinessPartners = businessPartners.filter((businessPartner) => {
    const query = searchQuery.toLowerCase();
  
    return ["name", "email", "phonenumber"].some((key) =>
      String(businessPartner[key] || "").toLowerCase().includes(query)
    ) ||
      // Include adminData (Added By)
      (adminData[businessPartner.staffId] || "").toLowerCase().includes(query) ||
      // Include projectCounts (Number of Projects)
      String(projectCounts[businessPartner.id] || 0).includes(query);
  });

  
  
  

  const handleCreateModelBox = () => {
    setShowCreateModelBox(true);
    console.log("Testing CreateModelBox");
    setSelectedTaskId(null);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="container">
        <section className="searchAndFilter">
          <Search searchQuery={searchQuery} onSearch={setSearchQuery} />
          <div className="filterContainer">
            <div className="download buttonOne">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16L17 11L15.6 9.55L13 12.15V4H11V12.15L8.4 9.55L7 11L12 16ZM18 20C18.55 20 19.0207 19.8043 19.412 19.413C19.8033 19.0217 19.9993 18.5507 20 18V15H18V18H6V15H4V18C4 18.55 4.19567 19.021 4.587 19.413C4.97833 19.805 5.44933 20.0007 6 20H18Z" />
              </svg>
            </div>
          <button className="createNewBtn" onClick={handleCreateModelBox}>
            + Create New
          </button>
          </div>
        </section>

        <section className="list">
          <div className="businessPartnerListHeader">
            <div></div>
            <div>
              {/* image */}
              {/* <svg
                onClick={() => sortBusinessPartners("user_name")}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg> */}
            </div>
            <div>
              <p>Partner Name</p>
              <svg
                onClick={() => sortBusinessPartners("name")}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p>Email</p>
              <svg
                onClick={() => sortBusinessPartners("email")}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p>Phone number</p>
              <svg
                onClick={() => sortBusinessPartners("phonenumber")}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p>No. of Projects</p>
              <svg
                onClick={sortNumberOfProjects}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p>Added By</p>
              <svg
                onClick={sortAdminName}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div></div>
          </div>
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <SortableContext items={filteredBusinessPartners.map((bp) => bp.id)} strategy={verticalListSortingStrategy}>
          {filteredBusinessPartners.length === 0 ? (
            <p>No business partners found.</p>
          ) : (
            <Column tasks={filteredBusinessPartners} />
          )}
          </SortableContext>
          </DndContext>
        </section>
      </div>
      {/* {showCreateModelBox && <Entry />} */}
      {showCreateModelBox && <Entry showCreateModelBox={showCreateModelBox} setShowCreateModelBox={setShowCreateModelBox} />}
    </>
  );
}



