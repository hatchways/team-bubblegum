import React, { Component } from 'react';
import { FormControl, TextField, Button, InputLabel, MenuItem, Select, Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 35),
  },
  toolbar: theme.mixins.toolbar
});

class CreateReceipt extends Component {
  state = {
    name: '',
    amount: '',
    category: ''
  }

  onFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onBtnClick = () => {
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h4">Add a Receipt</Typography>
          <Divider />
          <FormControl>
            <TextField label={"Name"} name={"name"} onChange={this.onFormChange} />
            <TextField label={"Amount"} name={"amount"} onChange={this.onFormChange} />
            <FormControl>
            <InputLabel>Category</InputLabel>
            <Select name={"category"} value={this.state.category} onChange={this.onFormChange} >
              <MenuItem value={"Food"} >Food</MenuItem>
              <MenuItem value={"Merchandise"} >Merchandise</MenuItem>
              <MenuItem value={"Travel"} >Travel</MenuItem>
              <MenuItem value={"Other"} >Other</MenuItem>
            </Select>
            </FormControl>
          </FormControl><br />
          <Button className={classes.button} onClick={this.onBtnClick} >Submit</Button>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateReceipt);
