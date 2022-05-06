import { useEffect, useState } from "react";


export default function () {

    const [data, setData] = useState([])
    useEffect(
        async () => {
            const res = await fetch('../api/get_items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) { setData(await res.json()) }
            if (res.status === 500) { console.log('There is an error') }
        }, []
    )

    return <>
        {data &&
            <div >
                <ul>
                    {
                        data.map(item =>
                            <li key={item.listing.id}>
                                {item.listing.id}
                            </li>
                        )
                        }
                </ul>
            </div>

        }
    </>
}