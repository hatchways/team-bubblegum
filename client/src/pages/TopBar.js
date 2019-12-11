import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import CreateReceipt from './CreateReceipt';
import UploadReceipt from './UploadReceipt';
import {IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "white",
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    }
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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function TopBar({ handleDrawerToggle }) {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("create");
  const [imgUrls, setImgUrls] = useState([]);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  let modalPage;
  let modalWidth;
  if (page == "create") {
    modalWidth = 500;
    modalPage = <CreateReceipt handleClose={handleClose} setPage={setPage} imgUrls={imgUrls} />
  } else {
    modalWidth = 1000;
    modalPage = <UploadReceipt handleClose={handleClose} setPage={setPage} setImgUrls={setImgUrls} />
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}></Typography>
          <Button variant="outlined" className={classes.upload} onClick={handleOpen}>Upload Receipt</Button>
          <Button><AccountCircleIcon />Profile</Button>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div style={{width: modalWidth}}>
            {modalPage}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TopBar;
