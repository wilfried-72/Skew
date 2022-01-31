import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Logo from "assets/logo/logo.png";
import Link from '@mui/material/Link';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { List } from "@mui/material";
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const pages = [
  { titre: "Accueil", lien: "/" },
  { titre: "Offres", lien: "/offres" },
  { titre: "Contactez-nous", lien: "/contactus" },
];

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Box maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex", md: "block" }
          }}
        >
          {/* Logo */}
          <Box sx={{ display: { xs: "flex", md: "block" } }}>
            <Box
              sx={{
                flexGrow: 0,
                display: 'flex'
              }}
            >
              <Avatar variant="square" src={Logo} sx={{ mx: 2 }} />
              <Typography variant='h1' sx={{ width: '100%' }}>
                SKEW
              </Typography>
            </Box>
          </Box>

          {/* Menu */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <List
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: 'center',
              }}>
              {pages.map((page) => (
                <ListItemLink
                  key={page.titre}
                  primary={page.titre}
                  to={page.lien}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    width: { xs: '100%', md: 290 },
                    p: 0
                  }}
                />
              ))}
            </List>
          </Box>

          {/* Menu burger responsive */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              flexDirection: 'row-reverse',
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>


            {/* Menu responsive */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <List key={page.titre} onClick={handleCloseNavMenu}>
                  <ListItemLink to={page.lien} primary={page.titre} textAlign="center"/>
                </List>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};