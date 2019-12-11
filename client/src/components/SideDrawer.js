import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Paper, Divider } from "@material-ui/core";
import logo from "../assets/images/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    background: "#314E84",
    color: "white",
    minHeight: 84,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  sideBar: {
    background: "#1A345F",
    color: "white",
    height: "100vh",
    paddingTop: 20
  },
  sideButton: {
    color: "white"
  },
  imgContainer: {
    width: 36,
    marginRight: 16
  },
  logo: {
    width: "100%"
  },
  ml40: {
    marginLeft: 40
  }
}));

const SideDrawer = () => {
  const classes = useStyles();

  const logout = () => {
    localStorage.clear();
    document.location.reload();
  };

  return (
    <div>
      <Paper>
        <div className={classes.title}>
          <div className={classes.imgContainer}>
            <img src={logo} alt='pic' className={classes.logo} />
          </div>
          <Typography variant='overline' align='center'>
            RECEIPT TRACKER
          </Typography>
        </div>
      </Paper>
      <div className={classes.sideBar}>
        <List>
          {["dashboard", "reports", "receipts", "profile"].map(
            (text, index) => (
              <ListItem
                key={text}
                button
                component={Link}
                to={"/home/" + text}
                className={classes.sideButton}
              >
                <div className={classes.ml40}>{text.toUpperCase()}</div>
              </ListItem>
            )
          )}
        </List>
        <Divider style={{ background: "#FFF" }} />
        <List>
          <ListItem button className={classes.sideButton}>
            <div className={classes.ml40} onClick={logout}>
              LOGOUT
            </div>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default SideDrawer;
