import React, { Component } from 'react';
import { Typography, Divider, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    width: 400,
    height: 250
  }
})

class TopCategoriesModule extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.content}>
          <Typography paragraph>TOP CATEGORIES</Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(useStyles)(TopCategoriesModule);