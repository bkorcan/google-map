import { useEffect, useState } from "react";
import { useStore } from '../components/state_map'


export default function GetItems () {
const setItemsData = useStore(state => state.setItemsData)
const setCallData = useStore(state => state.setCallData)

    useEffect(
        async () => {
            const res = await fetch('../api/get_items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) { setItemsData(await res.json()); }
            if (res.status === 500) { console.log('There is an error') }
        }, []
    )

    return <>
        {/* {data &&
            <div >
                <ul>
                    {
                        data.map(item =>
                            <li key={item.listing.id}>
                                {item.listing.avgRating}
                            </li>
                        )
                        }
                </ul>
            </div>

        } */}
    </>
}