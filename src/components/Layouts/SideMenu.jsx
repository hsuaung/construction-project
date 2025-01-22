import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
// import Logo from '../assets/images/logo.png'
import { Link, useLocation } from "react-router-dom";
import React, { useState } from 'react'
import Logo from '../../assets/images/logo.png'
import {Link,useLocation} from 'react-router-dom';

export default function SideMenu() {
  const location = useLocation();
  const isActive = (path) => {
    const subMenuRoutes = [
      "/staff",
      "/vehicle",
      "/business-partner",
      "/operation-type",
    ];
    if (path === "menu") {
      return subMenuRoutes.includes(location.pathname);
    }

    return location.pathname === path;
  };
  const [menuStatus, setMenuStatus] = useState(false);
  const handleShowMenu = () => {
    setMenuStatus(!menuStatus);
  };
  const handleLinkClick = () => {
    setMenuStatus(false);
  };
  return (
    <section className="sideMenu">
      <div>
        <img src={Logo} alt="logo" width={65} height={65} />
      </div>
      <div className="menuIcons">
        <div>
          <Link to="/">
            <div className={`sideIcon ${isActive("/") ? "active" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M12.7176 5.14308C12.7932 5.07076 12.8938 5.0304 12.9985 5.0304C13.1031 5.0304 13.2037 5.07076 13.2793 5.14308L22.6281 14.074C22.6678 14.112 22.6994 14.1576 22.721 14.2081C22.7425 14.2587 22.7536 14.3131 22.7535 14.368L22.7551 22.75C22.7551 23.1809 22.5839 23.5943 22.2791 23.899C21.9744 24.2038 21.561 24.375 21.1301 24.375H16.25C16.0345 24.375 15.8278 24.2894 15.6755 24.137C15.5231 23.9846 15.4375 23.7779 15.4375 23.5625V16.6562C15.4375 16.5485 15.3947 16.4451 15.3185 16.3689C15.2423 16.2928 15.139 16.25 15.0312 16.25H10.9687C10.861 16.25 10.7577 16.2928 10.6815 16.3689C10.6053 16.4451 10.5625 16.5485 10.5625 16.6562V23.5625C10.5625 23.7779 10.4769 23.9846 10.3245 24.137C10.1721 24.2894 9.96548 24.375 9.74999 24.375H4.87194C4.44096 24.375 4.02764 24.2038 3.72289 23.899C3.41815 23.5943 3.24694 23.1809 3.24694 22.75V14.368C3.24688 14.3131 3.25796 14.2587 3.27952 14.2081C3.30108 14.1576 3.33267 14.112 3.37237 14.074L12.7176 5.14308Z"
                  fill="white"
                />
                <path
                  d="M1.07096 12.3982L4.8694 8.76434V3.25C4.8694 3.03451 4.955 2.82785 5.10737 2.67548C5.25974 2.5231 5.46641 2.4375 5.6819 2.4375H8.1194C8.33488 2.4375 8.54155 2.5231 8.69392 2.67548C8.84629 2.82785 8.9319 3.03451 8.9319 3.25V4.875L11.8731 2.06273C12.1484 1.78445 12.5577 1.625 13 1.625C13.4408 1.625 13.849 1.78445 14.1243 2.06324L24.9254 12.3972C25.2413 12.7019 25.2809 13.2031 24.9935 13.5332C24.9213 13.6165 24.8329 13.6843 24.7338 13.7324C24.6346 13.7804 24.5266 13.8078 24.4165 13.8129C24.3064 13.8179 24.1964 13.8005 24.0932 13.7616C23.9901 13.7228 23.8959 13.6634 23.8164 13.587L13.2793 3.51813C13.2037 3.4458 13.1031 3.40544 12.9985 3.40544C12.8938 3.40544 12.7932 3.4458 12.7176 3.51813L2.17951 13.587C2.02428 13.7359 1.81636 13.8171 1.60132 13.813C1.38628 13.8088 1.18168 13.7195 1.03236 13.5647C0.720566 13.2417 0.746466 12.7085 1.07096 12.3982Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
          <Link to="/schedule">
            <div
              className={`sideIcon ${isActive("/schedule") ? "active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7.74998 2.5C7.74998 2.30109 7.67096 2.11032 7.53031 1.96967C7.38966 1.82902 7.19889 1.75 6.99998 1.75C6.80107 1.75 6.6103 1.82902 6.46965 1.96967C6.329 2.11032 6.24998 2.30109 6.24998 2.5V4.08C4.80998 4.195 3.86598 4.477 3.17198 5.172C2.47698 5.866 2.19498 6.811 2.07898 8.25H21.921C21.805 6.81 21.523 5.866 20.828 5.172C20.134 4.477 19.189 4.195 17.75 4.079V2.5C17.75 2.30109 17.671 2.11032 17.5303 1.96967C17.3897 1.82902 17.1989 1.75 17 1.75C16.8011 1.75 16.6103 1.82902 16.4696 1.96967C16.329 2.11032 16.25 2.30109 16.25 2.5V4.013C15.585 4 14.839 4 14 4H9.99998C9.16098 4 8.41498 4 7.74998 4.013V2.5Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 12C2 11.161 2 10.415 2.013 9.75H21.987C22 10.415 22 11.161 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12ZM17 14C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12C16.7348 12 16.4804 12.1054 16.2929 12.2929C16.1054 12.4804 16 12.7348 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17C18 16.7348 17.8946 16.4804 17.7071 16.2929C17.5196 16.1054 17.2652 16 17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM7 14C7.26522 14 7.51957 13.8946 7.70711 13.7071C7.89464 13.5196 8 13.2652 8 13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM7 18C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
          <Link to="/site">
            <div className={`sideIcon ${isActive("/site") ? "active" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M5.94998 24.5L12.3375 18.1125L9.88748 15.6625L3.49998 22.05L5.94998 24.5ZM22.05 24.5L24.5 22.05L16.45 14L18.4333 12.0167L19.25 12.8333L20.7375 11.3458V13.7375L21.5541 14.5542L25.0833 11.025L24.2666 10.2083H21.875L23.3333 8.74999L19.1916 4.60833C18.8028 4.21944 18.3847 3.93749 17.9375 3.76249C17.4903 3.58749 17.0333 3.49999 16.5666 3.49999C16.1 3.49999 15.643 3.58749 15.1958 3.76249C14.7486 3.93749 14.3305 4.21944 13.9416 4.60833L16.625 7.29166L15.1666 8.74999L15.9833 9.56666L14 11.55L11.375 8.92499C11.4528 8.7111 11.5158 8.48749 11.564 8.25416C11.6122 8.02083 11.6367 7.78749 11.6375 7.55416C11.6375 6.40694 11.2435 5.43938 10.4556 4.65149C9.66776 3.8636 8.70059 3.47005 7.55415 3.47083C7.26248 3.47083 6.9852 3.49999 6.72231 3.55833C6.45942 3.61666 6.19226 3.70416 5.92081 3.82083L8.80831 6.70833L6.70831 8.80833L3.82081 5.92083C3.6847 6.19305 3.59215 6.46022 3.54315 6.72233C3.49415 6.98444 3.47003 7.26172 3.47081 7.55416C3.47081 8.70138 3.86437 9.66894 4.65148 10.4568C5.43859 11.2447 6.40615 11.6383 7.55415 11.6375C7.78748 11.6375 8.02081 11.618 8.25415 11.5792C8.48748 11.5403 8.71109 11.4722 8.92498 11.375L22.05 24.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
          <div className="menuIcon">
            <div
              className={`sideIcon ${isActive("menu") ? "active" : ""}`}
              onClick={handleShowMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20 17.5C20.3852 17.5002 20.7556 17.6486 21.0344 17.9144C21.3132 18.1802 21.479 18.5431 21.4975 18.9279C21.516 19.3127 21.3858 19.6898 21.1338 19.9812C20.8818 20.2726 20.5274 20.4558 20.144 20.493L20 20.5H4C3.61478 20.4998 3.24441 20.3514 2.96561 20.0856C2.68682 19.8198 2.52099 19.4569 2.50248 19.0721C2.48396 18.6873 2.61419 18.3102 2.86618 18.0188C3.11816 17.7274 3.47258 17.5442 3.856 17.507L4 17.5H20ZM20 10.5C20.3978 10.5 20.7794 10.658 21.0607 10.9393C21.342 11.2206 21.5 11.6022 21.5 12C21.5 12.3978 21.342 12.7794 21.0607 13.0607C20.7794 13.342 20.3978 13.5 20 13.5H4C3.60218 13.5 3.22064 13.342 2.93934 13.0607C2.65804 12.7794 2.5 12.3978 2.5 12C2.5 11.6022 2.65804 11.2206 2.93934 10.9393C3.22064 10.658 3.60218 10.5 4 10.5H20ZM20 3.5C20.3978 3.5 20.7794 3.65804 21.0607 3.93934C21.342 4.22064 21.5 4.60218 21.5 5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H4C3.60218 6.5 3.22064 6.34196 2.93934 6.06066C2.65804 5.77936 2.5 5.39782 2.5 5C2.5 4.60218 2.65804 4.22064 2.93934 3.93934C3.22064 3.65804 3.60218 3.5 4 3.5H20Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {menuStatus && (
              <div className="menu">
                <Link to="/staff" onClick={handleLinkClick}>
                  <div className="menuTitles">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      viewBox="0 0 25 25"
                      fill="currentColor"
                    >
                      <path
                        d="M12.5002 15.625C17.1043 15.625 20.8335 17.4896 20.8335 19.7917V21.875H4.16683V19.7917C4.16683 17.4896 7.896 15.625 12.5002 15.625ZM16.6668 9.37504C16.6668 10.4801 16.2278 11.5399 15.4464 12.3213C14.665 13.1027 13.6052 13.5417 12.5002 13.5417C11.3951 13.5417 10.3353 13.1027 9.55388 12.3213C8.77248 11.5399 8.3335 10.4801 8.3335 9.37504M13.021 2.08337C13.3335 2.08337 13.5418 2.30212 13.5418 2.60421V5.72921H14.5835V3.12504C14.5835 3.12504 16.9272 4.02087 16.9272 7.03129C16.9272 7.03129 17.7085 7.17712 17.7085 8.33337H7.29183C7.34391 7.17712 8.07308 7.03129 8.07308 7.03129C8.07308 4.02087 10.4168 3.12504 10.4168 3.12504V5.72921H11.4585V2.60421C11.4585 2.30212 11.6564 2.08337 11.9793 2.08337H13.021Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>Staff</p>
                  </div>
                </Link>
                <Link to="/vehicle" onClick={handleLinkClick}>
                  <div className="menuTitles">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      viewBox="0 0 23 23"
                      fill="currentColor"
                    >
                      <path
                        d="M19.4029 3.71326L20.2941 4.60451L14.3348 10.9026V13.535H10.8309V11.2485L19.4029 3.71326ZM20.5439 5.51642V9.12365L20.3638 9.24494C19.8894 9.55939 19.7016 9.87834 19.6481 10.1344C19.5951 10.3949 19.6675 10.6195 19.8211 10.8037C20.1293 11.1766 20.7155 11.3563 21.2914 10.7768L21.8628 11.3518C21.0012 12.2098 19.7905 12.0301 19.2003 11.3248C18.9047 10.9699 18.7524 10.4758 18.8566 9.97267C18.9487 9.52345 19.2483 9.08771 19.7353 8.71486V6.36994L20.5439 5.51642ZM8.95314 7.87482V14.3436H17.2637C16.2485 14.6041 15.4399 15.3992 15.1658 16.41H7.86154C7.52463 15.1701 6.38811 14.2537 5.04494 14.2537C3.70178 14.2537 2.56525 15.1701 2.22834 16.41H1.13674V12.6096L3.84104 7.87482H8.95314ZM7.33596 8.50373H4.54631L2.08908 12.6365H7.33596V8.90802V8.50373ZM21.7779 14.3436L21.2613 16.41H20.8008C20.5259 15.3992 19.7187 14.6041 18.7012 14.3436H21.7779ZM17.9824 15.0623C19.154 15.0623 20.0947 16.0012 20.0947 17.1736C20.0947 18.3461 19.154 19.285 17.9824 19.285C16.81 19.285 15.8711 18.3461 15.8711 17.1736C15.8711 16.0012 16.81 15.0623 17.9824 15.0623ZM5.04494 15.0623C6.2174 15.0623 7.15627 16.0012 7.15627 17.1736C7.15627 18.3461 6.2174 19.285 5.04494 19.285C3.87248 19.285 2.93361 18.3461 2.93361 17.1736C2.93361 16.0012 3.87248 15.0623 5.04494 15.0623Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>Vehicle</p>
                  </div>
                </Link>
                <Link to="/business-partner" onClick={handleLinkClick}>
                  <div className="menuTitles">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 13C14.396 13 16.575 13.694 18.178 14.672C18.978 15.16 19.662 15.736 20.156 16.362C20.642 16.977 21 17.713 21 18.5C21 19.345 20.589 20.011 19.997 20.486C19.437 20.936 18.698 21.234 17.913 21.442C16.335 21.859 14.229 22 12 22C9.771 22 7.665 21.86 6.087 21.442C5.302 21.234 4.563 20.936 4.003 20.486C3.41 20.01 3 19.345 3 18.5C3 17.713 3.358 16.977 3.844 16.361C4.338 15.736 5.021 15.161 5.822 14.671C7.425 13.695 9.605 13 12 13ZM12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7C17 8.32608 16.4732 9.59785 15.5355 10.5355C14.5979 11.4732 13.3261 12 12 12C10.6739 12 9.40215 11.4732 8.46447 10.5355C7.52678 9.59785 7 8.32608 7 7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p>Business Partner</p>
                  </div>
                </Link>
                <Link to="/operation-type" onClick={handleLinkClick}>
                  <div className="menuTitles">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="currentColor"
                    >
                      <path
                        d="M14.7952 2.0625C13.9809 2.06218 13.1781 2.25527 12.4529 2.62586C11.7278 2.99646 11.101 3.53397 10.6243 4.19416C10.1475 4.85434 9.83428 5.61832 9.71047 6.42321C9.58667 7.2281 9.65579 8.05089 9.91215 8.82384L2.5394 16.1984C2.23466 16.5034 2.06348 16.9168 2.06348 17.3479C2.06348 17.779 2.23466 18.1925 2.5394 18.4974L3.50373 19.4618C3.65468 19.6129 3.83393 19.7328 4.03125 19.8146C4.22857 19.8964 4.44008 19.9385 4.65369 19.9385C4.86729 19.9385 5.0788 19.8964 5.27612 19.8146C5.47344 19.7328 5.6527 19.6129 5.80365 19.4618L13.1773 12.0872C14.0575 12.3795 15.0004 12.4283 15.9061 12.2285C16.8118 12.0287 17.6466 11.5877 18.3221 10.9521C18.9976 10.3165 19.4886 9.51012 19.7432 8.61826C19.9977 7.72639 20.0064 6.78229 19.7681 5.88592C19.5243 4.96559 18.4463 4.87392 17.9055 5.41475L16.3261 6.99325C16.2401 7.0825 16.1372 7.15372 16.0235 7.20275C15.9097 7.25178 15.7872 7.27763 15.6633 7.2788C15.5394 7.27996 15.4166 7.25642 15.3019 7.20954C15.1872 7.16267 15.083 7.0934 14.9954 7.00579C14.9077 6.91818 14.8385 6.81398 14.7916 6.69928C14.7447 6.58459 14.7212 6.4617 14.7224 6.33781C14.7235 6.21391 14.7494 6.09149 14.7984 5.9777C14.8474 5.86391 14.9186 5.76103 15.0079 5.67509L16.5864 4.09567C17.1272 3.55484 17.0356 2.47684 16.1143 2.233C15.6842 2.11929 15.2411 2.06197 14.7961 2.0625"
                        fill="currentColor"
                      />
                    </svg>
                    <p>Operation Type</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Link to="/login" className="logout">
          <div className="sideIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8663 3.01118C18.75 3.79493 18.75 5.22867 18.75 8.09492V21.9049C18.75 24.7712 18.75 26.2049 17.8663 26.9887C16.9825 27.7724 15.6313 27.5374 12.9288 27.0662L10.0162 26.5587C7.02375 26.0362 5.5275 25.7749 4.63875 24.6774C3.75 23.5787 3.75 21.9912 3.75 18.8149V11.1849C3.75 8.00992 3.75 6.42243 4.6375 5.32367C5.5275 4.22617 7.025 3.96493 10.0175 3.44368L12.9275 2.93493C15.63 2.46368 16.9812 2.22868 17.865 3.01243M15 12.7112C14.4825 12.7112 14.0625 13.1499 14.0625 13.6912V16.3087C14.0625 16.8499 14.4825 17.2887 15 17.2887C15.5175 17.2887 15.9375 16.8499 15.9375 16.3087V13.6912C15.9375 13.1499 15.5175 12.7112 15 12.7112Z"
                fill="white"
              />
              <path
                d="M20.5662 5.625C23.1388 5.62875 24.48 5.685 25.335 6.54C26.25 7.455 26.25 8.9275 26.25 11.875V18.125C26.25 21.0712 26.25 22.5437 25.335 23.46C24.48 24.3137 23.1388 24.3713 20.5662 24.375C20.625 23.595 20.625 22.695 20.625 21.7213V8.27875C20.625 7.30375 20.625 6.40375 20.5662 5.625Z"
                fill="white"
              />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
