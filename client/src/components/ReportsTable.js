import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Toolbar, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  totalAmount: {
    color: "#38CC89"
  },
  red: {
    color: "#f44336"
  },
  yellow: {
    color: "#ffa726"
  },
  green: {
    color: "#76ff03"
  }
});

export default function ReportsTable({ receiptData: { posts, total_amount } }) {
  const classes = useStyles();

  // dummy data for monthly income
  const monthlyIncome = 800;
  let reportSummary = "";
  let totalAmountColor = "green";
  if (monthlyIncome <= total_amount) {
    totalAmountColor = "red";
    reportSummary = "You have spent all your income.";
  } else if (monthlyIncome * 0.8 <= total_amount) {
    totalAmountColor = "yellow";
    reportSummary = "You have spent at least 80% of your income.";
  } else if (monthlyIncome * 0.8 >= total_amount) {
    totalAmountColor = "green";
    reportSummary = "You have spent less than 80% of your income.";
  } else {
    reportSummary = "";
  }

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography className={classes.totalAmount}>Total Expenses</Typography>
        <Box m={3} display='flex'>
          <Typography variant='h5'>$</Typography>
          <Typography variant='h3' className={classes[totalAmountColor]}>
            {total_amount}
          </Typography>
        </Box>
        <Box>
          <Typography variant='h5' className={classes[totalAmountColor]}>
            {reportSummary ? reportSummary : ""}
          </Typography>
        </Box>
      </Toolbar>
      <Table className={classes.table} aria-label='simple table'>
        <TableBody>
          {posts &&
            posts.map(data => (
              <TableRow key={data.id}>
                <TableCell>{data.title}</TableCell>
                <TableCell align='center'>{data.amount}</TableCell>
                <TableCell align='center'>
                  {new Date(data.receipt_date).toLocaleDateString()}
                </TableCell>
                <TableCell align='center'>{data.cateogory}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
