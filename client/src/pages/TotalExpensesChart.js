import React, { Component } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries
} from "@devexpress/dx-react-chart-material-ui";

const useStyles = theme => ({
  root: {
      flexGrow: 1
  }
});

class TotalExpensesChart extends Component {
  state = {
      daily_expenses: [{expense: 10.01, date: "Nov 3"},
                       {expense: 3.59, date: "Nov 4"},
                       {expense: 5.13, date: "Nov 5"}]
  }

//   componentDidMount() {
//       fetch("/receipts/daily-expenses/2019/11")
//       .then(response => {
//         return response.json();
//       })
//       .then()
//   }

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Chart data={this.state.daily_expenses} width={400} height={250}>
          <ArgumentAxis />
          <ValueAxis />

          <SplineSeries valueField="expense" argumentField="date" />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(TotalExpensesChart)