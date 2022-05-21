import { useEffect } from 'react';

export default function Testpagination() {
    // const list =[]
    useEffect(
        async () => {
        
                const res = await fetch(`../api/get_items?t=650&d=970`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
  
              if (res.status === 200) { 
                const list = await res.json()
                console.log(list.length)
                console.log(list)
            }
              if (res.status === 500) { console.log('There is an error') }
          }, []
      )

  return (
      <> hey </>
  )
}