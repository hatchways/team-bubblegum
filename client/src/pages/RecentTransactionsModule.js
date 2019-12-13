import React, { useState, useEffect, Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

import TransactionItem from "./TransactionItem"
import RecentTransactionsTable from "../components/RecentTransactionsTable";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1
  }
})

const RecentTransactionsModule = props => {
  const [receiptData, setReceiptData] = useState([]);
  const [budgetData, setBudgetData] = useState({});

  const authHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      const response = await fetch("/receipts/", authHeader);
      const jsonResponse = await response.json();

      const budgetResponse =  await fetch("/budget/", authHeader)
      const jsonBudgetResponse = await budgetResponse.json()

      await setReceiptData(jsonResponse);
      await setBudgetData(jsonBudgetResponse)
      console.log(receiptData, budgetData)
    };

    fetchReport();
  }, []);

  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h6">Recent transactions</Typography>
      <Paper className={classes.content}>
        {/* <TransactionItem /> */}
        <Grid container>
          <Grid container item xs={12}>
            <RecentTransactionsTable receiptData={receiptData} budgetData={budgetData}/>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
  
export default withStyles(useStyles)(RecentTransactionsModule);