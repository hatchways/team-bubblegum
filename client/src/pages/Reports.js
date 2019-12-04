import React, { Component } from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 40),
  },
  toolbar: theme.mixins.toolbar
});

class Reports extends Component {
  onBtnClick = () => {
    fetch("/receipts/download")
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <Typography variant="h4">Reports</Typography>
          <Divider />
          <Typography paragraph>SOME COOL STUFF HERE</Typography>
          <Button variant="contained" color="primary" onClick={this.onBtnClick}>DOWNLOAD</Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(Reports);
