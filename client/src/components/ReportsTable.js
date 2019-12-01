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
    minWidth: 650,
    width: '100%'
  },
  totalAmount: {
    color: '#38CC89'
  }
});

export default function ReportsTable({ receiptData: { posts, total_amount } }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography className={classes.totalAmount}>Total Expenses</Typography>
        <Box m={3} display='flex'>
          <Typography variant='h5'>$</Typography>
          <Typography variant='h3'>{total_amount}</Typography>
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
