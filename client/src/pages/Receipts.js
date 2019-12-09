import React, { Component, useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
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
  textCenter: {
    textAlign: 'center'
  },
  toolbar: theme.mixins.toolbar
});

const Receipts = props => {
  const { classes } = props;
  const [receiptData, setReceiptData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [month, setMonth] = useState('All')
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

  useEffect(() => {
    const fetchReceipts = async () => {
      const response = await fetch('/receipts/');
      const jsonResponse = await response.json();

      await setReceiptData(jsonResponse);
      console.log(receiptData, jsonResponse);
    };

    fetchReceipts();
  }, []);

  const handleOpen = receipt => {
    setModalData(receipt);
    setOpen(true);
  };
  const handleClose = () => {
    setModalData({});
    setOpen(false);
  };
  const handleMonthChange = month => {
    setMonth(month);
    // Make new api call with the updated month
  };

  console.log(props);

  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        <Grid item sm>
          <Typography variant='h4'>Receipts</Typography>
        </Grid>
        <Grid item>
        <ReceiptsSelect
            month={month}
            months={months}
            handleMonthChange={handleMonthChange}
          />
        </Grid>
      </Grid>
      <Divider />
      <ReceiptsModal
        handleClose={handleClose}
        open={open}
        // message={modalData.title}
        data={modalData}
      />
      <Grid container direction='row' spacing={3}>
        {receiptData.posts &&
          receiptData.posts.map(receipt => (
            <Grid item md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    image={receipt.pic_url}
                    style={{ height: '200px' }}
                    onClick={() => handleOpen(receipt)}
                  ></CardMedia>
                  <CardContent className={classes.textCenter}>
                    <Typography>{receipt.receipt_date}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Receipts);
