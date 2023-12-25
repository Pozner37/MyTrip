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
import AuthModal from "./AuthModal";

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <AuthModal open={openModal} onClose={() => setOpenModal(false)} setUserName={setUserName}/>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
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
              {
                userName ?
                (<><MenuItem>
                  <Typography>{userName}</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>הפרופיל</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>הפוסטים שלי</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography color='red'>התנתק</Typography>
                </MenuItem></>) : (<MenuItem onClick={() => {handleCloseUserMenu(); setOpenModal(true);}}>
                  <Typography>התחבר</Typography>
                </MenuItem>)
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
