import React, { useState } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import Cookies from 'js-cookie';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const protectedCookies = JSON.parse(process.env.REACT_APP_PROTECTED_COOKIES);

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f2f2f2'
  },
  paper: {
    padding: '10px',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '.1rem solid #ddd'
  },
  avatar: {
    margin: theme.spacing(1),
    height: '100px',
    width: '100px'
    // backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#650360',
    borderColor: '#650360',
    "&:hover": {
      backgroundColor: '#cb3974',
    }
  },
  bodyText: {
    marginTop: '10px',
  },

}));

const App = () => {
  const classes = useStyles();
  const allCookies = Object.keys(Cookies.get());
  const [isDone, setIsDone] = useState(false);

  console.log('Cookie Names for this domain', allCookies);

  //send log of user cookies
  datadogRum.addAction('cookiePageLoaded', {
    cookies: allCookies
  });

  const handleClick = () => {
    const deleteList = allCookies.filter(i => !protectedCookies.includes(i));

    deleteList.forEach(item => {
      Cookies.remove(item);
    });

    datadogRum.addAction('cookiesDeleted', {
      cookies: deleteList
    });

    setIsDone(true);
  }

  if (isDone) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography className={classes.bodyText}>
            Your cleanup is complete.  Please return to login as normal. <Link href={process.env.REACT_APP_LOGIN_URL}>Login</Link>
          </Typography>
        </div>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={process.env.REACT_APP_LOGO_IMAGE} />
        <Typography component="h1" variant="h4">Cookie Maintenance</Typography>
        <Typography className={classes.bodyText}>
          Hello, you are on this page because you have a number of extraneous cookies in your browser.  We need to put it on a bit of a diet.  Please click the button below to clear all non-essential cookies from this domain.
        </Typography>
        <Typography className={classes.bodyText}>
          Note: This may require you to relogin to various applications
        </Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          id='prune-cookies-button'
          rel="noopener noreferrer"
          color="primary"
          className={classes.submit}
        >
          Prune Cookies
        </Button>
      </div>
    </Container>
  );
}

export default App;
