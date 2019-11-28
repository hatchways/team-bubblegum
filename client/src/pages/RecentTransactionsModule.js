import React, { Component } from 'react';
import { Typography, Divider, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

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
            <Typography paragraph>Transactions here</Typography>
          </Paper>
        </div>
      )
    }
  }
  
  export default withStyles(useStyles)(RecentTransactionsModule);