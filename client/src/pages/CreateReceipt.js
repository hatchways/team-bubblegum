import { FormControl, TextField, Button, InputLabel, MenuItem, Select } from "@material-ui/core";

import React, { Component } from 'react';

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
            <MenuItem value={"Other"} >Other</MenuItem>
          </Select>
          </FormControl>
        </FormControl>
        <Button onClick={this.onBtnClick} >Submit</Button>
      </div>
    );
  }
}

export default CreateReceipt;