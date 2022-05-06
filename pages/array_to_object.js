import res from "../components/data.json";
const baseItem = res.data.presentation.explore.sections.sections[2].section.child.section.items
const _data = []
let obj = {}
baseItem.map((item, key) => _data.push(`{"id":${key}, "lat":${item.listing.lat},"lng":${item.listing.lng}, "amount":${JSON.stringify(item.pricingQuote.priceString)} }`))
_data.map( (item,key)=> obj[key]= JSON.parse(item))


//  let obj = JSON.parse(_data[4]).lat
console.log(obj)
console.log(obj[0].lat)

export default function Home() {


    return (
        <>

        </>
    )
}