import React from 'react'
import Logo from '../images/logo.png'
export default function SideMenu() {
  return (
    <section>
        <div>
          <img src={Logo} alt="logo" width={100} height={100}/>
        </div>
        <div>
            <ul>
                <li>Home</li>
                <li>Schedule</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
        </div>
    </section>
  )
}
