import React, { Component } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

import TopCategoriesItem from "./TopCategoriesItem"

const useStyles = theme => ({
  root: {
    flexGrow: 0,
    width: 350
  },
  content: {
    height: 256
  },
  title: {
    padding: theme.spacing(2)
  }
})

class TopCategoriesModule extends Component {
  state = {
    topCategories: []
  }

  componentDidMount() {
    fetch("/categories/" + this.props.year + "/" + this.props.month)
    .then(response => {
      return response.json();
    })
    .then(results => {
      this.setState({
        topCategories: results.categories
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year || this.props.month !== prevProps.month) {
      fetch("/categories/" + this.props.year + "/" + this.props.month)
      .then(response => {
        return response.json();
      })
      .then(results => {
        this.setState({
          topCategories: results.categories
        })
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root}>
        <Paper className={classes.content}>
          <div className={classes.title}>
            <Typography >TOP CATEGORIES</Typography>
          </div>
          <Divider />
          <TopCategoriesItem topCategories={this.state.topCategories} />
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(TopCategoriesModule);