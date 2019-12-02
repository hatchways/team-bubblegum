import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import CreateReceipt from './CreateReceipt';
import UploadReceipt from './UploadReceipt';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "white",
    padding: 10
  },
  title: {
    flexGrow: 1
  },
  upload: {
    color: "lightgreen",
    padding: 10,
    marginRight: 20
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function TopBar() {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("upload");
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  let modalPage;
  if (page == "create") {
    modalPage = <CreateReceipt handleClose={handleClose} setPage={setPage} />
  } else {
    modalPage = <UploadReceipt handleClose={handleClose} setPage={setPage} />
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title}></Typography>
          <Button variant="outlined" className={classes.upload} onClick={handleOpen}>Upload Receipt</Button>
          <Button><img alt="pic" />Profile</Button>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          {modalPage}
        </div>
      </Modal>
    </div>
  );
}

export default TopBar;
