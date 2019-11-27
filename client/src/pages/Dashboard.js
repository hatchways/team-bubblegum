import React, { Component } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 40),
  },
  toolbar: theme.mixins.toolbar
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4">Dashboard</Typography>
        <Divider />
        <Typography paragraph>SOME COOL STUFF HERE</Typography>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
