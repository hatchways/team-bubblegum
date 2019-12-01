import React, { Component } from 'react';
import { Grid, FormControl, Button, Typography, Paper, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DragDropIcon from '../drag-and-drop-icon.png';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: '30px 0',
    padding: 20
  },
  file: {
    display: 'none'
  },
  submit: {
    color: 'lightgreen',
    padding: '12px 50px'
  },
  select: {
    margin: 'auto',
    padding: 10,
    margin: '20px 0',
  },
  drop: {
    border: '2px solid black',
    cursor: 'pointer',
    background: 'pink',
    padding: 20,
    width: 400
  },
  divider: {
    border: '2px solid black',
    width: 120,
    height: 180,
    margin: '30px 0'
  },
  image: {
    maxWidth: 160,
    height: 120,
    margin: '50px 0'
  }
});

class UploadReceipt extends Component {
  state = {
    images: null,
    selectedImages: null
  }

  onFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.files, selectedImages: URL.createObjectURL(e.target.files[0]) });
    console.log(this.state);
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
            <Paper className={classes.paper}>
              <Typography style={{color: 'blue', margin: 30}} variant="h4">Upload Receipt</Typography>
              <Typography style={{color: 'gray', marginLeft: 30}} variant="body1">Upload one or more receipt(s)</Typography>
              <CardMedia image={this.state.selectedImages} title="receipt image" className={classes.image} />
              <Button variant="outlined" className={classes.submit} onClick={this.onBtnClick} >Submit</Button>
            </Paper>
          </Grid>
          <Grid item xs={6} alignItems="center">
            <Paper className={classes.paper}>
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
                    <CardMedia style={{marginLeft: 'auto', marginRight: 'auto'}} image={DragDropIcon} title="Drag and Drop Icon" className={classes.image} /><br />
                    <Typography style={{margin: 12}} variant="h5" align="center">Drop files here</Typography>
                    <Typography style={{margin: 12}} variant="body1" align="center">or</Typography>
                    <input type="file" name="images" accept="image/*" onChange={this.onFormChange} multiple />
                  </div>
                </label>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(UploadReceipt);
