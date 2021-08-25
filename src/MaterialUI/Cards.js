import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

//dialog use kra wo bhi ek component hai
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//video imported
import video from './vid.mp4';
//module.css se is component ki styling isi component me rahengi kisi aur component me jake reflect nhi hongi
import style from './Cards.Module.css';
const useStyles = makeStyles({
  root: {
    margin:'0 auto',
    width:'30%'
  },
  media: {
    height: 140,
  },
});

export default function Cards() {
  //handleclose tak dialog ka
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/*material ui walo ne yha media dala tha hamne yha uski jagah video dalna hai*/}
        {/*.vs class ko style di hai cardsmodule.css me*/}
        {/*ab hamne module.css use kiya to react ise ek class dega jo iske liye unique hoga*/}
        <video className={style.vs} src={video} autoPlay controls muted/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={handleClickOpen} >
          Learn More
        </Button>
        {/*dialog box css applied on learn more button*/}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </CardActions>
    </Card>
  );
}
