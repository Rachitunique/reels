import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import style from './newww.Module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  hallo: {
    width: 350,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;
const m = `      upload Image`
const m1 = 'Instagram'
const m2 = 'Sign up to see latest photos and videos'
export default function AutoGridNoWrap() {
  const classes = useStyles();

  return (
    <div className={style.top11}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
          <Typography className={style.top12} variant="h3" component="h2">{m1}</Typography>
          <Typography className={style.top12} component="h8">{m2}</Typography>
           {/*<Typography noWrap>{message}</Typography>*/}
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
          <TextField className={classes.hallo} id="outlined-basic" label="emial
          " variant="outlined" />
  {/*<Typography noWrap>{message}</Typography>*/}
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
          <TextField className={classes.hallo} id="outlined-basic" label="Password
          " variant="outlined" />
  {/*<Typography noWrap>{message}</Typography>*/}
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
          <TextField className={classes.hallo} id="outlined-basic" label="Full Name
          " variant="outlined" />
  {/*<Typography noWrap>{message}</Typography>*/}
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography className={style.top}><CloudUploadIcon className={style.top1}></CloudUploadIcon>{m}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography> <Button className={classes.hallo} variant="contained" color="primary" href="#contained-buttons">
            Sign up
            </Button></Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}