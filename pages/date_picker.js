import Style from '../styles/day.module.css'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useStore } from '../components/state_day'
import format from 'date-fns/format';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useCallback, useRef, useEffect } from 'react';

// lets code click outside


export default function DayHome() {

  const node = useRef()

  const moveRight = useStore(state => state.moveRight)
  const setMoveRight = useStore(state => state.setMoveRight)
  const show = useStore(state => state.show)
  const setShow = useStore(state => state.setShow)
  const checkInText = useStore(state => state.checkInText)
  const setCheckInText = useStore(state => state.setCheckInText)
  const checkOutText = useStore(state => state.checkOutText)
  const setCheckOutText = useStore(state => state.setCheckOutText)
  const disabled = useStore(state => state.disabled)
  const setDisabled = useStore(state => state.setDisabled)

// click Outside

   useEffect(
     ()=>{
       document.addEventListener('mousedown', clickedOutside)
       return  ()=>{ document.removeEventListener('mousedown', clickedOutside) }
     },[]
   )

   const clickedOutside = useCallback(
      (e)=>{
        if(node.current.contains(e.target)) { return}
        else  setShow('none')
   },[node]
   )

// 



  const inClicked = () => { setShow('block'); setDisabled({ before:[] }); setMoveRight(false)  }
  const outClicked = () => { setMoveRight(true);setShow('block');  setDisabled({ before:[] }) }

  const dayClicked = (day) => {
    setMoveRight(!moveRight)
    console.log(moveRight)
    if (moveRight) { setShow('none'); setCheckOutText(format(day, 'dd MMM yy')); }
    else { setCheckInText(format(day, 'dd MMM yy'));  setDisabled( { before:day} )  }
  }




  return (

    <div className={Style.container}  ref={node} >

      <div className={Style.button} onClick={inClicked}  >
        <CalendarTodayIcon color='primary' />
        {checkInText}
      </div>

      <div className={Style.button} onClick={outClicked} >
        <CalendarTodayIcon color='primary' />

        {checkOutText}
      </div>

      <div className={Style.day} style={{ left: moveRight ? 100 : 0, display: show }}  >

        <DayPicker
          onDayClick={dayClicked}
          disabled={disabled}
        />
      </div>



    </div>

  )
}


