import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Box,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "../components/Snackbar";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    width: "90%",
    margin: "auto"
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
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    padding: theme.spacing(2, 4),
    color: "#38CC89",
    border: "1px solid #38CC89",
    backgroundColor: "#FFF"
  }
});

const Budget = props => {
  const { classes } = props;
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [percentSave, setPercentSave] = useState("");
  const [msg, setMsg] = useState({});

  useEffect(() => {
    const fetchBudget = async () => {
      const response = await fetch("/budget/", {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const jsonResponse = await response.json();
      const { annualIncome, monthlyIncome, percentSave } = jsonResponse;
      if (annualIncome) setAnnualIncome(annualIncome);
      if (monthlyIncome) setMonthlyIncome(monthlyIncome);
      if (percentSave) setPercentSave(percentSave);
      console.log(jsonResponse);
    };

    fetchBudget();
  }, []);

  const setAnnual = annualIncome => {
    const annualIncomeToNum = Number(annualIncome);
    if (!isNaN(annualIncomeToNum)) {
      setAnnualIncome(annualIncomeToNum);
      setMonthlyIncome(Math.floor(annualIncomeToNum / 12));
    }
  };
  const setMonthly = monthlyIncome => {
    const monthlyIncomeToNum = Number(monthlyIncome);
    if (!isNaN(monthlyIncomeToNum)) {
      setMonthlyIncome(monthlyIncomeToNum);
      setAnnualIncome(Math.floor(monthlyIncomeToNum * 12));
    }
  };
  const applyPercentSave = percentSave => {
    setPercentSave(percentSave);
    setMsg({});
  };
  const updateBudget = async () => {
    if (percentSave > 100 || percentSave < 0) {
      return setMsg({error: "Please enter a number between 0 to 100"});
    }

    setMsg({})
    // Create backend route to save this user data
    fetch("/budget/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ monthlyIncome, annualIncome, percentSave })
    })
      .then(res => {
        return res.json();
      })
      .then(msg => {
        setMsg(msg)
      });
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={(10, 0)}>
        <Grid item className={classes.margin}>
          <Typography variant='h4'>Budget</Typography>
          {msg.success && (
            <CustomizedSnackbars variant='success' message={msg.success} />
          )}
          {msg.error && (
            <CustomizedSnackbars variant='error' message={msg.error} />
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={12}>
          <Paper className={classes.paperRoot}>
            <Box className={classes.inputContainer}>
              <Typography className={classes.questionLabel}>
                Please enter your monthly income
              </Typography>
              <TextField
                variant='standard'
                onChange={e => setMonthly(e.target.value)}
                value={monthlyIncome ? monthlyIncome : ""}
                type='number'
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography className={classes.questionLabel}>
                Please enter your annual income
              </Typography>
              <TextField
                variant='standard'
                onChange={e => setAnnual(e.target.value)}
                value={annualIncome ? annualIncome : ""}
                type='number'
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography className={classes.questionLabel}>
                How many percent of your monthly income do you want to save?
              </Typography>
              <TextField
                variant='standard'
                type='number'
                onChange={e => applyPercentSave(e.target.value)}
                value={percentSave ? percentSave : ""}
              />
            </Box>
            <div>
              <Button className={classes.submit} onClick={updateBudget}>
                Update
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Budget);
