import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    maxWidth: "500px", // add this line to set the maximum width
    minWidth: "500px",
    opacity: 0.8 // add this line to set the opacity
  }
}));

function JoinReq({ username, onAcceptClick, onRejectClick }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">{username}</Typography>
      <div>
        <Button color="primary" onClick={onAcceptClick}>
          Accept
        </Button>
        <Button color="secondary" onClick={onRejectClick}>
          Reject
        </Button>
      </div>
    </Paper>
  );
}

export default JoinReq;
