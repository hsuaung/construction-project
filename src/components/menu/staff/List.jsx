import React, { useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Column from "./Column/Column";
import { arrayMove } from "@dnd-kit/sortable";
export default function List() {
  const [staffs, setStaffs] = useState([
    {
      id: 1,
      name: "James Carter",
      image: "../../../assets/images/sample.webp",
      userTypeId: 2,
      teamId: 1,
      email: "james.carter@constructionco.com",
      password: "hashed_password_1",
      address: "120 Builder's Lane, Denver, USA",
      phonenumber: "+12345678901",
      employmentStatus: "current working",
      workingStatus: "busy",
      position: "Construction Manager",
      dob: "1980-02-10",
      joinedDate: "2010-05-15",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 2,
      name: "Emily Davis",
      image: "../../../assets/images/sample.webp",
      userTypeId: 2,
      teamId: 2,
      email: "emily.davis@constructionco.com",
      password: "hashed_password_2",
      address: "200 Crane Avenue, Miami, USA",
      phonenumber: "+12345678902",
      employmentStatus: "current working",
      workingStatus: "busy",
      position: "Site Supervisor",
      dob: "1985-07-19",
      joinedDate: "2015-04-22",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 3,
      name: "Michael Brown",
      image: "../../../assets/images/sample.webp",
      userTypeId: 2,
      teamId: 3,
      email: "michael.brown@constructionco.com",
      password: "hashed_password_3",
      address: "300 Hammer Street, Austin, USA",
      phonenumber: "+12345678903",
      employmentStatus: "current working",
      workingStatus: "available",
      position: "Civil Engineer",
      dob: "1990-10-25",
      joinedDate: "2018-09-30",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 4,
      name: "Sophia Wilson",
      image: "../../../assets/images/sample.webp",
      userTypeId: 3,
      teamId: 4,
      email: "sophia.wilson@constructionco.com",
      password: "hashed_password_4",
      address: "400 Brick Road, Seattle, USA",
      phonenumber: "+12345678904",
      employmentStatus: "current working",
      workingStatus: "busy",
      position: "Architect",
      dob: "1988-11-15",
      joinedDate: "2012-03-18",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 5,
      name: "Robert Taylor",
      image: "../../../assets/images/sample.webp",
      userTypeId: 3,
      teamId: 5,
      email: "robert.taylor@constructionco.com",
      password: "hashed_password_5",
      address: "500 Builder's Alley, Chicago, USA",
      phonenumber: "+12345678905",
      employmentStatus: "retired",
      workingStatus: "available",
      position: "Former Construction Worker",
      dob: "1960-05-15",
      joinedDate: "1980-06-01",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },

    {
      id: 6,
      name: "Linda Martinez",
      image: "../../../assets/images/sample.webp",
      userTypeId: 2,
      teamId: 6,
      email: "linda.martinez@constructionco.com",
      password: "hashed_password_6",
      address: "600 Scaffold Street, Houston, USA",
      phonenumber: "+12345678906",
      employmentStatus: "current working",
      workingStatus: "available",
      position: "Safety Officer",
      dob: "1992-12-08",
      joinedDate: "2017-08-12",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 7,
      name: "Daniel White",
      image: "../../../assets/images/sample.webp",
      userTypeId: 3,
      teamId: 7,
      email: "daniel.white@constructionco.com",
      password: "hashed_password_7",
      address: "700 Beam Boulevard, Los Angeles, USA",
      phonenumber: "+12345678907",
      employmentStatus: "retired",
      workingStatus: "available",
      position: "Former Equipment Operator",
      dob: "1958-03-30",
      joinedDate: "1982-09-10",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 8,
      name: "Sarah Lee",
      image: "../../../assets/images/sample.webp",
      userTypeId: 2,
      teamId: 8,
      email: "sarah.lee@constructionco.com",
      password: "hashed_password_8",
      address: "800 Drill Road, Phoenix, USA",
      phonenumber: "+12345678908",
      employmentStatus: "current working",
      workingStatus: "busy",
      position: "Project Coordinator",
      dob: "1987-04-14",
      joinedDate: "2014-05-18",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 9,
      name: "Paul Harris",
      image: "../../../assets/images/sample.webp",
      userTypeId: 2,
      teamId: 9,
      email: "paul.harris@constructionco.com",
      password: "hashed_password_9",
      address: "900 Blueprint Avenue, Dallas, USA",
      phonenumber: "+12345678909",
      employmentStatus: "current working",
      workingStatus: "available",
      position: "Electrician",
      dob: "1983-09-22",
      joinedDate: "2011-11-03",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
    {
      id: 10,
      name: "Anna Roberts",
      image: "../../../assets/images/sample.webp",
      userTypeId: 3,
      teamId: 10,
      email: "anna.roberts@constructionco.com",
      password: "hashed_password_10",
      address: "1000 Foundation Road, Las Vegas, USA",
      phonenumber: "+12345678910",
      employmentStatus: "retired",
      workingStatus: "available",
      position: "Former Structural Engineer",
      dob: "1965-11-12",
      joinedDate: "1990-02-05",
      createdAt: "2025-01-27",
      updatedAt: "2025-01-27",
    },
  ]);
  const getStaffPosition = (id) => staffs.findIndex((v) => v.id === id);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setStaffs((prevStaffs) => {
        const oldIndex = getStaffPosition(active.id);
        const newIndex = getStaffPosition(over.id);
        return arrayMove(prevStaffs, oldIndex, newIndex); // Use array-move library or custom logic
      });
    }
  };

  const sortStaffs = (key, isDate = false) => {
    setStaffs((prevStaffs) => {
      return [...prevStaffs].sort((a, b) => {
        if (isDate) {
          return new Date(a[key]) - new Date(b[key]);
        }
        return a[key].localeCompare(b[key]);
      });
    });
  };
  const [searchQuery, setSearchQuery] = useState("");
  const filteredStaffs = staffs.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <section className="list">
          <div className="listHeader">
            <div></div>
            <div>
              <p>Displayed Car Name</p>
              <svg
                onClick={() => sortStaffs("name")}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <p>Group/ Type</p>
              <svg
                onClick={() => sortStaffs("group")}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <p>Vehicle Inspection Expiration Date/ Regular Inspection Date</p>
              <svg
                onClick={() => sortStaffs("VIEDate_RIDate", true)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <p>Insurance Expiration Date</p>
              <svg
                onClick={() => sortStaffs("IEDate", true)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                viewBox="0 0 21 24"
                fill="currentColor"
              >
                <path
                  d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div></div>
          </div>
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <Column tasks={filteredStaffs} />
          </DndContext>
        </section>
      </div>
    </>
  );
}
