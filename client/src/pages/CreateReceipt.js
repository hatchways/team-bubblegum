import React, { Component } from 'react';
import { FormControl, TextField, Button, InputLabel, MenuItem, Select, Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: '#4FD093',
    padding: '12px 50px',
    marginTop: 30
  },
  textField: {
    marginTop: 20,
    width: 500
  }
});

class CreateReceipt extends Component {
  state = {
    title: '',
    amount: 0,
    category: '',
    receipt_date: '',
    pic_urls: this.props.imgUrls
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
    fetch("/receipts/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.props.setPage("upload");
        this.props.handleClose();
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
        <Typography style={{color: '#1A3360', margin: 20, fontWeight: 'bold'}} variant="h4">Add a Receipt</Typography>
        <Divider />
        <FormControl>
          <TextField className={classes.textField} label={"Title"} placeholder="e.g Starbucks" name={"title"} onChange={this.onFormChange} InputLabelProps={{shrink: true}} />
          <TextField className={classes.textField} label={"Amount"} placeholder="e.g 5.50" name={"amount"} onChange={this.onFormChange} InputLabelProps={{shrink: true}} />
          <FormControl className={classes.textField}>
          <InputLabel shrink>Category</InputLabel>
          <Select name={"category"} value={this.state.category} onChange={this.onFormChange} >
            <MenuItem value={"Food"} >Food</MenuItem>
            <MenuItem value={"Merchandise"} >Merchandise</MenuItem>
            <MenuItem value={"Travel"} >Travel</MenuItem>
            <MenuItem value={"Other"} >Other</MenuItem>
          </Select>
          </FormControl>
          <TextField type="date" className={classes.textField} label={"Purchase Date"} name={"receipt_date"} onChange={this.onFormChange} InputLabelProps={{shrink: true}} />
        </FormControl><br />
        <Button variant="outlined" className={classes.button} onClick={this.onBtnClick} >Submit</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateReceipt);
