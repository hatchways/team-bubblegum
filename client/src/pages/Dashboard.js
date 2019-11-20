import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ButtonAppBar from './ButtonAppBar';
import CreateReceipt from './CreateReceipt';
import Landing from './Landing';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Button component={ Link } to="/receipt">Create a Receipt</Button>
        <Route path="/receipt" component={CreateReceipt} /><br />
        <Button component={ Link } to="/landing">Landing Page</Button>
        <Route path="/landing" component={Landing} />
      </div>
    );
  }
}

export default Dashboard;
