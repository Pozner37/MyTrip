import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import PublicIcon from "@mui/icons-material/Public";
import { getUserProfilePicture } from "../utils/getUserProfilePicture";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UserState,
  setShowAuthModal,
} from "../redux/reducers/UserReducer";
import useAuth from "../hooks/useAuth";

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state: UserState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout().then(res => {
      if (res.status === 200){
        handleCloseUserMenu();
      }
    })
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PublicIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              MyTrip
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {user && (
              <Typography
                sx={{
                  marginRight: "20px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {user.userName}
              </Typography>
            )}
            <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={getUserProfilePicture()} />
              </IconButton>
              <Menu
                sx={{ mt: "45px", direction: "rtl" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user ? (
                  <>
                    <MenuItem  onClick={() => {
                        handleCloseUserMenu();
                        navigate('/myProfile');
                      }}>
                      <Typography>הפרופיל</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/myposts");
                      }}
                    >
                      <Typography>הפוסטים שלי</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography color="red" onClick={handleLogout}>התנתק</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      dispatch(setShowAuthModal(true));
                    }}
                  >
                    <Typography>התחבר</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
