import Style from '../../styles/day.module.css'
import TextField from '@mui/material/TextField';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useStore } from '../../components/state_day'
import format from 'date-fns/format';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Call } from '../../components/open_dates'
import { useEffect, useState } from 'react';




export default function Postdates() {
    const [bookedDays, setBookedDays] = useState([])
    const bookedStyle = { border: '2px solid currentColor', innerText: "hey" };

    const getDaysInMonth = (month, year) => {
        return new Array(31)
            .fill('')
            .map((v, i) =>  new Date(year, month - 1, i + 1))
            .filter(v => v.getMonth() === month - 1)
    }


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
        } else {
            setCheckOutText(format(day, 'yyyy-MM-dd'));
            setShow('none')
            setFocus(false)
            setMoveRight(false);
        }
    }
    // 
    useEffect(
        async () => {
            if (bookedDays.length) {
                let difference = [...getDaysInMonth(6, 2022),...getDaysInMonth(7, 2022),...getDaysInMonth(8, 2022),...getDaysInMonth(9, 2022),...getDaysInMonth(10, 2022),...getDaysInMonth(11, 2022),...getDaysInMonth(12, 2022) ].map(x=>format(x,'yyyy-MM-dd')).filter(x => !bookedDays.map(x=>format(x,'yyyy-MM-dd')).includes(x));
                setDisabled(difference.map(x=> new Date(x) ))
            }
        }, [bookedDays]
    )

    useEffect(
        async () => {
            let dates = []
            const res = await fetch('/api/admin/get_dates', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) {
                dates = await res.json()
                // console.log(dates[3][0]["@date"])
                // console.log(dates.map(date=> new Date(date[0]["@date"] ) ))
                setBookedDays(dates.map(date => new Date(date[0]["@date"])))

            }
            // if (res.status === 200) { setData(await res.json()) }
            if (res.status === 500) { console.log('There is an error') }
        }, [call]
    )

    // 

    return (
        <div className={Style.adminDayContainer} >


            <div className={Style.dayContainer}   >

                <TextField margin="normal" name="CheckIn" value={checkInText} autoComplete="off" label="Check In" type="text" id="check_in" style={{ width: '30%', marginRight: '5%' }}
                    onClick={() => { setDisabled(disabled); setShow('block'); }}

                />
                <TextField margin="normal" name="CheckOut" value={checkOutText} label="Check Out" type="text" id="check_out" style={{ width: '30%' }}
                    focused={focus}
                />
                {bookedDays &&
                    <div className={Style.day} style={{ left: moveRight ? 100 : 0, display: show, top: 70 }} >
                        <DayPicker
                            onDayClick={dayClicked}
                            modifiers={{ booked: bookedDays }}
                            modifiersStyles={{ booked: bookedStyle }}
                            disabled={disabled}
                        />
                    </div>
                }
                {!call &&
                    <Button
                        variant="contained"
                        style={{ fontSize: 20, backgroundColor: 'purple', width: '30%', marginLeft: 20, height: 53, marginTop: 18 }}
                        onClick={() => {

                            setCall(true)
                        }}

                    >
                        EMPTY
                    </Button>
                }
                {call &&
                    <Button
                        variant="contained"
                        style={{ fontSize: 20, backgroundColor: 'purple', width: '30%', marginLeft: 20, height: 53, marginTop: 18 }}
                    >
                        <CircularProgress style={{ color: "#fff" }} />

                    </Button>
                }
                {
                    call &&
                    <Call checkInText={checkInText} checkOutText={checkOutText} />

                }

            </div>
        </div>
    )

}

