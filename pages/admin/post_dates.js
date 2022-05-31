import Style from '../../styles/day.module.css'
import TextField from '@mui/material/TextField';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useStore } from '../../components/state_day'
import format from 'date-fns/format';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {Call} from '../../components/post_dates'




export default function Postdates() {
 const call = useStore(state => state.call)
 const setCall = useStore(state => state.setCall)
    // Date_picker
    const moveRight = useStore(state => state.moveRight)
    const setMoveRight = useStore(state => state.setMoveRight)
    const show = useStore(state => state.show)
    const setShow = useStore(state => state.setShow)
    const checkInText = useStore(state => state.checkInText)
    const setCheckInText = useStore(state => state.setCheckInText)
    const checkOutText = useStore(state => state.checkOutText)
    const setCheckOutText = useStore(state => state.setCheckOutText)
    const focus = useStore(state => state.focus)
    const setFocus = useStore(state => state.setFocus)
    const disabled = useStore(state => state.disabled)
    const setDisabled = useStore(state => state.setDisabled)

    const dayClicked = (day) => {
        // console.log(day)
        if (!focus) {
            setCheckInText(format(day, 'yyyy-MM-dd'));
            setMoveRight(true);
            setFocus(true);
            setDisabled({ before: day })
        } else {
            setCheckOutText(format(day, 'yyyy-MM-dd'));
            setShow('none')
            setFocus(false)
            setMoveRight(false);
            setDisabled({ before: new Date() })
        }
    }

    return (
        <div className={Style.adminDayContainer} >


            <div className={Style.dayContainer}   >

                <TextField margin="normal" name="CheckIn" value={checkInText} autoComplete="off" label="Check In" type="text" id="check_in" style={{ width: '30%', marginRight: '5%' }}
                    onClick={() => { setDisabled(disabled); setShow('block'); }}

                />
                <TextField margin="normal" name="CheckOut" value={checkOutText} label="Check Out" type="text" id="check_out" style={{ width: '30%' }}
                    focused={focus}
                />
                <div className={Style.day} style={{ left: moveRight ? 100 : 0, display: show }} >
                    <DayPicker
                        onDayClick={dayClicked}
                        disabled={disabled}
                    />
                </div>

                { !call &&
                <Button 
                     variant="contained"
                    style={{ fontSize: 20, backgroundColor: 'purple',width:'30%', marginLeft:20,height:53,marginTop:18 }}
                    onClick={() => {
                          setCall(true)
                    }}

                >
                    Apply
                </Button>
}
                { call &&
                <Button 
                     variant="contained"
                    style={{ fontSize: 20, backgroundColor: 'purple',width:'30%', marginLeft:20,height:53,marginTop:18 }}
                >
                          <CircularProgress   style={{color:"#fff"}}/>

                </Button>
                }
                {
                    call &&
                    <Call  checkInText={checkInText} checkOutText={checkOutText}/>

                }

            </div>
        </div>
    )

}

