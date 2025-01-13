import React from 'react';
import { Outlet } from 'react-router-dom';
import Pagination from "./Pagination";
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';


export default function BaseLayout() {
  return (
    <div className='baseContainer'>
        <SideMenu/>
        <TopMenu/>
        <main className='mainContent'>
        <Outlet />
        </main>
        {/* <Pagination/> */}
    </div>
  )
}
