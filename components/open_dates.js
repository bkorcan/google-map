import { useEffect } from 'react';
import { useStore } from './state_day'

function Call({ checkInText, checkOutText, prices }) {

    const setCall = useStore(state => state.setCall)
   
    useEffect(
        async () => {
            const res = await fetch('/api/admin/open_dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci: checkInText, co: checkOutText,
                     prc:prices 
                    })
            })
            setCall(false)
            console.log(res.status)

        }, []
    )
    return <>  </>

}
export { Call }