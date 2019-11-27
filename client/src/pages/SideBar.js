import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Drawer, CssBaseline, List, ListItem } from '@material-ui/core';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    width: drawerWidth,
    background: "white"
  },
  title: {
    background: "#314E84",
    color: "white",
    padding: 30
  },
  sideBar: {
    background: "#1A345F",
    color: "white",
    height: "100vh",
    paddingTop: 20
  },
  sideButton: {
    color: "white",
    marginLeft: 40,
  }
}));

function SideBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.title}>
          <Typography align="center"><img alt="pic" />RECEIPT TRACKER</Typography>
        </div>
        <div className={classes.sideBar}>
          <List>
            {['Dashboard', 'Reports', 'Receipts'].map((text, index) => (
              <ListItem key={text}>
                <Button component={ Link } to={"/home/" + text} className={classes.sideButton}>{text}</Button>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default SideBar;