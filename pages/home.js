import Style from '../styles/home.module.css'
import Filter from './filter'


export default function Homepage() {
    return (
        <div className={Style.container} >
            
            {/* Filter */}
            <Filter/>
        </div>

    )
}