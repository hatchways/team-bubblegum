import React, { Component } from 'react';
import { Grid, FormControl, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DragDropIcon from '../drag-and-drop-icon.png';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  file: {
    display: 'none'
  },
  drop: {
    border: '2px solid black',
    cursor: 'pointer'
  }
});

class UploadReceipt extends Component {
  state = {
    images: null
  }

  onFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.files });
  }

  onBtnClick = () => {
    let imagesList = new FormData();
    for (let i = 0; i < this.state.images.length; i++) {
      imagesList.append('files', this.state.images[i]);
    }
    fetch("/receipts/images", {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: imagesList
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.props.setImgUrls(data['locations']);
        this.props.setPage("create");
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4">Upload Receipt</Typography>
            <Button className={classes.button} onClick={this.onBtnClick} >Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <label>
                <div 
                  className={classes.drop}
                  onDrop={(e) => {
                    e.preventDefault();
                    console.log(e);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <img src={DragDropIcon} alt="Drag and Drop Icon" />
                  Drop files here<br />or<br />
                  <input type="file" name="images" accept="image/*" onChange={this.onFormChange} multiple />
                  Custom Upload
                </div>
              </label>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(UploadReceipt);
