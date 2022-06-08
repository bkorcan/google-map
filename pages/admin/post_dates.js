import Style from '../../styles/day.module.css'
import TextField from '@mui/material/TextField';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useStore } from '../../components/state_day'
import format from 'date-fns/format';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {Call} from '../../components/post_dates'
import { useEffect, useState } from 'react';




export default function Postdates() {
  const  [footer, setFooter] =useState('')
  const [month, setMonth] = useState(("0" + (new Date().getMonth()+ 1)).slice(-2))
 
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
    const price = useStore(state => state.price)
    const setPrice = useStore(state => state.setPrice)
    const focus = useStore(state => state.focus)
    const setFocus = useStore(state => state.setFocus)
    const disabled = useStore(state => state.disabled)
    const setDisabled = useStore(state => state.setDisabled)

    const dayClicked = (day) => {
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

    const monthChange=(x)=>setMonth(("0" + (x.getMonth()+ 1)).slice(-2))


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
                console.log(month)
                dates = await res.json()
                // console.log(dates[3][0]["@date"])
                // console.log( dates.map(x=>x[1]) )
                // setFooter(dates.map(date=> date[1] ))
                // setFooter('Prices : '+dates.map(date=> date[0]["@date"].split('-')[2]+'-'+date[1]+'\n'))
               let str = dates.filter(
                    date=> date[0]["@date"].split('-')[1]==month
                    )
                    console.log(str.map(date=> date[0]["@date"].split('-')[2]+'-'+date[1]))
                setFooter(str.map(date=> date[0]["@date"].split('-')[2]+'-'+date[1]))
                // console.log(dates.map(date=> new Date(date[0]["@date"] ) ))
                setDisabled(dates.map(date=> new Date(date[0]["@date"] ) ))
            }
            // if (res.status === 200) { setData(await res.json()) }
            if (res.status === 500) { console.log('There is an error') }
        }, [call,month]
    )

    // 

    return (
        <div className={Style.adminDayContainer} >


            <div className={Style.dayContainer}   >

                <TextField margin="normal" name="CheckIn" value={checkInText} autoComplete="off" label="Check In" type="text" id="check_in" style={{ width: '25%', marginRight: '2%' }}
                    onClick={() => { setDisabled(disabled); setShow('block'); }}

                />
                <TextField margin="normal" name="CheckOut" value={checkOutText} label="Check Out" type="text" id="check_out" style={{ width: '25%' }}
                    focused={focus}
                />

                <TextField type='number' autoComplete="off" label="Price" style={{width:'20%', marginTop:15, marginLeft:15 }}
                onChange={e=>setPrice(e.target.value)}
                />

                <div className={Style.day} style={{ left: moveRight ? 100 : 0, display: show, top:70 }} >
                    <DayPicker
                        onDayClick={dayClicked}
                        disabled={disabled}
                        footer={footer}
                        onMonthChange={monthChange}
                    />
                </div>

                { !call &&
                <Button 
                     variant="contained"
                    style={{ fontSize: 20, backgroundColor: 'purple',width:'20%', marginLeft:20,height:53,marginTop:18 }}
                    onClick={() => {
                          setCall(true)
                    }}

                >
                    ADD
                </Button>
}
                { call &&
                <Button 
                     variant="contained"
                    style={{ fontSize: 20, backgroundColor: 'purple',width:'20%', marginLeft:20,height:53,marginTop:18 }}
                >
                          <CircularProgress   style={{color:"#fff"}}/>

                </Button>
                }
                {
                    call &&
                    <Call  checkInText={checkInText} checkOutText={checkOutText} price={price} />

                }

            </div>
        </div>
    )

}

