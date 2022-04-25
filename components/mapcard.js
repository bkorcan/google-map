import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function MapCard() {

  return (
    <Card sx={{ maxWidth: 230}}  onClick={()=> console.log('view clicked') }   >
      <CardHeader  style={{padding:7}}
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            344
          </Avatar>
        }
        title="Shrimp and Chorizo"
      />
      <CardMedia
        component="img"
        height="134"
        image="/img/card1.jpg"
        alt="Paella dish"
      />
      <CardContent style={{ padding:5 }}>
        <Typography variant="body2" color="text.secondary"  >
          This impressive paella is a perfect party dish.
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{ padding:0 }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
