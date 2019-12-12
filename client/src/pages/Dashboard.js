import React, { Component } from "react";
import { Typography, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import RecentTransactionsModule from "./RecentTransactionsModule";
import DashboardMonthlySummary from "./DashboardMonthlySummary";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 40)
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
          <DashboardMonthlySummary />
          <RecentTransactionsModule />
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
