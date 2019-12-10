import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Box
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReportsTable from "../components/ReportsTable";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    width: '90%',
    margin: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 40)
  },
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(2)
  },
  paperRoot: {
    flexGrow: 1,
    padding: theme.spacing(4, 4, 40, 4)
  },
  inputContainer: {
    display: "flex",
    margin: theme.spacing(4, 0)
  },
  questionLabel: {
    marginRight: theme.spacing(4)
  }
});

const Profile = props => {
  const { classes } = props;
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [annualIncome, setAnnualIncome] = useState(0);
  const setAnnual = annualIncome => {
    const annualIncomeToNum = Number(annualIncome);
    if (!isNaN(annualIncomeToNum)) {
      setAnnualIncome(annualIncomeToNum);
      setMonthlyIncome(Math.floor(annualIncomeToNum / 12));
    }
  };
  const setMonthly = monthlyIncome => {
    const monthlyIncomeToNum = Number(annualIncome);
    if (!isNaN(monthlyIncomeToNum)) {
      setMonthlyIncome(monthlyIncome);
      setAnnualIncome(Math.floor(monthlyIncome * 12));
    }
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={(10, 0)}>
        <Grid item className={classes.margin}>
          <Typography variant='h4'>Profile</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={12}>
          <Paper className={classes.paperRoot}>
            {/* <Typography>Income</Typography> */}
            <Box className={classes.inputContainer}>
              <Typography className={classes.questionLabel}>
                Please enter your monthly income
              </Typography>
              <TextField
                variant='standard'
                onChange={e => setMonthly(e.target.value)}
                value={monthlyIncome}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography className={classes.questionLabel}>
                Please enter your annual income
              </Typography>
              <TextField
                variant='standard'
                onChange={e => setAnnual(e.target.value)}
                value={annualIncome}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography className={classes.questionLabel}>
                Cash on hand
              </Typography>
              <TextField variant='standard' />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Profile);
