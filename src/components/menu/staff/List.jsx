import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../HOC/searchAndFilter/Search";
import { useFetchData } from "../../HOC/UseFetchData";
import { useCRUD } from "../../HOC/UseCRUD";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Entry from "./Entry";
import Column from "./Column/Column";
import "./list.scss";
export default function List(params) {
  const {
    handleDelete,
    loading: crudLoading,
    error: crudError,
    deleteStatus,
  } = useCRUD();
  const {
    data: users,
    loading,
    error,
  } = useFetchData("http://localhost:8383/operationtypes/list", deleteStatus);

  console.log("Hsu ", users);
  // axios
  //   .get("http://localhost:8383/skill/list")
  //   .then((response) => {
  //     console.log(response.data); // Logs the actual data
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data:", error);
  //   });

  const [staffs, setStaffs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModelBox, setShowCreateModelBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (users) {
      setStaffs(users);
    }
  }, [users]);

  const handleEdit = (id) => {
    console.log("Edit subject:", id);
    navigate(`/operation-type/detail/edit/${id}`);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = staffs.findIndex((item) => item.id === active.id);
    const newIndex = staffs.findIndex((item) => item.id === over.id);

    const updatedStaffs = arrayMove(staffs, oldIndex, newIndex);
    setStaffs(updatedStaffs);

    // Persist the updated order to the backend
    try {
      await axios.post("http://localhost:8383/user/update-order", {
        items: updatedStaffs,
      });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const sortStaffs = (key, isDate = false) => {
    setStaffs((prevStaffs) => {
      return [...prevStaffs].sort((a, b) => {
        const valA = a[key] || "";
        const valB = b[key] || "";
        return isDate
          ? new Date(valA) - new Date(valB)
          : valA.localeCompare(valB);
      });
    });
  };

  const filteredStaffs = staffs.filter((staff) =>
    ["user_name", "user_email"].some((key) =>
      String(staff[key] || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  const toggleCreateModelBox = () => setShowCreateModelBox((prev) => !prev);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="container">
        <section className="searchAndFilter">
          <Search searchQuery={searchQuery} onSearch={setSearchQuery} />
          <div className="filterContainer">
            <div className="download buttonOne">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 16L17 11L15.6 9.55L13 12.15V4H11V12.15L8.4 9.55L7 11L12 16ZM18 20C18.55 20 19.0207 19.8043 19.412 19.413C19.8033 19.0217 19.9993 18.5507 20 18V15H18V18H6V15H4V18C4 18.55 4.19567 19.021 4.587 19.413C4.97833 19.805 5.44933 20.0007 6 20H18Z" />
              </svg>
            </div>
            <button className="createNewBtn" onClick={toggleCreateModelBox}>
              + Create New
            </button>
          </div>
        </section>

        <section className="list">
          <div className="staffHeader">
            <div></div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M0.562477 15.6125C0.582222 15.9077 0.608208 16.1809 0.642405 16.4349C0.781563 17.4686 1.0484 18.1099 1.52571 18.5876C2.00279 19.0651 2.64385 19.3319 3.67765 19.471C4.72582 19.6119 6.10036 19.613 8 19.613H12C13.8996 19.613 15.2739 19.6117 16.3219 19.4706C17.3556 19.3314 17.9969 19.0646 18.4746 18.5873C18.9521 18.1102 19.2189 17.4691 19.358 16.4354C19.4989 15.3872 19.5 14.0126 19.5 12.113V8.113C19.5 6.21336 19.4989 4.83882 19.358 3.79065C19.2817 3.22343 19.1669 2.77445 19 2.4059V13.613V14.8201L18.1464 13.9666L16.2366 12.0567C16.2365 12.0566 16.2365 12.0566 16.2364 12.0566C15.5552 11.3759 15.073 10.8946 14.6715 10.5713C14.2724 10.2499 14.0175 10.1396 13.8006 10.1212C13.5254 10.098 13.249 10.1512 13.0021 10.275C12.8076 10.3725 12.6119 10.5694 12.3608 11.0159C12.1082 11.465 11.8392 12.0913 11.4596 12.977L11.4068 13.1005L11.4064 13.1014L11.3939 13.1304C11.24 13.4888 11.1105 13.7901 10.9849 14.0205C10.8551 14.2584 10.6963 14.4859 10.4523 14.6371L10.4517 14.6374C10.1387 14.8307 9.76554 14.9023 9.40322 14.8384L0.562477 15.6125ZM0.562477 15.6125C1.08226 15.6047 1.59607 15.4986 2.07671 15.2996C2.57663 15.0926 3.03088 14.7891 3.41352 14.4066L3.41355 14.4066L4.16555 13.6546C4.53187 13.2882 4.78718 13.0334 5.00115 12.8491C5.21118 12.6683 5.35149 12.5824 5.47718 12.5357L5.47725 12.5357C5.81447 12.4103 6.18553 12.4103 6.52275 12.5357L6.52282 12.5357C6.64864 12.5824 6.78925 12.6684 6.9991 12.8491C7.21283 13.0332 7.4679 13.288 7.83296 13.6541L7.835 13.6561L7.83501 13.6561L7.94745 13.7676L7.94901 13.7691L0.562477 15.6125Z"
                  fill="black"
                  stroke="white"
                />
                <path
                  d="M19 8.11304C19 6.19904 18.998 4.86404 18.862 3.85704C18.731 2.87904 18.49 2.36104 18.122 1.99204C17.752 1.62204 17.234 1.38204 16.256 1.25104C15.249 1.11504 13.914 1.11304 12 1.11304H8C6.086 1.11304 4.751 1.11504 3.744 1.25104C2.766 1.38204 2.248 1.62304 1.879 1.99104C1.509 2.36104 1.269 2.87904 1.137 3.85704C1.002 4.86404 1 6.19904 1 8.11304V12.113C1 14.027 1.002 15.362 1.137 16.369C1.269 17.347 1.51 17.865 1.879 18.234C2.248 18.604 2.766 18.844 3.744 18.976C4.751 19.111 6.086 19.113 8 19.113H12C13.914 19.113 15.249 19.111 16.256 18.976C17.234 18.844 17.752 18.603 18.121 18.234C18.491 17.865 18.731 17.347 18.862 16.369C18.998 15.362 19 14.027 19 12.113V8.11304Z"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  d="M5.5 7.11304C5.5 7.94146 6.17157 8.61304 7 8.61304C7.82843 8.61304 8.5 7.94146 8.5 7.11304C8.5 6.28461 7.82843 5.61304 7 5.61304C6.17157 5.61304 5.5 6.28461 5.5 7.11304Z"
                  fill="black"
                  stroke="white"
                />
              </svg>
            </div>
            <div>
              <p>Staff Name</p>
              <svg
                onClick={() => sortStaffs("user_name")}
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
                onClick={() => sortStaffs("user_email")}
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
              <p>Team</p>
              <svg
                onClick={() => sortStaffs("user_email")}
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
              <p>Staff Type</p>
              <svg
                onClick={() => sortStaffs("user_email")}
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
              <p>Status</p>
              <svg
                onClick={() => sortStaffs("user_email")}
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
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <SortableContext
              items={filteredStaffs}
              strategy={verticalListSortingStrategy}
            >
              <Column tasks={filteredStaffs} />
            </SortableContext>
          </DndContext>
        </section>
      </div>
      {showCreateModelBox && (
        <Entry
          showCreateModelBox={showCreateModelBox}
          setShowCreateModelBox={setShowCreateModelBox}
        />
      )}
    </>
  );
}
