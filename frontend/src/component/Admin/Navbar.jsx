import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
   zIndex: 999,
    background: "#ffffff",
    
    width: "100%",
    padding: "1.5rem 1rem 1rem 1rem",
    boxShadow:
      "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2), 4px 4px 8px rgba(0, 0, 0, 0.3)",

    [theme.breakpoints.between("999")]: {
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem",
    },
  },

  menuIcon: {
    display: "none",
    [theme.breakpoints.down("999")]: {
      display: "block",
      fontSize: "2rem",
      "& svg": {
        fontSize: "2rem",
        "&:hover": {
          color: "#ed1c24",
        },
      },
      "&:hover": {
        transform: "scale(1.1)", // Hover scale effect
      },
    },
  },
  dashboardHead: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "black",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",

    // Responsive styles
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    [theme.breakpoints.down("999")]: {
      fontSize: "1.8rem",
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "1.5rem",
      fontSize: "1.8rem",
    },
  },
})); 

const Navbar = ({ toggleHandler }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <IconButton className={classes.menuIcon} onClick={toggleHandler}>
        <MenuIcon fontSize="2rem" />
      </IconButton>
      <div className={classes.dashboardHead}>
        <Link
          to="/admin/dashboard"
          style={{ textDecoration: "none", color: "none" , width: "100%" , height: "100%"}}
        >

        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
