import { useEffect } from 'react';
import { useStore } from './state_day'
import { useState } from 'react';

function Call({ checkInText, checkOutText }) {

    const setCall = useStore(state => state.setCall)
   const [prc, setPrc] = useState([])


    useEffect(
        async () => {
            let dates = []
            const getDates = await fetch('/api/admin/get_dates', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (getDates.status === 200) {
                dates = await getDates.json()

                 let str =  dates.filter(
                        date => date[0]["@date"] >= checkInText && date[0]["@date"]<= checkOutText
                    )
                   setPrc(str.map(x=>x[1]))
            }

            const res = await fetch('/api/admin/open_dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci: checkInText, co: checkOutText, prc:prc })
            })
            setCall(false)
            console.log(res.status)

        }, [prc]
    )
    return <>  </>

}
export { Call }