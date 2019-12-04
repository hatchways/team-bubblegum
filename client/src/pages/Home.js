import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import Reports from './Reports';
import Receipts from './Receipts';
import Profile from './Profile';
import CreateReceipt from './CreateReceipt';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(0, 2)
  },
  toolbar: theme.mixins.toolbar
}));

function Home() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={false} md={3}>
        <SideBar />
      </Grid>
      <Grid item sm={12} md={9}>
        <TopBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/home/dashboard' component={Dashboard} />
          <Route path='/home/reports' component={Reports} />
          <Route path='/home/receipts' component={Receipts} />
          <Route path='/home/create' component={CreateReceipt} />
          <Route path='/home/profile' component={Profile} />
        </main>
      </Grid>
    </Grid>
  );
}

export default Home;
