import React, { useState, useEffect } from "react";
import { Typography, Divider, Paper, Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MonthSelect from "../components/MonthSelect";
import ReportsTable from "../components/ReportsTable";
import YearSelect from "../components/YearSelect";
import CustomizedSnackbars from "../components/Snackbar";

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
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [emailMsg, setEmailMsg] = useState(null);
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

  useEffect(() => {
    const fetchReport = async () => {
      const response = await fetch("/receipts/", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const jsonResponse = await response.json();

      await setReceiptData(jsonResponse);
    };

    fetchReport();
  }, []);

  const { classes } = props;

  const handleMonthChange = async month => {
    setMonth(month.toString());
    const response = await fetch(`/receipts/${year}/${month}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    const jsonResponse = await response.json();

    await setReceiptData(jsonResponse);
  };
  const handleYearChange = async year => {
    if (year === "All") {
      setYear("");
      setMonth("");
      const response = await fetch(`/receipts/`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const jsonResponse = await response.json();
      await setReceiptData(jsonResponse);
    } else {
      setYear(year);
      const response = await fetch(`/receipts/${year}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const jsonResponse = await response.json();
      await setReceiptData(jsonResponse);
    }
  };
  const onBtnClick = () => {
    fetch(`/receipts/download/${year}/${month}`)
      .then(res => {
        console.log(res);
        res.blob().then(blob => {
          let url = URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = 'python-csv.csv';
          a.click();
        })
      })
      .catch(err => {
        console.log(err);
      })

  const onBtnClick = () => {
    fetch(`/receipts/download/${year}/${month}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        setEmailMsg(data['Message']);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={(10, 0)}>
        <Grid item sm>
          <Typography variant='h4'>Reports</Typography>
          <Button variant="contained" color="primary" onClick={onBtnClick}>DOWNLOAD</Button>
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
        <Grid item>
          {emailMsg && (
            <CustomizedSnackbars variant='success' message={emailMsg} />
          )}
          <Button variant="contained" color="primary" onClick={onBtnClick}>GENERATE CSV</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={12}>
          <ReportsTable receiptData={receiptData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Reports);
