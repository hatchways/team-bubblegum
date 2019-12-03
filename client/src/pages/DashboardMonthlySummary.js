import React, { Component } from 'react';
import { FormControl, MenuItem, Select, InputLabel, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TotalExpensesChart from './TotalExpensesChart';
import TopCategoriesModule from './TopCategoriesModule';

const today = new Date()
var yr = today.getFullYear()
var mth = today.getMonth() + 1

const useStyles = theme => ({
  root: {
    flexGrow: 1
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
        <Grid container justify="flex-end">
          <Grid item md={7} lg="auto">
            <FormControl>
              <InputLabel>Month</InputLabel>
              <Select name={"month"} value={this.state.month} onChange={this.onFormChange}>
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
        </Grid>
        <Grid container direction="row" justify="space-between" spacing={2}>
          <Grid item md={12} lg={6} className={classes.chart}>
            <TotalExpensesChart year={this.state.year} month={this.state.month}/>
          </Grid>
          <Grid item md={12} lg={6} className={classes.categories}>
            <TopCategoriesModule year={this.state.year} month={this.state.month}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(DashboardMonthlySummary)