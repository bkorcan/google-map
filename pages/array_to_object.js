import res from "../components/data.json";
const baseURL = res.data.presentation.explore.sections.sections[2].section.child.section.items
const _data = []
let obj = {}
baseURL.map((item, key) => _data.push(`{"id":${key}, "lat":${item.listing.lat},"lng":${item.listing.lng}, "amount":${JSON.stringify(item.pricingQuote.priceString)} }`))
_data.map( (item,key)=> obj[key]= JSON.parse(item))

console.log(obj)
console.log(obj[1].amount)

export default function Home() {return <>  </>}