import React, { Component } from 'react';
import { Typography, Divider, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale } from '@devexpress/dx-react-chart';

const today = new Date()
var yr = today.getFullYear()
var mth = today.getMonth() + 1

const useStyles = theme => ({
  root: {
      flexGrow: 1
  },
  content: {
      width: 400
  },
  leftBar: {
      width: 190,
      display: 'inline'
  },
  rightBar: {
      width: 190,
      display: 'inline'
  }
});

class TotalExpensesChart extends Component {
  state = {
      year: yr,
      month: mth,
      dailyExpenses: []
  }

  componentDidMount() {
      fetch("/receipts/daily-expenses/" + this.state.year + "/" + this.state.month)
      .then(response => {
        return response.json();
      })
      .then(results => {
          this.setState({
            dailyExpenses: results.data
          })
      })
  }

  componentDidUpdate(prevProps, prevState) {
      console.log(this.state.dailyExpenses)
      console.log(this.state.month)
      console.log(prevState.month)
      if (this.state.year !== prevState.year || this.state.month !== prevState.month) {
          fetch("/receipts/daily-expenses/" + this.state.year + "/" + this.state.month)
          .then(response => {
              return response.json();
          })
          .then(results => {
              this.setState({
                dailyExpenses: results.data
              })
          })
      }
  }

  onFormChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.content}>
          <div className={classes.leftBar}>
            <Typography paragraph>TOTAL EXPENSES</Typography>
          </div>
          <div className={classes.rightBar}>
            <FormControl>
                <InputLabel>Month</InputLabel>
                <Select name={"month"} onChange={this.onFormChange} >
                    <MenuItem value={1} >January</MenuItem>
                    <MenuItem value={2} >February</MenuItem>
                    <MenuItem value={3} >March</MenuItem>
                    <MenuItem value={4} >April</MenuItem>
                    <MenuItem value={5} >May</MenuItem>
                    <MenuItem value={6} >June</MenuItem>
                    <MenuItem value={7} >July</MenuItem>
                    <MenuItem value={8} >August</MenuItem>
                    <MenuItem value={9} >September</MenuItem>
                    <MenuItem value={10} >October</MenuItem>
                    <MenuItem value={11} >November</MenuItem>
                    <MenuItem value={12} >December</MenuItem>
                </Select>
            </FormControl>
          </div>
          <Chart data={this.state.dailyExpenses} width={400} height={250}>
            <ArgumentScale />
            <ArgumentAxis />
            <ValueAxis />

            <SplineSeries valueField="expense" argumentField="date" />
          </Chart>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(TotalExpensesChart)