import { res } from "../components/data"

export default function Home() {

  const items =res[0].niobeMinimalClientData[0][1].data.presentation.explore.sections.sections[3].section.child.section.items[8];
  const listing =res[0].niobeMinimalClientData[0][1].data.presentation.explore.sections.sections[3].section.child.section.items[1].listing;
  const home_details =res[0].niobeMinimalClientData[0][1].data.presentation.explore.sections.sections[3].section.child.section.items[2].listing.homeDetails;
  
  // console.log(items.length)
  // console.log(items[19].listing.contextualPictures.map(x=>x.picture))
  // console.log(items[0].pricingQuote.priceString)
  console.log(items.listing)
  // console.log(
  //   ` pictures: ${items[1].listing.contextualPictures.map(x=>x.picture)} id:${items[1].listing.id}  ,rating:${items[1].listing.avgRating}, price:${items[1].pricingQuote.priceString}, lat:${items[1].listing.lat}, lng:${items[1].listing.lng}, 
  //   name: ${items[1].listing.name.substring(0,15)}..., type: ${items[1].listing.roomTypeCategory} `
    // )

    console.log(`rating:${items.listing.avgRating}`)
    console.log(`roomType:${items.listing.roomTypeCategory}`)
    

  
  
   return (
    <div>
      hey
    </div>
  )
}