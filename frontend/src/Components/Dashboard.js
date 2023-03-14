import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { useSignOut } from 'react-auth-kit';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    height: "100%",
    width : "100%",
    marginLeft: "220px"

  },
  card: {
    minWidth: 300,
    maxWidth: 600,
    padding: theme.spacing(4),
    textAlign: 'center',
    fontFamily: 'Montserrat',
    borderRadius: theme.spacing(2),
  },
  welcomeMsg: {
    marginBottom: theme.spacing(2),
  },
  message: {
    fontSize: 12,
    marginTop: theme.spacing(1),
  },
  logoutBtn: {
    marginTop: theme.spacing(2),
  },
}));

const Dashboard = () => {

  const classes = useStyles();
  const signOut = useSignOut()
  const navigate = useNavigate()


  const handleLogout = async () => {
    try {
        signOut()
        navigate("/auth")

    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className='container'>
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" gutterBottom className={classes.welcomeMsg}>
            Welcome to Grediiit!
          </Typography>
          <Typography variant="body1" className={classes.message}>
            Use the navbar to navigate.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default Dashboard;
