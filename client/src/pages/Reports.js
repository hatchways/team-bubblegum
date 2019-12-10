import React, { useState, useEffect } from 'react';
import { Typography, Divider, Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReceiptsSelect from '../components/ReceiptsSelect';
import ReportsTable from '../components/ReportsTable';

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
  const [month, setMonth] = useState('All');
  const months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  useEffect(() => {
    const fetchReport = async () => {
      const response = await fetch('/receipts/');
      const jsonResponse = await response.json();

      await setReceiptData(jsonResponse);

      console.log(receiptData, jsonResponse);
    };

    fetchReport();
  }, []);

  const { classes } = props;

  const handleMonthChange = month => {
    setMonth(month);
    // Make new api call with the updated month
  };

  const onBtnClick = () => {
    fetch("/receipts/download/" + month)
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
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={(10, 0)}>
        <Grid item sm>
          <Typography variant='h4'>Reports</Typography>
          <Button variant="contained" color="primary" onClick={onBtnClick}>DOWNLOAD</Button>
        </Grid>
        <Grid item>
          <ReceiptsSelect
            month={month}
            months={months}
            handleMonthChange={handleMonthChange}
          />
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
