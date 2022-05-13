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
import StarIcon from '@mui/icons-material/Star';
import { useCallback, useEffect } from 'react';
import { useStore } from './state_map'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function Stepper({ id, itemsData }) {
  // lets code click outside
  useEffect(
    () => {
      document.addEventListener('mousedown', mounted)
      document.addEventListener('dblclick', (e) => { console.log('double Clicked') })
      return () => document.removeEventListener('mousedown', mounted)
    }, []
  )

  const mounted = useCallback(
    (e) => {
      // console.log(e.target.clientHeight)
      if (e.target.clientHeight === 29 || e.target.clientHeight === 24 || e.target.clientHeight === 40 || e.target.clientHeight === 48 || e.target.clientHeight === 246 || e.target.clientHeight === 19 || e.target.clientHeight === 47 || e.target.clientHeight === 32 || e.target.clientHeight === 8) { setViewBoxClick(true) }
      else { setViewBoxClick(false) }

    }, []
  )
  // 
  const setViewBoxClick = useStore(state => state.setViewBoxClick)

  const items = itemsData[id];
  console.log(items.listing.contextualPictures)

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = items.listing.contextualPictures.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  return (
    <>
      {itemsData &&
        <div className={Style.containerView} >
          <Paper><div style={{ padding: 5, fontSize: 16 }}>{items.listing.roomTypeCategory.replace(/_/i, ' ').toUpperCase()}</div></Paper>
          <Paper style={{ padding: 5 }}
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 40,
              pl: 2,
              bgcolor: 'background.default',
              boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important'
            }}
          >
            <Typography>{items.listing.name.substring(0, 42).toLowerCase()}</Typography>
          </Paper>
          <Paper className={Style.subCardMap}>
            <div style={{ display: 'flex', alignItems: "center", }} >
              <div><StarIcon color='secondary' /></div> <div style={{ fontSize: 16 }}>{items.listing.avgRating !== undefined ? `${items.listing.avgRating}/5` : <div> ?/5 </div>}</div>
            </div>

            <div style={{ fontSize: 16 }}>{HomeDetails({ id, itemsData })} </div>
            <div style={{ fontWeight: "bold", fontSize: 16 }} >{items.pricingQuote.priceString}</div>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            autoplay={false}
          >
            {
              items.listing.contextualPictures.map((step, index) => (

                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? <div style={{ overflow: 'hidden' }} >
                    {<img style={{ width: 369, height: 246 }} src={step.picture} ></img>}</div> : <></>} </div>
              ))
            }

          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </div>
      }
    </>

  );
}

export { Stepper };

function HomeDetails({ id, itemsData }) {
  const ar = []

  const items = itemsData[id];
  items.listing.homeDetails.map(x => ar.push(x))
  return <> {ar[0].title}  {ar[1].title} {ar[3].title} </>
}