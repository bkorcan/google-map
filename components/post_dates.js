import {  useEffect } from 'react';
import {useStore}  from './state_day'


function Call({checkInText, checkOutText, price, villa}){

    const setCall = useStore(state => state.setCall)
    // console.log(villa)
    
    useEffect(
        async () => {

            const res = await fetch('/api/admin/post_dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci:checkInText,co:checkOutText, pr:price, v:villa })
            })
            setCall(false)
            console.log(res.status)

        }, []
    )
    return <>  </>

}
export {Call}