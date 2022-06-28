import Style from '../../styles/day.module.css'
import TextField from '@mui/material/TextField';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useStore } from '../../components/state_day'
import format from 'date-fns/format';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Call } from '../../components/post_dates'
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function Postdates() {
    const [villa, setVilla] = useState('330122336051136075');

    const handleChange = (event) => {
        setVilla(event.target.value);
    };
    const [amount, setAmount] = useState([])
    const [month, setMonth] = useState(("0" + (new Date().getMonth() + 1)).slice(-2))

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

    const monthChange = (x) => setMonth(("0" + (x.getMonth() + 1)).slice(-2))


    useEffect(
        async () => {
            let dates = []
            const res = await fetch(`/api/admin/get_dates?v=${villa}`, {
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
                    date => date[0]["@date"].split('-')[1] == month
                )
                console.log(str.map(date => date[0]["@date"].split('-')[2] + '-' + date[1]))
                setAmount((str.map(date => date[0]["@date"].split('-')[2] + '-' + date[1])))
                // console.log(dates.map(date=> new Date(date[0]["@date"] ) ))
                setDisabled(dates.map(date => new Date(date[0]["@date"])))
            }
            // if (res.status === 200) { setData(await res.json()) }
            if (res.status === 500) { console.log('There is an error') }
        }, [call, month,villa]
    )

    // 

    return (
        <>
            <FormControl style={{ width: 200, marginTop: 100, marginLeft: 'calc( 100% / 2 - 80px )', marginBottom: 40 }}>
                <InputLabel id="demo-simple-select-label">Villa</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={villa}
                    label="Villa"
                    onChange={handleChange}
                >
                    <MenuItem value={"330122336051136075"}>Villa-1</MenuItem>
                    <MenuItem value={"330286435761390156"}>Villa-2</MenuItem>
                    <MenuItem value={"330286436829889100"}>Villa-3</MenuItem>
                    <MenuItem value={"330286436829890124"}>Villa-4</MenuItem>
                    <MenuItem value={"330286437017584204"}>Villa-5</MenuItem>
                    <MenuItem value={"330286437017585228"}>Villa-6</MenuItem>
                    <MenuItem value={"330286437057430092"}>Villa-7</MenuItem>
                    <MenuItem value={"330286437057431116"}>Villa-8</MenuItem>
                    <MenuItem value={"330286437062672972"}>Villa-9</MenuItem>
                    <MenuItem value={"330286437062673996"}>Villa-10</MenuItem>
                    <MenuItem value={"330286437075256905"}>Villa-11</MenuItem>
                    <MenuItem value={"330286437076304457"}>Villa-12</MenuItem>
                    <MenuItem value={"330286437078401611"}>Villa-13</MenuItem>
                    <MenuItem value={"330286437078402635"}>Villa-14</MenuItem>
                    <MenuItem value={"330286437078403659"}>Villa-15</MenuItem>
                    <MenuItem value={"330286437078404683"}>Villa-16</MenuItem>
                    <MenuItem value={"330286437878465099"}>Villa-17</MenuItem>
                    <MenuItem value={"330286437878465100"}>Villa-18</MenuItem>
                    <MenuItem value={"330286437881610828"}>Villa-19</MenuItem>
                    <MenuItem value={"330286437885805129"}>Villa-20</MenuItem>
                    <MenuItem value={"330286437889999435"}>Villa-21</MenuItem>
                    <MenuItem value={"330286447620784715"}>Villa-22</MenuItem>
                    <MenuItem value={"330286448696623691"}>Villa-23</MenuItem>
                    <MenuItem value={"330286448696624715"}>Villa-24</MenuItem>
                    <MenuItem value={"330286448879075915"}>Villa-25</MenuItem>
                    <MenuItem value={"330286448879076939"}>Villa-26</MenuItem>
                    <MenuItem value={"330286448944087625"}>Villa-27</MenuItem>
                    <MenuItem value={"330286448944088649"}>Villa-28</MenuItem>
                    <MenuItem value={"330286448944089673"}>Villa-29</MenuItem>
                    <MenuItem value={"330286448944090697"}>Villa-30</MenuItem>
                    <MenuItem value={"330286448947233355"}>Villa-31</MenuItem>
                    <MenuItem value={"330286448947234379"}>Villa-32</MenuItem>
                    <MenuItem value={"330286448948281931"}>Villa-33</MenuItem>
                    <MenuItem value={"330286448948282955"}>Villa-34</MenuItem>
                    <MenuItem value={"330286448954573387"}>Villa-35</MenuItem>
                    <MenuItem value={"330286448954574411"}>Villa-36</MenuItem>
                    <MenuItem value={"330286449742053963"}>Villa-37</MenuItem>
                    <MenuItem value={"330286449743102539"}>Villa-38</MenuItem>
                    <MenuItem value={"330286449747296843"}>Villa-39</MenuItem>
                    <MenuItem value={"330286449749393993"}>Villa-40</MenuItem>
                    <MenuItem value={"330286449750442569"}>Villa-41</MenuItem>
                    <MenuItem value={"330286458993640009"}>Villa-42</MenuItem>
                    <MenuItem value={"330286460062138953"}>Villa-43</MenuItem>
                    <MenuItem value={"330286460062139977"}>Villa-44</MenuItem>
                    <MenuItem value={"330286460244591177"}>Villa-45</MenuItem>
                    <MenuItem value={"330286460245639753"}>Villa-46</MenuItem>
                    <MenuItem value={"330286460297019980"}>Villa-47</MenuItem>
                    <MenuItem value={"330286460297021004"}>Villa-48</MenuItem>
                    <MenuItem value={"330286460299117132"}>Villa-49</MenuItem>
                    <MenuItem value={"330286460299118156"}>Villa-50</MenuItem>
                </Select>
            </FormControl>
            <div className={Style.adminDayContainer} >
                <div className={Style.dayContainer}   >
                    <TextField margin="normal" name="CheckIn" value={checkInText} autoComplete="off" label="Check In" type="text" id="check_in" style={{ width: '25%', marginRight: '2%' }}
                        onClick={() => { setDisabled(disabled); setShow('block'); }}

                    />
                    <TextField margin="normal" name="CheckOut" value={checkOutText} label="Check Out" type="text" id="check_out" style={{ width: '25%' }}
                        focused={focus}
                    />

                    <TextField type='number' autoComplete="off" label="Price" style={{ width: '20%', marginTop: 15, marginLeft: 15 }}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <div className={Style.day} style={{ left: moveRight ? 100 : 0, display: show, top: 70 }} >
                        <DayPicker
                            onDayClick={dayClicked}
                            disabled={disabled}
                            // footer={footer}
                            onMonthChange={monthChange}
                        />
                        <div style={{ maxWidth: 300 }}>{amount.map(x => <li style={{ display: 'inline-block' }}> {x} , </li>)}</div>
                    </div>

                    {!call &&
                        <Button
                            variant="contained"
                            style={{ fontSize: 20, backgroundColor: 'purple', width: '20%', marginLeft: 20, height: 53, marginTop: 18 }}
                            onClick={() => {
                                setCall(true)
                            }}

                        >
                            ADD
                        </Button>
                    }
                    {call &&
                        <Button
                            variant="contained"
                            style={{ fontSize: 20, backgroundColor: 'purple', width: '20%', marginLeft: 20, height: 53, marginTop: 18 }}
                        >
                            <CircularProgress style={{ color: "#fff" }} />

                        </Button>
                    }
                    {
                        call &&
                        <Call checkInText={checkInText} checkOutText={checkOutText} price={price} villa={villa} />

                    }

                </div>
            </div>
        </>
    )

}

