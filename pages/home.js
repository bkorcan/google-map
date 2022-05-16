import Style from '../styles/home.module.css'
import Filter from './filter'
import Image from 'next/image'



export default function Homepage() {
    return (
        <div className={Style.container} >
            <div className={Style.side} >
                <Image
                    src="/img/left-home.jpg"
                    alt="alt"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <Filter />
            <div className={Style.side} >

                <Image
                    src="/img/right-home.jpg"
                    alt="alt"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>

    )
}