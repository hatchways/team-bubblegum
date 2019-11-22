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
    title: '',
    amount: 0,
    category: '',
    receipt_date: ''
  }

  onFormChange = (e) => {
    if (e.target.name === "amount") {
      let amt = parseFloat(e.target.value);
      this.setState({ [e.target.name]: amt });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onBtnClick = () => {
    console.log(this.state);
    fetch("/receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h4">Add a Receipt</Typography>
          <Divider />
          <FormControl>
            <TextField label={"Title"} name={"title"} onChange={this.onFormChange} />
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
            <TextField type="date" label={"Purchase Date"} name={"receipt_date"} onChange={this.onFormChange} InputLabelProps={{shrink: true}} />
          </FormControl><br />
          <Button className={classes.button} onClick={this.onBtnClick} >Submit</Button>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateReceipt);
