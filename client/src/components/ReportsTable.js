import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    // minWidth: 650
  },
  totalAmount: {
    color: '#38CC89'
  }
});

export default function ReportsTable({ dummyData }) {
  const classes = useStyles();
  const total = dummyData.reduce((total, data) => total + data.amount, 0);

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography className={classes.totalAmount}>Total Expenses</Typography>
        <Box m={3} display='flex'>
          <Typography variant='h5'>$</Typography>
          <Typography variant='h3'>{total}</Typography>
        </Box>
      </Toolbar>
      <Table className={classes.table} aria-label='simple table'>
        <TableBody>
          {dummyData.map(data => (
            <TableRow key={data.id}>
              <TableCell size='small'>{data.title}</TableCell>
              <TableCell align='center' size='medium'>{data.amount}</TableCell>
              <TableCell align='center'>{data.receipt_date}</TableCell>
              <TableCell align='center'>{data.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
