import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(2.5)
  },
  expense: {
    textAlign: "end"
  }
});

class TopCategoriesItem extends Component {
  render() {
    const { classes } = this.props;
    return this.props.topCategories.map((topCategory) => (
      <Grid container className={classes.root}>
        <Grid item xs={8}>{ topCategory.category }</Grid> 
        <Grid item xs={4} className={classes.expense}>-${ topCategory.expense }</Grid>
      </Grid>
    ))
  }
}

export default withStyles(useStyles)(TopCategoriesItem);