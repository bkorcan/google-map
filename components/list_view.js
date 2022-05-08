import { useStore } from './state_map'
export default function ListView() {
    const setCallListView = useStore(state => state.setCallListView)
    // setCallListView(false)
    return (
        <>
<h1>HHHHHHH</h1>
        </>
    )
}

export { ListView }