import React, { Component, useState, useEffect } from 'react';
import { Typography, Divider, Paper, Grid } from '@material-ui/core';
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
  const [data, setData] = useState([]);
  const months = [
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

  const { classes } = props;
  const dummyData = [
    {
      id: 1,
      title: 'Airline',
      amount: 500,
      receipt_date: '11/11/2020',
      category: 'Travel'
    },
    {
      id: 2,
      title: "Kim's Convenience",
      amount: 10,
      receipt_date: '11/12/2020',
      category: 'Food'
    },
    {
      id: 3,
      title: 'Nike',
      amount: 100,
      receipt_date: '11/13/2020',
      category: 'Clothes'
    },
    {
      id: 4,
      title: "McDonald's",
      amount: 15,
      receipt_date: '11/15/2020',
      category: 'Food'
    },
    {
      id: 5,
      title: "Wendy's",
      amount: 10,
      receipt_date: '11/16/2020',
      category: 'Food'
    }
  ];

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={10, 0}>
        <Grid item sm>
          <Typography variant='h4'>Reports</Typography>
        </Grid>
        <Grid item>
          <ReceiptsSelect months={months} />
        </Grid>
      </Grid>
      <Grid container spacing={12}>
        <Grid item xs={12} spacing={12}>
          <Paper>
            <ReportsTable dummyData={dummyData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Reports);
