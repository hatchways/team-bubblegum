import React from "react";
import { Route } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import Reports from "./Reports";
import Receipts from "./Receipts";
import Budget from "./Budget";
import CreateReceipt from "./CreateReceipt";
import UploadReceipt from "./UploadReceipt";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CssBaseline, Hidden, Drawer } from "@material-ui/core";
import SideDrawer from "../components/SideDrawer";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }
}));

function Home() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <SideDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            <SideDrawer />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route exact path='/home' component={Dashboard} />
        <Route path='/home/dashboard' component={Dashboard} />
        <Route path='/home/reports' component={Reports} />
        <Route path='/home/receipts' component={Receipts} />
        <Route path='/home/upload' component={UploadReceipt} />
        <Route path='/home/budget' component={Budget} />
      </main>
    </div>
  );
}

export default Home;
