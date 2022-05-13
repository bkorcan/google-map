import { useEffect, useState } from "react";
import { useStore } from '../components/state_map'


export default function GetItems ({page}) {
    
    console.log('get items called')

const setItemsData = useStore(state => state.setItemsData)
const setCallData = useStore(state => state.setCallData)

    useEffect(
        async () => {
            const res = await fetch(`../api/get_items?t=20&d=40`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) {setItemsData(await res.json());  }
            if (res.status === 500) { console.log('There is an error') }
        }, []
    )

    return <></>
}