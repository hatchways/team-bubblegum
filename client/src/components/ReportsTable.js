import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Toolbar, Typography, Box } from "@material-ui/core";
import { formatDate } from "../utils/dateFunctions";

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

export default function ReportsTable({
  receiptData: { posts, total_amount },
  budgetData: { monthlyIncome, percentSave }
}) {
  const classes = useStyles();
  const [monthlySummary, setMonthlySummary] = useState("");
  const [totalAmountColor, setTotalAmountColor] = useState("green");

  const authHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };

  useEffect(() => {
    calculateMonthlySummary();
  }, [monthlyIncome, percentSave]);

  const calculateMonthlySummary = async () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const response = await fetch(
      `/receipts/${currentYear}/${currentMonth}`,
      authHeader
    );
    const jsonResponse = await response.json();
    const percentSpend = percentSave ? (100 - percentSave) / 100 : null;

    if (!monthlyIncome || !percentSave) {
      setMonthlySummary("");
    } else if (monthlyIncome <= jsonResponse.total_amount) {
      setTotalAmountColor("red");
      setMonthlySummary("You have spent all of your monthly income.");
    } else if (monthlyIncome * percentSpend <= jsonResponse.total_amount) {
      setTotalAmountColor("yellow");
      setMonthlySummary(`You have spent at least ${percentSpend}% of your monthly income.`);
    } else if (monthlyIncome * percentSpend >= jsonResponse.total_amount) {
      setTotalAmountColor("green");
      setMonthlySummary(`You have spent less than ${percentSpend}% of your monthly income.`);
    } else {
      setMonthlySummary("");
    }
  };

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
            {monthlySummary}
          </Typography>
        </Box>
      </Toolbar>
      <Table className={classes.table} aria-label='simple table'>
        <TableBody>
          {posts &&
            posts.map(data => (
              <TableRow key={data.id}>
                <TableCell></TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell align='center'>- ${data.amount}</TableCell>
                <TableCell align='center'>
                  {formatDate(data.receipt_date)}
                </TableCell>
                <TableCell align='center'>{data.category}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
