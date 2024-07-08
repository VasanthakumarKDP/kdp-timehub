import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Timing.ico";
import {
  RiDashboardFill,
  RiFolderUserFill,
  RiBugFill,
  RiNotification3Fill,
  RiLogoutCircleRFill,
} from "react-icons/ri";
import { FaUserCog, FaGhost, FaUserSlash } from "react-icons/fa";
import { VscFileSubmodule } from "react-icons/vsc";
import { LuLocateFixed } from "react-icons/lu";
import { SiAwsorganizations } from "react-icons/si";
import { GrTask } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import secureLocalStorage from "react-secure-storage";

const Sidebar = () => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(!isTabletMid);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let roleid = secureLocalStorage.getItem("UezU/D9QwECM6CHTuH6Iow==");
  useEffect(() => {
    setOpen(!isTabletMid);
  }, [isTabletMid]);

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    }
  }, [pathname]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const Nav_animation = useMemo(
    () =>
      isTabletMid
        ? {
            open: {
              x: 0,
              width: "16rem",
              transition: {
                damping: 40,
              },
            },
            closed: {
              x: -250,
              width: 0,
              transition: {
                damping: 40,
                delay: 0.15,
              },
            },
          }
        : {
            open: {
              width: "16rem",
              transition: {
                damping: 40,
              },
            },
            closed: {
              width: "4rem",
              transition: {
                damping: 40,
              },
            },
          },
    [isTabletMid]
  );

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <img src={logo} width={45} alt="TimeHub Logo" />
          <span className="text-xl whitespace-pre">TimeHub</span>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-xs py-5 flex flex-col gap-0 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <li>
              <NavLink to="/" className="link">
                <RiDashboardFill size={23} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            {[1, 3, 6].includes(roleid) && (
              <li>
                <NavLink to="/leavetransaction" className="link">
                  <FaUserCog size={23} className="min-w-max" />
                  Leave
                </NavLink>
              </li>
            )}
            {roleid === 1 && (
              <>
                <li>
                  <NavLink to="/employee" className="link">
                    <RiFolderUserFill size={23} className="min-w-max" />
                    Employee Master
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/rolemaster" className="link">
                    <FaUserCog size={23} className="min-w-max" />
                    Role Master
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/project" className="link">
                    <SiAwsorganizations size={23} className="min-w-max" />
                    Project Master
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/leavemaster" className="link">
                    <FaUserSlash size={23} className="min-w-max" />
                    Leave Master
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/bugmaster" className="link">
                    <FaGhost size={23} className="min-w-max" />
                    Bug Master
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/component" className="link">
                    <VscFileSubmodule size={23} className="min-w-max" />
                    Component Master
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/bug" className="link">
                    <LuLocateFixed size={23} className="min-w-max" />
                    Bug
                  </NavLink>
                </li>
              </>
            )}
            {roleid === 6 && (
              <li>
                <NavLink to="/component" className="link">
                  <VscFileSubmodule size={23} className="min-w-max" />
                  Component Master
                </NavLink>
              </li>
            )}
            {/* {roleid === "3" && (
              <li>
                <NavLink to="/bug" className="link">
                  <LuLocateFixed size={23} className="min-w-max" />
                  Bug
                </NavLink>
              </li>
            )} */}
            {/* <li>
              <NavLink to="/notification" className="link">
                <RiNotification3Fill size={23} className="min-w-max" />
                Notification
                <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  0
                </span>
              </NavLink>
            </li> */}
          </ul>
          {/* {open && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p className="text-red-500">Logout</p>
                </div>
                <p className="text-red-500 py-1.5 px-3 text-xs bg-red-50 rounded-xl">
                  <button onClick={logout}>
                    <RiLogoutCircleRFill size={23} className="min-w-max" />
                  </button>
                </p>
              </div>
            </div>
          )} */}
        </div>
        <motion.div
          onClick={() => setOpen(!open)}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
