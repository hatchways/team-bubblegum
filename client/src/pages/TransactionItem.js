import React, { Component } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  }
});

class TransactionItem extends Component {
  render() {
    return (
      <Grid item>
        Transactions here
      </Grid>
    )
  }
}

export default withStyles(useStyles)(TransactionItem);