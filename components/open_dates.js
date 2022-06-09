import { useEffect } from 'react';
import { useStore } from './state_day'


function Call({ checkInText, checkOutText }) {

    const setCall = useStore(state => state.setCall)


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

                console.log(
                    dates.filter(
                        date => date[0]["@date"] >= checkInText && date[0]["@date"]<= checkOutText
                    )
                )
            }

            const res = await fetch('/api/admin/open_dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ci: checkInText, co: checkOutText })
            })
            setCall(false)
            console.log(res.status)

        }, []
    )
    return <>  </>

}
export { Call }