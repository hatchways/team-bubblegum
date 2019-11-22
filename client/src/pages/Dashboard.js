import React, { Component } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 35),
  },
  toolbar: theme.mixins.toolbar
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h4">Dashboard</Typography>
          <Divider />
          <Typography paragraph>SOME COOL STUFF HERE</Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
