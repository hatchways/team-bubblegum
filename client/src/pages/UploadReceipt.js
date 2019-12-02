import React, { Component } from 'react';
import { FormControl, Button, Typography, Divider, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
});

class UploadReceipt extends Component {
  state = {
    image: ''
  }

  onFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  onBtnClick = () => {
    console.log(this.state);
    this.props.setPage("create");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4">Upload Receipt</Typography>
        <Divider />
        <FormControl>
          <input type="file" name="image" accept="image/*" onChange={this.onFormChange} />
        </FormControl><br />
        <Button className={classes.button} onClick={this.onBtnClick} >Submit</Button>
      </div>
    );
  }
}

export default withStyles(useStyles)(UploadReceipt);
