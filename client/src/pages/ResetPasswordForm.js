import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import bgImage from '../assets/images/4c49d03df598d6822be307208f2333b1e9b42279.png';
import logo from '../assets/images/logo.png';

import CustomizedSnackbars from '../components/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  imageContainer: {
    width: '100px',
    height: '100px',
    marginBottom: '2rem',
    margin: 'auto'
  },
  background: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  },
  overlay: {
    height: '100vh',
    backgroundColor: 'blue',
    opacity: '.28',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoOverlay: {
    position: 'absolute'
  },
  logoArea: {
    width: '100%',
    height: '200px',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#FFF',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  linkButton: {
    padding: theme.spacing(2, 4),
    backgroundColor: '#FFF'
  },
  paper: {
    margin: theme.spacing(8, 8)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(12)
  },
  formInput: {
    marginTop: '2rem',
    width: '75%'
  },
  resetPassword: {
    margin: theme.spacing(8, 0, 2),
    padding: theme.spacing(2, 4),
    color: '#38CC89',
    border: '1px solid #38CC89',
    backgroundColor: '#FFF'
  }
}));

const ResetPasswordForm = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [err, setErr] = useState('');

  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={4} md={5} className={classes.background}>
        <div className={classes.overlay}></div>
        <div className={classes.logoArea}>
          <div className={classes.imageContainer}>
            <img src={logo} alt='' className={classes.logo} />
          </div>
          <div style={{ textAlign: 'center' }}>RECEIPT TRACKER</div>
        </div>
      </Grid>
      <Grid container item direction='column' xs={12} sm={8} md={7}>
        <div className={classes.paper}>
          <Grid container justify='flex-end' alignItems='center'>
            <p style={{ margin: '1rem' }}>Don't have an account?</p>
            <Button
              variant='contained'
              className={classes.linkButton}
              href={'/signup'}
            >
              Create
            </Button>
          </Grid>
          <Grid container>
            <form className={classes.form}>
              <h1>Reset your password</h1>
              {err.length > 0 && (
                <CustomizedSnackbars variant='error' message={err} />
              )}
              <TextField
                label={'Password'}
                className={classes.formInput}
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
              />
              <TextField
                label={'Confirm password'}
                className={classes.formInput}
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type='password'
              />
              <div>
                <Button className={classes.resetPassword}>
                  Reset password
                </Button>
              </div>
            </form>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordForm;
