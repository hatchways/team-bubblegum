import React, { useState, useEffect } from "react";
import { Typography, Divider, Paper, Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReceiptsSelect from "../components/ReceiptsSelect";
import ReportsTable from "../components/ReportsTable";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 40)
  },
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(2)
  }
});

const Profile = props => {
  const { classes } = props;
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [annualIncome, setAnnualIncome] = useState(0);

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={(10, 0)}>
        <Grid item className={classes.margin}>
          <Typography variant='h4'>Profile</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={12}>
          <Paper>
            <TextField variant='filled' />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Profile);
