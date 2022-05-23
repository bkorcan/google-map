import { useEffect, useState } from 'react';

export default function Testpagination() {
    const [itemsData, setItemsData] = useState([])
    useEffect(
        async () => {

            const res = await fetch(`../api/get_items?min=700&max=970&p=7`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) {
                setItemsData(await res.json())
                // console.log(await res.json())
            }
            if (res.status === 500) { console.log('There is an error') }
        }, []
    )

    return (
        <>
        { itemsData &&
        <ul>
             {
                 itemsData.map((x, key)=> <li key={key}> {x.listing.personCapacity }, {x.pricingQuote.rate.amount}  </li>  )
             }
             </ul>
            } 
        </>
    )
}