import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Style from '../styles/stepper.module.css'
import { Grid } from "@mui/material";
import { res } from "../components/data"
import StarIcon from '@mui/icons-material/Star';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function Stepper() {
  const items = res[0].niobeMinimalClientData[0][1].data.presentation.explore.sections.sections[3].section.child.section.items[1];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = ContentNew().length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

function HomeDetails() {
  const ar = []
  items.listing.homeDetails.map(x => ar.push(x))
  return <> {ar[0].title}  {ar[1].title} {ar[3].title} </>
}

  function ContentNew() {
    const picturesLength = items.listing.contextualPictures.length

    if (picturesLength === 6)
      return [
        { label: `${items.listing.name.substring(0, 42).toLowerCase()}.... `, imgContainer: <Grid container className={Style.containerImage}><Grid item className={Style.itemImage}> <img src={items.listing.contextualPictures[0].picture} alt="alt"  width={369} height={246}/></Grid> </Grid> }, 
        { label: `${items.listing.name.substring(0, 42).toLowerCase()}... `, imgContainer: <Grid container className={Style.containerImage}><Grid item className={Style.itemImage}> <img src={items.listing.contextualPictures[1].picture} alt="alt"  width={369} height={246}/></Grid> </Grid> },
        { label: `${items.listing.name.substring(0, 42).toLowerCase()}.... `, imgContainer: <Grid container className={Style.containerImage}><Grid item className={Style.itemImage}> <img src={items.listing.contextualPictures[2].picture} alt="alt"  width={369} height={246}/></Grid> </Grid> },{ label: `${items.listing.name.substring(0, 42).toLowerCase()}... `, imgContainer: <Grid container className={Style.containerImage}><Grid item className={Style.itemImage}> <img src={items.listing.contextualPictures[3].picture} alt="alt"  width={369} height={246}/></Grid> </Grid> },{ label: `${items.listing.name.substring(0, 42).toLowerCase()}.... `, imgContainer: <Grid container className={Style.containerImage}><Grid item className={Style.itemImage}> <img src={items.listing.contextualPictures[4].picture} alt="alt"  width={369} height={246}/></Grid> </Grid> },{ label: `${items.listing.name.substring(0, 42).toLowerCase()}... `, imgContainer: <Grid container className={Style.containerImage}><Grid item className={Style.itemImage}> <img src={items.listing.contextualPictures[5].picture} alt="alt"  width={369} height={246}/></Grid> </Grid> },
      ]
  }

  return (
    <div>hey</div>
    // <div className={Style.container} >
    //   <Paper><div style={{ padding: 5 }}>{items.listing.roomTypeCategory.replace(/_/i, ' ').toUpperCase()}</div></Paper>
    //   <Paper style={{ padding: 5 }}
    //     square
    //     elevation={0}
    //     sx={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       height: 40,
    //       pl: 2,
    //       bgcolor: 'background.default',
    //       boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important'
    //     }}
    //   >
    //     <Typography>{ContentNew()[activeStep].label}</Typography>
    //   </Paper>
    //   <Paper className={Style.subCardMap} >
    //     <div style={{ display: 'flex', alignItems: "center" }} >
    //       <div><StarIcon color='secondary' /></div> <div>{items.listing.avgRating !== null ? `${items.listing.avgRating}/5` : <> ?/5 </>}</div>
    //     </div>

    //     <div>{HomeDetails()} </div>
    //     <div style={{ fontWeight: "bold" }} >{items.pricingQuote.priceString}</div>
    //   </Paper>
    //   <AutoPlaySwipeableViews
    //     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    //     index={activeStep}
    //     onChangeIndex={handleStepChange}
    //     enableMouseEvents
    //     autoplay={false}
    //   >
    //     {
    //       ContentNew().map((step, index) => (
    //         <div key={index}> 
    //           {Math.abs(activeStep - index) <= 2 ? <div> {step.imgContainer}</div> : null} </div>
    //       ))
    //     }

    //   </AutoPlaySwipeableViews>
    //   <MobileStepper
    //     steps={maxSteps}
    //     position="static"
    //     activeStep={activeStep}
    //     nextButton={
    //       <Button
    //         size="small"
    //         onClick={handleNext}
    //         disabled={activeStep === maxSteps - 1}
    //       >
    //         Next
    //         {theme.direction === 'rtl' ? (
    //           <KeyboardArrowLeft />
    //         ) : (
    //           <KeyboardArrowRight />
    //         )}
    //       </Button>
    //     }
    //     backButton={
    //       <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
    //         {theme.direction === 'rtl' ? (
    //           <KeyboardArrowRight />
    //         ) : (
    //           <KeyboardArrowLeft />
    //         )}
    //         Back
    //       </Button>
    //     }
    //   />
    // </div>
  );
}

export default Stepper;
