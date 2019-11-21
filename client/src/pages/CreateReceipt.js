import React, { Component } from 'react';
import { FormControl, TextField, Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  button: {
    margin: theme.spacing(1, 0),
  }
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
      <div>
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
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateReceipt);
