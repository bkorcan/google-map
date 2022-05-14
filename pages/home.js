import Style from '../styles/home.module.css'
import Image from 'next/image'
import Filter from './filter'


export default function Homepage() {
    return (
        <div className={Style.container} >
            {/* Image */}
            <div className={Style.hor} >
                <Image
                    src="/img/bgc.jpg"
                    alt="alt"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            {/* Filter */}
            <Filter/>
        </div>

    )
}