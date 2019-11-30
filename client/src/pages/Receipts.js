import React, { Component, useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  FormControl,
  MenuItem,
  Select
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReceiptsModal from '../components/ReceiptsModal';
import ReceiptsSelect from '../components/ReceiptsSelect';

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 40)
  },
  toolbar: theme.mixins.toolbar
});

const Receipts = props => {
  const { classes } = props;
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // useEffect(() => {
  //   console.log('in use effect');
  //   fetch('/receipts', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(text => {
  //       console.log(text);
  //     });
  // }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(props);

  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        <Grid item sm>
          <Typography variant='h4'>Receipts</Typography>
        </Grid>
        <Grid item>
          <ReceiptsSelect months={months} />
        </Grid>
      </Grid>
      <Divider />
      <ReceiptsModal
        handleClose={handleClose}
        open={open}
        message={'Testhing one two three'}
      />
      {/* <Paper> */}
      <Grid container direction='row' spacing={3}>
        <Grid item md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                image='https://source.unsplash.com/random'
                style={{ height: '100px' }}
                // onclick it will set its info with setModalInfo
              ></CardMedia>
              <Typography>This is my image</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                image='https://source.unsplash.com/random'
                style={{ height: '100px' }}
              ></CardMedia>
              <Typography>This is my image</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                image='https://source.unsplash.com/random'
                style={{ height: '100px' }}
              ></CardMedia>
              <Typography>This is my image</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                image='https://source.unsplash.com/random'
                style={{ height: '100px' }}
              ></CardMedia>
              <Typography>This is my image</Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </div>
  );
};

export default withStyles(useStyles)(Receipts);
