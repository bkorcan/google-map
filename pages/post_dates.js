import { useStore } from "../components/state-post-dates";
import Style from '../styles/post-dates.module.css'
import { useRef, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';



export default function PostDates() {

    console.log('rendered')

    const node1 = useRef()
    const node2 = useRef()

    const call = useStore(state => state.call)
    const setCall = useStore(state => state.setCall)
    const id = useStore(state => state.id)
    const setId = useStore(state => state.setId)
    const price = useStore(state => state.price)
    const setPrice = useStore(state => state.setPrice)
    const status = useStore(state => state.status)
    const setStatus = useStore(state => state.setStatus)


    function Call() {

        useEffect(
            async () => {

                const res = await fetch('/api/post-villa/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id, name: 'villa-' + id, price: price })
                })
                setCall(false)
                console.log(res.statusText)
                setStatus(res.statusText)

            }, []
        )
        return (<div className={Style.progress} ><CircularProgress style={{ width: 25, height: 25, color: 'white' }} /> </div>)
    }


    const submited = () => {
        setCall(true)
        setId(node1.current.value)
        setPrice(node2.current.value)
    }

    return (
        <>

            <div className={Style.container} >


                <div className={Style.inputContainer} >

                    <div className={Style.inputContainer} >
                        <input type='text' className={Style.input} placeholder='Villa Id' ref={node1} />
                    </div>

                </div>

                <div className={Style.inputContainer} >

                    <div className={Style.inputContainer} >
                        <input type='text' className={Style.input} placeholder='Price' ref={node2} />
                    </div>

                </div>

                {call ? <Call /> : <div className={Style.submit} onClick={submited} >Submit</div>}

            </div>
            {status !== '' ? <div className={Style.error} > {status} </div> : null}

        </>

    )
}
