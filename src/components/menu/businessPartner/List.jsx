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
  const { data: users, loading, error } = useFetchData("http://localhost:8383/user/list", deleteStatus);
  
  const [businessPartners, setBusinessPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModelBox, setShowCreateModelBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (users) {
      setBusinessPartners(users);
    }
  }, [users]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = businessPartners.findIndex((item) => item.id === active.id);
    const newIndex = businessPartners.findIndex((item) => item.id === over.id);

    const updatedBusinessPartners = arrayMove(businessPartners, oldIndex, newIndex);
    setBusinessPartners(updatedBusinessPartners);

     // Persist the updated order to the backend
     try {
      await axios.post("http://localhost:8383/user/update-order", { items: updatedBusinessPartners });
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

  const filteredBusinessPartners = businessPartners.filter((businessPartner) =>
    ["user_name", "user_email"].some((key) =>
      String(businessPartner[key] || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
                onClick={() => sortBusinessPartners("user_email")}
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
                onClick={() => sortBusinessPartners("user_email")}
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
                onClick={() => sortBusinessPartners("user_email")}
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
                onClick={() => sortBusinessPartners("user_email")}
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
                onClick={() => sortBusinessPartners("user_email")}
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
          <SortableContext items={filteredBusinessPartners} strategy={verticalListSortingStrategy}>
            <Column tasks={filteredBusinessPartners} />
          </SortableContext>
          </DndContext>
        </section>
      </div>
      {/* {showCreateModelBox && <Entry />} */}
      {showCreateModelBox && <Entry showCreateModelBox={showCreateModelBox} setShowCreateModelBox={setShowCreateModelBox} />}
    </>
  );
}
