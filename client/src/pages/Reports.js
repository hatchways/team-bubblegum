import React, { useState, useEffect } from "react";
import { Typography, Divider, Paper, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MonthSelect from "../components/MonthSelect";
import ReportsTable from "../components/ReportsTable";
import YearSelect from "../components/YearSelect";

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

const Reports = props => {
  const [receiptData, setReceiptData] = useState([]);
  const [budgetData, setBudgetData] = useState({})
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const years = ["All", "2020", "2019", "2018"];
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

  const handleMonthChange = async month => {
    setMonth(month.toString());
    const response = await fetch(`/receipts/${year}/${month}`, authHeader);
    const jsonResponse = await response.json();

    await setReceiptData(jsonResponse);
  };
  const handleYearChange = async year => {
    if (year === "All") {
      setYear("");
      setMonth("");
      const response = await fetch(`/receipts/`, authHeader);
      const jsonResponse = await response.json();
      await setReceiptData(jsonResponse);
    } else {
      setYear(year);
      const response = await fetch(`/receipts/${year}`, authHeader);
      const jsonResponse = await response.json();
      await setReceiptData(jsonResponse);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={(10, 0)}>
        <Grid item sm>
          <Typography variant='h4'>Reports</Typography>
        </Grid>
        <Grid item>
          <YearSelect
            selectedOption={year}
            optionsArray={years}
            handleOptionChange={handleYearChange}
          />
        </Grid>
        <Grid item>
          <MonthSelect
            selectedOption={month}
            optionsArray={months}
            handleOptionChange={handleMonthChange}
            isDisabled={year ? false : true}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={12}>
          <ReportsTable receiptData={receiptData} budgetData={budgetData}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Reports);
