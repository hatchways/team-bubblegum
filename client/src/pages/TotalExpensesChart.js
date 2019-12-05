import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale } from '@devexpress/dx-react-chart';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: 350
  },
  content: {

  },
  title: {
    padding: theme.spacing(2)
  }
});

class TotalExpensesChart extends Component {
  state = {
    dailyExpenses: []
  }

  componentDidMount() {
    console.log(this.state.dailyExpenses)
    fetch("/receipts/daily-expenses/" + this.props.year + "/" + this.props.month)
    .then(response => {
      return response.json();
    })
    .then(results => {
      this.setState({
        dailyExpenses: results.data.map(item => ({
          date: item.date['date'],
          expense: item.expense
        }))
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year || this.props.month !== prevProps.month) {
      fetch("/receipts/daily-expenses/" + this.props.year + "/" + this.props.month)
      .then(response => {
        return response.json();
      })
      .then(results => {
        this.setState({
          dailyExpenses: results.data.map(item => ({
            date: item.date['date'],
            expense: item.expense
          }))
        })
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Paper className={classes.content}>
          <div className={classes.title}>
            <Typography>TOTAL EXPENSES</Typography>
          </div>
          <Chart data={this.state.dailyExpenses} width={350} height={200}>
            <ArgumentScale />
            <ArgumentAxis />
            <ValueAxis />

            <SplineSeries valueField="expense" argumentField="date" />
          </Chart>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(TotalExpensesChart)