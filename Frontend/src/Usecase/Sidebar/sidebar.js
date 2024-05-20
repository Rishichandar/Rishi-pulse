import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FiMenu, FiArrowLeftCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { useSelector } from "react-redux";


const Sidebar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleProjectManagementClick = () => {
    setSelectedItem(selectedItem === "ProjectManagement" ? null : "ProjectManagement");
  };
  const handlePortfolioManagementClick = () => {
    setSelectedItem(selectedItem === "PortfolioManagement" ? null : "PortfolioManagement");
  };
  const handleAttendanceManagementClick = () => {
    setSelectedItem(selectedItem === "AttendanceManagement" ? null : "AttendanceManagement");
  };

  // const data = useSelector((state) => state.auth.user);
  // console.log("hiii",data.Email)
  const roleid=useSelector((state)=>state.auth.user.RoleId)
  console.log("roleid :",roleid);

  return (
    <section className="page sidebar-2-page">
      <aside className={`sidebar-2 ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <header>
            <button
              type="button"
              className="sidebar-2-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="open-nav">
                {isOpen ? (
                  <FiArrowLeftCircle size={20} style={{ color: "#ffffff" }} />
                ) : (
                  <FiMenu size={20} style={{ color: "#ffffff" }} />
                )}
              </span>
            </button>
          </header>
          <nav>
           
            <button type="button" onClick={handleAttendanceManagementClick}>
              <span >
                <RiAdminFill size={18} />
              </span>
             <Link to="/main" style={{textDecoration:"none"}}> <p className="navbar-item">Attendance</p></Link>
            </button>
            {/* <button type="button" onClick={handlePortfolioManagementClick}>
              <span >
              <ImProfile size={20} />
              </span>
              <p className="navbar-item">Portfolio</p>
            </button> */}
            <button type="button" onClick={handleProjectManagementClick}>
              <span>
              <LiaProjectDiagramSolid size={22}/>
              </span>
             <Link  to="/home"style={{textDecoration:"none"}}><p className="navbar-item">Project</p></Link> 
            </button>
            {/* while clicking AttendanceManagement */}
            {selectedItem === "AttendanceManagement" && (
              <>
              {/* <div id="proj-div1">
                <Link to="/attendance-home" style={{ textDecoration: "none" }}>
                  <button type="button" id="nav-button">
                    <span className="navbar-item1">
                      <FaHome />
                    </span>
                    <p className="navbar-item1">Home</p>
                  </button>
                </Link>
                <Link to="/attendance-admin" style={{ textDecoration: "none" }}>
                  <button type="button"id="nav-button">
                    <span className="material-symbols-outlined">
                      <RiAdminFill />
                    </span>
                    <p className="navbar-item">Attendance Admin</p>
                  </button>
                </Link>
                </div> */}
              </>
            )}
            {/* project management clicking */}
            {selectedItem === "ProjectManagement" && (
              <>
               <div id="proj-div3">
                {/* <Link to="/home" style={{ textDecoration: "none" }}className="material-symbols-outlined">
                  <button type="button" id="nav-button">
                    <span >
                      <FaHome />
                    </span>
                    <p className="navbar-item2">Home</p>
                  </button>
                </Link> */}
                {roleid === 1 && (
                <Link to="/admin" style={{ textDecoration: "none" }}className="material-symbols-outlined">
                  <button type="button"id="nav-button">
                    <span >
                      <RiAdminFill  />
                    </span>
                    <p className="navbar-item2">Admin</p>
                  </button>
                </Link>
                  )}
                <Link to="/user" style={{ textDecoration: "none" }}className="material-symbols-outlined">
                  <button type="button"id="nav-button">
                    <span >
                      <FaUserCircle />
                    </span>
                    <p className="navbar-item2">Details</p>
                  </button>
                </Link>
                {/* <Link to="/task" style={{ textDecoration: "none" }} className="material-symbols-outlined">
                  <button type="button"id="nav-button">
                    <span>
                      <BiTask />
                    </span>
                    <p className="navbar-item2">Task</p>
                  </button>
                </Link> */}
                </div> 
              </>
            )}
          </nav>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar1;


 