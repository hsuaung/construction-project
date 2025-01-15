import React, { useState } from 'react';
import Pagination from '../../../components/Pagination'
import "../../../assets/styles/vehicle.scss";
import { closestCorners, DndContext } from '@dnd-kit/core';
import  Column from './Column/Column';
import { arrayMove } from '@dnd-kit/sortable';
import Entry from './Entry';
export default function List() {
  const [showFitlerBox,setShowFilterBox] = useState(false);
  const [vehicles,setVehicles] = useState([
    {
        id: 1,
        name: 'Toyota Mark II',
        group: 'Group1',
        VIEDate_RIDate: '22-12-2025',
        IEDate:'20-12-2025',
        status: 'Currently Deployed',
      },
      {
        id: 2,
        name: 'SUV',
        group: 'Group1',
        VIEDate_RIDate: '22-12-2024',
        IEDate:'20-12-2025',
        status: 'Scrapped',
      },
      {
        id: 3,
        name: 'Toyota',
        group: 'Group2',
        VIEDate_RIDate: '22-12-2025',
        IEDate:'20-12-2025',
        status: 'Currently Deployed',
      },
  ])
  const getVehiclePosition = id => vehicles.findIndex(v => v.id === id)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setVehicles((prevVehicles) => {
        const oldIndex = getVehiclePosition(active.id);
        const newIndex = getVehiclePosition(over.id);
        return arrayMove(prevVehicles, oldIndex, newIndex); // Use array-move library or custom logic
      });
    }
  };

  const sortVehicles = (key, isDate = false) => {
    setVehicles((prevVehicles) => {
      return [...prevVehicles].sort((a, b) => {
        if (isDate) {
          return new Date(a[key]) - new Date(b[key]);
        }
        return a[key].localeCompare(b[key]);
      });
    });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.group.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const uniqueStatuses = [...new Set(vehicles.map(vehicle => vehicle.status))];
  const handleFilterModelBox = () => {
    setShowFilterBox(!showFitlerBox);
  }

  const [showCreateModelBox, setShowCreateModelBox] = useState(false);
  const handleCreateModel = () => {
    setShowCreateModelBox(!showCreateModelBox);
  }
  return (
      <>
      <div className='container'>
        <section className='searchAndFilter'>
          <div className="searchContainer">
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="#FF7B04"/>
            </svg>
          </div>
          <div className="filterContainer">
            <div className="filter buttonOne" onClick={handleFilterModelBox}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 28 28" fill="currentColor">
                <path d="M17.5002 5.83338C17.8096 5.83338 18.1063 5.9563 18.3251 6.17509C18.5439 6.39389 18.6668 6.69063 18.6668 7.00005C18.6668 7.30947 18.5439 7.60622 18.3251 7.82501C18.1063 8.0438 17.8096 8.16672 17.5002 8.16672C17.1907 8.16672 16.894 8.0438 16.6752 7.82501C16.4564 7.60622 16.3335 7.30947 16.3335 7.00005C16.3335 6.69063 16.4564 6.39389 16.6752 6.17509C16.894 5.9563 17.1907 5.83338 17.5002 5.83338ZM20.8018 5.83338C20.5608 5.15026 20.1138 4.55872 19.5225 4.14031C18.9311 3.72189 18.2246 3.49719 17.5002 3.49719C16.7758 3.49719 16.0692 3.72189 15.4779 4.14031C14.8865 4.55872 14.4395 5.15026 14.1985 5.83338H5.8335C5.52408 5.83338 5.22733 5.9563 5.00854 6.17509C4.78975 6.39389 4.66683 6.69063 4.66683 7.00005C4.66683 7.30947 4.78975 7.60622 5.00854 7.82501C5.22733 8.0438 5.52408 8.16672 5.8335 8.16672H14.1985C14.4395 8.84984 14.8865 9.44138 15.4779 9.8598C16.0692 10.2782 16.7758 10.5029 17.5002 10.5029C18.2246 10.5029 18.9311 10.2782 19.5225 9.8598C20.1138 9.44138 20.5608 8.84984 20.8018 8.16672H22.1668C22.4762 8.16672 22.773 8.0438 22.9918 7.82501C23.2106 7.60622 23.3335 7.30947 23.3335 7.00005C23.3335 6.69063 23.2106 6.39389 22.9918 6.17509C22.773 5.9563 22.4762 5.83338 22.1668 5.83338H20.8018ZM10.5002 12.8334C10.8096 12.8334 11.1063 12.9563 11.3251 13.1751C11.5439 13.3939 11.6668 13.6906 11.6668 14.0001C11.6668 14.3095 11.5439 14.6062 11.3251 14.825C11.1063 15.0438 10.8096 15.1667 10.5002 15.1667C10.1907 15.1667 9.894 15.0438 9.67521 14.825C9.45641 14.6062 9.3335 14.3095 9.3335 14.0001C9.3335 13.6906 9.45641 13.3939 9.67521 13.1751C9.894 12.9563 10.1907 12.8334 10.5002 12.8334ZM13.8018 12.8334C13.5608 12.1503 13.1138 11.5587 12.5225 11.1403C11.9311 10.7219 11.2246 10.4972 10.5002 10.4972C9.77576 10.4972 9.0692 10.7219 8.47786 11.1403C7.88653 11.5587 7.43953 12.1503 7.1985 12.8334H5.8335C5.52408 12.8334 5.22733 12.9563 5.00854 13.1751C4.78975 13.3939 4.66683 13.6906 4.66683 14.0001C4.66683 14.3095 4.78975 14.6062 5.00854 14.825C5.22733 15.0438 5.52408 15.1667 5.8335 15.1667H7.1985C7.43953 15.8498 7.88653 16.4414 8.47786 16.8598C9.0692 17.2782 9.77576 17.5029 10.5002 17.5029C11.2246 17.5029 11.9311 17.2782 12.5225 16.8598C13.1138 16.4414 13.5608 15.8498 13.8018 15.1667H22.1668C22.4762 15.1667 22.773 15.0438 22.9918 14.825C23.2106 14.6062 23.3335 14.3095 23.3335 14.0001C23.3335 13.6906 23.2106 13.3939 22.9918 13.1751C22.773 12.9563 22.4762 12.8334 22.1668 12.8334H13.8018ZM17.5002 19.8334C17.8096 19.8334 18.1063 19.9563 18.3251 20.1751C18.5439 20.3939 18.6668 20.6906 18.6668 21.0001C18.6668 21.3095 18.5439 21.6062 18.3251 21.825C18.1063 22.0438 17.8096 22.1667 17.5002 22.1667C17.1907 22.1667 16.894 22.0438 16.6752 21.825C16.4564 21.6062 16.3335 21.3095 16.3335 21.0001C16.3335 20.6906 16.4564 20.3939 16.6752 20.1751C16.894 19.9563 17.1907 19.8334 17.5002 19.8334ZM20.8018 19.8334C20.5608 19.1503 20.1138 18.5587 19.5225 18.1403C18.9311 17.7219 18.2246 17.4972 17.5002 17.4972C16.7758 17.4972 16.0692 17.7219 15.4779 18.1403C14.8865 18.5587 14.4395 19.1503 14.1985 19.8334H5.8335C5.52408 19.8334 5.22733 19.9563 5.00854 20.1751C4.78975 20.3939 4.66683 20.6906 4.66683 21.0001C4.66683 21.3095 4.78975 21.6062 5.00854 21.825C5.22733 22.0438 5.52408 22.1667 5.8335 22.1667H14.1985C14.4395 22.8498 14.8865 23.4414 15.4779 23.8598C16.0692 24.2782 16.7758 24.5029 17.5002 24.5029C18.2246 24.5029 18.9311 24.2782 19.5225 23.8598C20.1138 23.4414 20.5608 22.8498 20.8018 22.1667H22.1668C22.4762 22.1667 22.773 22.0438 22.9918 21.825C23.2106 21.6062 23.3335 21.3095 23.3335 21.0001C23.3335 20.6906 23.2106 20.3939 22.9918 20.1751C22.773 19.9563 22.4762 19.8334 22.1668 19.8334H20.8018Z" fill="currentColor"/>
              </svg>
            </div>
            {showFitlerBox && 
            <div className="filterDropDown">
            {uniqueStatuses.map((status) => (
              <p key={status} onClick={() => setSearchQuery(status)}>
                {status}
              </p>
            ))}
          </div>
          }
            <div className="download buttonOne">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16L17 11L15.6 9.55L13 12.15V4H11V12.15L8.4 9.55L7 11L12 16ZM18 20C18.55 20 19.0207 19.8043 19.412 19.413C19.8033 19.0217 19.9993 18.5507 20 18V15H18V18H6V15H4V18C4 18.55 4.19567 19.021 4.587 19.413C4.97833 19.805 5.44933 20.0007 6 20H18Z" fill="currentColor"/>
              </svg>
            </div>
            <button className='buttonTwo' onClick={handleCreateModel}>+ New Vehicle</button>
          </div>
        </section>
        
        <section className='list'>
          <div className='listHeader'>
            <div></div>
            <div>
              <p>Displayed Car Name</p>
              <svg onClick={()=>sortVehicles('name')} xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 21 24" fill="currentColor">
                <path d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z" fill="white" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <p>Group/ Type</p>
              <svg onClick={()=>sortVehicles('group')} xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 21 24" fill="currentColor">
                <path d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z" fill="white" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <p>Vehicle Inspection Expiration Date/ Regular Inspection Date</p>
              <svg onClick={()=>sortVehicles('VIEDate_RIDate',true)} xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 21 24" fill="currentColor">
                <path d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z" fill="white" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <p>Insurance Expiration Date</p>
              <svg onClick={() => sortVehicles('IEDate',true)} xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 21 24" fill="currentColor">
                <path d="M10.4587 21L14.3809 14.5H6.5365L10.4587 21ZM10.4587 3L14.3809 9.5H6.5365L10.4587 3Z" fill="white" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <div></div>
          </div>
          {/* <div className="listData">
            {vehicles.map(vehicle =>(
              <div key={vehicle.id} className='data'>
                <div className='dragSortBtn'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 30 30" fill="none">
                    <path d="M12.5 11.25C13.1904 11.25 13.75 10.6904 13.75 10C13.75 9.30964 13.1904 8.75 12.5 8.75C11.8096 8.75 11.25 9.30964 11.25 10C11.25 10.6904 11.8096 11.25 12.5 11.25Z" fill="#F27D14"/>
                    <path d="M12.5 21.25C13.1904 21.25 13.75 20.6904 13.75 20C13.75 19.3096 13.1904 18.75 12.5 18.75C11.8096 18.75 11.25 19.3096 11.25 20C11.25 20.6904 11.8096 21.25 12.5 21.25Z" fill="#F27D14"/>
                    <path d="M17.5 11.25C18.1904 11.25 18.75 10.6904 18.75 10C18.75 9.30964 18.1904 8.75 17.5 8.75C16.8096 8.75 16.25 9.30964 16.25 10C16.25 10.6904 16.8096 11.25 17.5 11.25Z" fill="#F27D14"/>
                    <path d="M17.5 21.25C18.1904 21.25 18.75 20.6904 18.75 20C18.75 19.3096 18.1904 18.75 17.5 18.75C16.8096 18.75 16.25 19.3096 16.25 20C16.25 20.6904 16.8096 21.25 17.5 21.25Z" fill="#F27D14"/>
                    <path d="M17.5 16.25C18.1904 16.25 18.75 15.6904 18.75 15C18.75 14.3096 18.1904 13.75 17.5 13.75C16.8096 13.75 16.25 14.3096 16.25 15C16.25 15.6904 16.8096 16.25 17.5 16.25Z" fill="#F27D14"/>
                    <path d="M12.5 16.25C13.1904 16.25 13.75 15.6904 13.75 15C13.75 14.3096 13.1904 13.75 12.5 13.75C11.8096 13.75 11.25 14.3096 11.25 15C11.25 15.6904 11.8096 16.25 12.5 16.25Z" fill="#F27D14"/>
                  </svg>
                </div>
                <div>{vehicle.name}</div>
                <div>{vehicle.group}</div>
                <div>{vehicle.VIEDate_RIDate}</div>
                <div>{vehicle.IEDate}</div>
                <div className='detailBtn'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="25" viewBox="0 0 21 25" fill="none">
                    <path d="M6.13377 14.6432C6.58598 14.6432 7.01967 14.4316 7.33943 14.0549C7.65919 13.6783 7.83883 13.1674 7.83883 12.6348C7.83883 12.1021 7.65919 11.5912 7.33943 11.2146C7.01967 10.8379 6.58598 10.6263 6.13377 10.6263C5.68156 10.6263 5.24787 10.8379 4.92811 11.2146C4.60835 11.5912 4.42871 12.1021 4.42871 12.6348C4.42871 13.1674 4.60835 13.6783 4.92811 14.0549C5.24787 14.4316 5.68156 14.6432 6.13377 14.6432ZM12.1015 12.6348C12.1015 13.1674 11.9218 13.6783 11.6021 14.0549C11.2823 14.4316 10.8486 14.6432 10.3964 14.6432C9.94421 14.6432 9.51052 14.4316 9.19076 14.0549C8.871 13.6783 8.69136 13.1674 8.69136 12.6348C8.69136 12.1021 8.871 11.5912 9.19076 11.2146C9.51052 10.8379 9.94421 10.6263 10.3964 10.6263C10.8486 10.6263 11.2823 10.8379 11.6021 11.2146C11.9218 11.5912 12.1015 12.1021 12.1015 12.6348ZM14.6591 14.6432C15.1113 14.6432 15.545 14.4316 15.8647 14.0549C16.1845 13.6783 16.3641 13.1674 16.3641 12.6348C16.3641 12.1021 16.1845 11.5912 15.8647 11.2146C15.545 10.8379 15.1113 10.6263 14.6591 10.6263C14.2069 10.6263 13.7732 10.8379 13.4534 11.2146C13.1336 11.5912 12.954 12.1021 12.954 12.6348C12.954 13.1674 13.1336 13.6783 13.4534 14.0549C13.7732 14.4316 14.2069 14.6432 14.6591 14.6432Z" fill="currentColor" fill-opacity="0.8"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6267 12.6348C20.6267 19.2897 16.0461 24.6853 10.3964 24.6853C4.74666 24.6853 0.166016 19.2897 0.166016 12.6348C0.166016 5.97986 4.74666 0.584229 10.3964 0.584229C16.0461 0.584229 20.6267 5.97986 20.6267 12.6348ZM18.9217 12.6348C18.9217 18.181 15.1049 22.6769 10.3964 22.6769C5.68785 22.6769 1.87107 18.181 1.87107 12.6348C1.87107 7.08851 5.68785 2.59265 10.3964 2.59265C15.1049 2.59265 18.9217 7.08851 18.9217 12.6348Z" fill="currentColor" fill-opacity="0.8"/>
                  </svg>
                </div>
              </div>
            ))}
          </div> */}
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <Column tasks={filteredVehicles}/>
          </DndContext>
        </section>
        <Pagination/>
      </div>
      {
        showCreateModelBox && <Entry/>
      }
      </>
      
  )
}
