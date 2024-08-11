// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState, useEffect } from "react";
import { Menu, Sidebar, MenuItem, useProSidebar } from "react-pro-sidebar";
import { app } from 'src/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'src/store/userSlice';
import { useSidebarContext } from "src/components/sidebarContext";
import { Link } from "react-router-dom";
import { tokens } from "src/utils/theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import twoPeople from 'src/assets/images/two-people-ballroom-dancing.svg';
import { BRAND } from "src/utils/constants";

// ICONS
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
            routerLink={<Link to={to} />}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const MyProSidebar = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const serializedUser = user ? {
                email: user.email,
                uid: user.uid,
            } : null;
            dispatch(setUser(serializedUser));
        });

        return () => unsubscribe();
    }, []);

    const user = useSelector((state) => state.user.user);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
    const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
    return (
        <Box
            sx={{
                position: "sticky",
                display: "flex",
                height: "100vh",
                top: 0,
                bottom: 0,
                zIndex: 10000,
                "& .sidebar": {
                    border: "none",
                },
                "& .menu-icon": {
                    backgroundColor: "transparent !important",
                },
                "& .menu-item": {
                    // padding: "5px 35px 5px 20px !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-anchor": {
                    color: "inherit !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-item:hover": {
                    color: `${colors.blueAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                "& .menu-item.active": {
                    color: `${colors.greenAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
            }}
        >
            <Sidebar
                breakPoint="md"
                backgroundColor={colors.primary[400]}
                image={sidebarImage}
            >
                <Menu iconshape="square">
                    <MenuItem
                        icon={
                            collapsed ? (
                                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
                            ) : sidebarRTL ? (
                                <SwitchLeftOutlinedIcon
                                    onClick={() => setSidebarRTL(!sidebarRTL)}
                                />
                            ) : (
                                <SwitchRightOutlinedIcon
                                    onClick={() => setSidebarRTL(!sidebarRTL)}
                                />
                            )
                        }
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!collapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    {BRAND}
                                </Typography>
                                <IconButton
                                    onClick={
                                        broken ? () => toggleSidebar() : () => collapseSidebar()
                                    }
                                >
                                    <CloseOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {!collapsed && (
                        <Box mb="25px">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    "& .avater-image": {
                                        backgroundColor: colors.primary[500],
                                    },
                                }}
                            >
                                <img
                                    className="avater-image"
                                    alt="profile user"
                                    width="100px"
                                    height="100px"
                                    src={twoPeople}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {user?.email}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Licensed User
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={collapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/admin/dashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Data
                        </Typography>
                        <Item
                            title="Studios"
                            to="/admin/studios"
                            icon={<BusinessOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Dancers"
                            to="/admin/dancers"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Entries"
                            to="/admin/entries"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Heats"
                            to="/admin/heats"
                            icon={<LocalFireDepartmentOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Help
                        </Typography>
                        <Item
                            title="Documentation"
                            to="/admin/dashboard"
                            icon={<ArticleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Schedule a Call"
                            to="/admin/dashboard"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ Page"
                            to="/admin/dashboard"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default MyProSidebar;


// import { useState, useEffect } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { Link } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { app } from 'src/firebase';
// import { setUser } from 'src/store/userSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "src/utils/theme";
// import { BRAND } from "src/utils/constants";
// import twoPeople from 'src/assets/images/two-people-ballroom-dancing.svg';

// // ICONS
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
// import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

// const Item = ({ title, to, icon, selected, setSelected }) => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     return (
//         <MenuItem
//             active={selected === title}
//             style={{
//                 color: colors.grey[100],
//             }}
//             onClick={() => setSelected(title)}
//             icon={icon}
//         >
//             <Typography>{title}</Typography>
//             <Link to={to} />
//         </MenuItem>
//     );
// };

// const Sidebar = () => {
//     const auth = getAuth(app);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             const serializedUser = user ? {
//                 email: user.email,
//                 uid: user.uid,
//             } : null;
//             dispatch(setUser(serializedUser));
//         });

//         return () => unsubscribe();
//     }, []);

//     const user = useSelector((state) => state.user.user);

//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [selected, setSelected] = useState("Dashboard");

//     return (
//         <Box
//             sx={{
//                 "& .pro-sidebar-inner": {
//                     background: `${colors.primary[400]} !important`,
//                 },
//                 "& .pro-icon-wrapper": {
//                     backgroundColor: "transparent !important",
//                 },
//                 "& .pro-inner-item": {
//                     padding: "5px 35px 5px 20px !important",
//                 },
//                 "& .pro-inner-item:hover": {
//                     color: "#868dfb !important",
//                 },
//                 "& .pro-menu-item.active": {
//                     color: "#6870fa !important",
//                 },
//             }}
//         >
//             <ProSidebar collapsed={isCollapsed} breakPoint="md">
//                 <Menu iconShape="square">
//                     {/* LOGO AND MENU ICON */}
//                     <MenuItem
//                         onClick={() => setIsCollapsed(!isCollapsed)}
//                         icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
//                         style={{
//                             margin: "10px 0 20px 0",
//                             color: colors.grey[100],
//                         }}
//                     >
//                         {!isCollapsed && (
//                             <Box
//                                 display="flex"
//                                 justifyContent="space-between"
//                                 alignItems="center"
//                                 ml="15px"
//                             >
//                                 <Typography variant="h3" color={colors.grey[100]}>
//                                     {BRAND}
//                                 </Typography>
//                                 <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
//                                     <MenuOutlinedIcon />
//                                 </IconButton>
//                             </Box>
//                         )}
//                     </MenuItem>

//                     {!isCollapsed && (
//                         <Box mb="25px">
//                             <Box display="flex" justifyContent="center" alignItems="center">
//                                 <img
//                                     alt="profile-user"
//                                     width="100px"
//                                     height="100px"
//                                     src={twoPeople}
//                                     style={{ cursor: "pointer", borderRadius: "50%" }}
//                                 />
//                             </Box>
//                             <Box textAlign="center">
//                                 <Typography
//                                     variant="h4"
//                                     color={colors.grey[100]}
//                                     fontWeight="bold"
//                                     sx={{ m: "10px 0 0 0" }}
//                                 >
//                                     {user?.email}
//                                 </Typography>
//                                 <Typography variant="h5" color={colors.greenAccent[500]}>
//                                     Licensed User
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     )}

//                     <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//                         <Item
//                             title="Dashboard"
//                             to="/admin/dashboard"
//                             icon={<HomeOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />

//                         <Typography
//                             variant="h6"
//                             color={colors.grey[300]}
//                             sx={{ m: "15px 0 5px 20px" }}
//                         >
//                             Data
//                         </Typography>
//                         <Item
//                             title="Studios"
//                             to="/admin/studios"
//                             icon={<BusinessOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />
//                         <Item
//                             title="Dancers"
//                             to="/admin/dancers"
//                             icon={<ContactsOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />
//                         <Item
//                             title="Entries"
//                             to="/admin/couples"
//                             icon={<PeopleOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />
//                         <Item
//                             title="Heats"
//                             to="/admin/heats"
//                             icon={<LocalFireDepartmentOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />

//                         <Typography
//                             variant="h6"
//                             color={colors.grey[300]}
//                             sx={{ m: "15px 0 5px 20px" }}
//                         >
//                             Help
//                         </Typography>
//                         <Item
//                             title="Documentation"
//                             to="/form"
//                             icon={<ArticleOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />
//                         <Item
//                             title="Schedule a Call"
//                             to="/calendar"
//                             icon={<CalendarTodayOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />
//                         <Item
//                             title="FAQ Page"
//                             to="/faq"
//                             icon={<HelpOutlineOutlinedIcon />}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />


//                     </Box>
//                 </Menu>
//             </ProSidebar>
//         </Box>
//     );
// };

// export default Sidebar;