import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

import TransactionItem from "./TransactionItem"

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1
  }
})

class RecentTransactionsModule extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h6">Recent transactions</Typography>
        <Paper className={classes.content}>
          <TransactionItem />
        </Paper>
      </div>
    )
  }
}
  
export default withStyles(useStyles)(RecentTransactionsModule);