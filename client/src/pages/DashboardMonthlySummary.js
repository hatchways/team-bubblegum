import React, { Component } from 'react';
import { Typography, Divider, FormControl, MenuItem, Select, InputLabel, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TotalExpensesChart from './TotalExpensesChart';
import TopCategoriesModule from './TopCategoriesModule';

const today = new Date()
var yr = today.getFullYear()
var mth = today.getMonth() + 1

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  monthForm: {
    width: '100%',
  },
  chart: {
    direction: 'row',
    width: '50%'
  },
  categories: {
    direction: 'row',
    width: '50%'
  }
});

class DashboardMonthlySummary extends Component {
  state = {
    year: yr,
    month: mth
  }

  onFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root}>
        <Grid item className={classes.monthForm}>
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
        </Grid>
        <Grid item className={classes.chart}>
          <TotalExpensesChart year={this.state.year} month={this.state.month}/>
        </Grid>
        <Grid item className={classes.categories}>
          <TopCategoriesModule year={this.state.year} month={this.state.month}/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(DashboardMonthlySummary)