import React, { Component } from 'react';
import { Grid, FormControl, Button, Typography, CardMedia } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import DragDropIcon from '../drag-and-drop-icon.png';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: '30px 0',
    padding: 20,
    border: 'white'
  },
  file: {
    display: 'none'
  },
  submit: {
    color: '#4FD093',
    padding: '12px 50px'
  },
  select: {
    background: '#1B3460',
    color: 'white',
    padding: '10px 20px',
    margin: '20px auto'
  },
  drop: {
    cursor: 'pointer',
    background: '#F3F5FB',
    padding: 20,
    width: 400,
    textAlign: 'center'
  },
  divider: {
    border: '2px solid black',
    width: 120,
    height: 180,
    margin: '30px 0'
  },
  imageContainer: {
    width: 400,
    height: 240
  },
  image: {
    maxWidth: 120,
    height: 90,
    margin: '50px 0'
  },
  dropText: {
    margin: 12
  }
});

class UploadReceipt extends Component {
  state = {
    images: null,
    selectedImages: null
  }

  onFormChange = (e) => {
    let imageList = [];
    let urlObject;
    for (let i = 0; i < e.target.files.length; i++) {
      urlObject = URL.createObjectURL(e.target.files[i]);
      imageList.push(urlObject);
    }
    this.setState({ [e.target.name]: e.target.files, selectedImages: imageList });
  }

  onBtnClick = () => {
    let imagesList = new FormData();
    for (let i = 0; i < this.state.images.length; i++) {
      imagesList.append('files', this.state.images[i]);
    }
    console.log(this.state);
    fetch("/receipts/images", {
      method: "POST",
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
    let selectedImages;
    if (this.state.selectedImages) {
      selectedImages = this.state.selectedImages;
    } else {
      selectedImages = [];
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className={classes.paper}>
              <Typography style={{color: '#1A3360', margin: 30, fontWeight: 'bold'}} variant="h4">Upload receipt</Typography>
              <Typography style={{color: 'gray', marginLeft: 30}} variant="body1">Upload one or more receipt(s)</Typography>
              <div className={classes.imageContainer}>
                {selectedImages.map((image, index) => {
                  return <CardMedia key={index} image={image} title="receipt image" className={classes.image} />
                })}
                {this.state.selectedImages && <DeleteIcon />}
              </div>
              <Button variant="outlined" className={classes.submit} onClick={this.onBtnClick} >Submit</Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.paper}>
              <FormControl>
                <label htmlFor="raised-button-file">
                  <div 
                    className={classes.drop}
                    onDrop={(e) => {
                      e.preventDefault();
                      console.log(e);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <CardMedia style={{marginLeft: 'auto', marginRight: 'auto'}} image={DragDropIcon} title="Drag and Drop Icon" className={classes.image} /><br />
                    <Typography className={classes.dropText} variant="h5">Drop files here</Typography>
                    <Typography className={classes.dropText} variant="body1">or</Typography>
                    <Grid container direction="column" alignItems="center">
                      <Grid item xs={12}>
                        <Button variant="contained" component="span" className={classes.select}>Take a photo</Button>
                      </Grid>
                    </Grid>
                  </div>
                </label>
                <input type="file" id="raised-button-file" name="images" accept="image/*" onChange={this.onFormChange} style={{display: 'none'}} multiple />
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(UploadReceipt);
