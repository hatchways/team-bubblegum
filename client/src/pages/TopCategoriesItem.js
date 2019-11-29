import React, { Component } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  }
});

class TopCategoriesItem extends Component {
  render() {
    const { classes } = this.props;
    return this.props.topCategories.map((topCategory) => (
      <Grid container className={classes.root}>
        <Grid item>{ topCategory.category }</Grid> 
        <Grid item>{ topCategory.expense }</Grid>
      </Grid>
    ))
  }
}

export default withStyles(useStyles)(TopCategoriesItem);