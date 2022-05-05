import {
  useMemo, useRef, useCallback, useState, useEffect
} from "react";
import {
  GoogleMap, useLoadScript, Marker, MarkerClusterer, OverlayView
} from "@react-google-maps/api";
import res from "../components/data.json";
import { Stepper } from "../components/stepper";
import { useStore } from '../components/state_map'
import Style from '../styles/map.module.css'
import Divider from '@mui/material/Divider';



export default function Home() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [id, setId] = useState(0)
  // ////////////////////////////////////////////////////////
  const node = useRef()
  useEffect(
    () => {
      document.addEventListener("mousedown", getDimensions);
      return () => {
        document.removeEventListener("mousedown", getDimensions);
      };
    }, []);

  const getDimensions = useCallback(
    (e) => {
      setScreenWidth(node.current.clientWidth)
      setScreenHeight(node.current.clientHeight)
      mapRef.current.addListener("zoom_changed", () => { console.log('zoom changed'); setCall(false) })

      // if( node.current.contains(e.target) ) console.log('hey')
      return;
    }, []
  );
  //////////////////////////////////////////////////////////////


  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 36.200, lng: 29.645 }), []);
  // const zoom =useMemo(()=> (mapRef.current.zoom),[])
  const options = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: false,
  }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(), []);
  const [viewCenter, setViewCenter] = useState({ lat: 36.2748, lng: 29.403 })
  const [call, setCall] = useState(false)

  const viewBoxClick = useStore(state => state.viewBoxClick)
  const markerClick = useStore(state => state.markerClick)
  const setMarkerClick = useStore(state => state.setMarkerClick)

  return (
    <div className={Style.mainContainer}>
      <div className={Style.card}>
        <div className={Style.cardTitle} >
          <h2 style={{ color: '#666' }} >Kalkan Villas</h2>
        </div>
        <div style={{ height: 10, backgroundColor: '#fff' }} ></div>

        <Stepper id={1} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={2} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={3} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={4} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={5} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={6} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={7} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={8} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={9} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={10} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={11} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={12} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={13} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={14} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={15} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={16} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={17} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={18} />
        <Divider style={{ height: 20, marginBottom: 30 }} />
        <div style={{ height: 2, backgroundColor: '#666', marginBottom: 10 }}></div>
        <Stepper id={19} />

      </div>
      <div ref={node} className={Style.mapContainer} >

        <GoogleMap zoom={15} center={center} mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          onClick={() => {
            console.log(viewBoxClick)
            console.log(markerClick)
            viewBoxClick && markerClick ? null : setCall(false)
            // console.log(mapRef.current.zoom)
          }}
        >
          <MarkerClusterer>
            {() =>
              houses.map((house) => (
                <Marker
                  key={house.position.lat}
                  position={house.position}
                  // clusterer={clusterer}
                  onClick={() => {
                    setId(house.id)
                    // console.log(house.id); 
                    setCall(true);
                    setMarkerClick(true)
                    const y = ((mapRef.current.getBounds().getNorthEast().lat() - mapRef.current.getBounds().getSouthWest().lat())) / screenHeight * 400
                    const x = ((mapRef.current.getBounds().getNorthEast().lng() - mapRef.current.getBounds().getSouthWest().lng())) / screenWidth * 370
                    let _lng = 0
                    let _lat = 0
                    house.position.lng > mapRef.current.getCenter().lng() ?
                      _lng = house.position.lng - x
                      : _lng = house.position.lng

                    house.position.lat < mapRef.current.getCenter().lat() ?
                      _lat = house.position.lat + y
                      : _lat = house.position.lat
                    setViewCenter({ lat: _lat, lng: _lng })

                  }}
                  label={house.price}
                  icon={{
                    path:
                      "M-9,-5 l18,0 l0,9 l-18,0 l0,-9",
                    fillColor: "white",
                    fillOpacity: 1,
                    scale: 3,
                    strokeColor: "red",
                    strokeWeight: 1.5,
                  }}
                />
              ))
            }
          </MarkerClusterer>
          {call ?
            <OverlayView
              position={viewCenter}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <Stepper id={id} />
            </OverlayView>
            : <>  </>
          }

        </GoogleMap>
      </div>
    </div>
  );
}

const generateHouses = () => {
  // const spe= '\u20ba'
  // dollar sign unicode

  const items0 = res.data.presentation.explore.sections.sections[2].section.child.section.items[0];
  const items1 = res.data.presentation.explore.sections.sections[2].section.child.section.items[1];
  const items2 = res.data.presentation.explore.sections.sections[2].section.child.section.items[2];
  const items3 = res.data.presentation.explore.sections.sections[2].section.child.section.items[3];
  const items4 = res.data.presentation.explore.sections.sections[2].section.child.section.items[4];
  const items5 = res.data.presentation.explore.sections.sections[2].section.child.section.items[5];
  const items6 = res.data.presentation.explore.sections.sections[2].section.child.section.items[6];
  const items7 = res.data.presentation.explore.sections.sections[2].section.child.section.items[7];
  const items8 = res.data.presentation.explore.sections.sections[2].section.child.section.items[8];
  const items9 = res.data.presentation.explore.sections.sections[2].section.child.section.items[9];
  const items10 = res.data.presentation.explore.sections.sections[2].section.child.section.items[10];
  const items11 = res.data.presentation.explore.sections.sections[2].section.child.section.items[11];
  const items12 = res.data.presentation.explore.sections.sections[2].section.child.section.items[12];
  const items13 = res.data.presentation.explore.sections.sections[2].section.child.section.items[13];
  const items14 = res.data.presentation.explore.sections.sections[2].section.child.section.items[14];
  const items15 = res.data.presentation.explore.sections.sections[2].section.child.section.items[15];
  const items16 = res.data.presentation.explore.sections.sections[2].section.child.section.items[16];
  const items17 = res.data.presentation.explore.sections.sections[2].section.child.section.items[17];
  const items18 = res.data.presentation.explore.sections.sections[2].section.child.section.items[18];
  const items19 = res.data.presentation.explore.sections.sections[2].section.child.section.items[19];
  const spe = '\u0024'

  const _houses = [
    {
      position: {
        lat: items0.listing.lat,
        lng: items0.listing.lng
      },
      price: `${items0.pricingQuote.priceString}`,
      id: 0
    },
    {
      position: {
        lat: items1.listing.lat,
        lng: items1.listing.lng
      },
      price: `${items1.pricingQuote.priceString}`,
      id: 1
    },
    {
      position: {
        lat: items2.listing.lat,
        lng: items2.listing.lng
      },
      price: `${items2.pricingQuote.priceString}`,
      id: 2
    },
    {
      position: {
        lat: items3.listing.lat,
        lng: items3.listing.lng
      },
      price: `${items3.pricingQuote.priceString}`,
      id: 3
    },
    {
      position: {
        lat: items4.listing.lat,
        lng: items4.listing.lng
      },
      price: `${items4.pricingQuote.priceString}`,
      id: 4
    },
    {
      position: {
        lat: items5.listing.lat,
        lng: items5.listing.lng
      },
      price: `${items5.pricingQuote.priceString}`,
      id: 5
    },
    {
      position: {
        lat: items6.listing.lat,
        lng: items6.listing.lng
      },
      price: `${items6.pricingQuote.priceString}`,
      id: 6
    },
    {
      position: {
        lat: items7.listing.lat,
        lng: items7.listing.lng
      },
      price: `${items7.pricingQuote.priceString}`,
      id: 7
    },
    {
      position: {
        lat: items8.listing.lat,
        lng: items8.listing.lng
      },
      price: `${items8.pricingQuote.priceString}`,
      id: 8
    },
    {
      position: {
        lat: items9.listing.lat,
        lng: items9.listing.lng
      },
      price: `${items9.pricingQuote.priceString}`,
      id: 9
    },
    {
      position: {
        lat: items10.listing.lat,
        lng: items10.listing.lng
      },
      price: `${items10.pricingQuote.priceString}`,
      id: 10
    },
    {
      position: {
        lat: items11.listing.lat,
        lng: items11.listing.lng
      },
      price: `${items11.pricingQuote.priceString}`,
      id: 11
    },
    {
      position: {
        lat: items12.listing.lat,
        lng: items12.listing.lng
      },
      price: `${items12.pricingQuote.priceString}`,
      id: 12
    },
    {
      position: {
        lat: items13.listing.lat,
        lng: items13.listing.lng
      },
      price: `${items13.pricingQuote.priceString}`,
      id: 13
    },
    {
      position: {
        lat: items14.listing.lat,
        lng: items14.listing.lng
      },
      price: `${items14.pricingQuote.priceString}`,
      id: 14
    },
    {
      position: {
        lat: items15.listing.lat,
        lng: items15.listing.lng
      },
      price: `${items15.pricingQuote.priceString}`,
      id: 15
    },
    {
      position: {
        lat: items16.listing.lat,
        lng: items16.listing.lng
      },
      price: `${items16.pricingQuote.priceString}`,
      id: 16
    },
    {
      position: {
        lat: items17.listing.lat,
        lng: items17.listing.lng
      },
      price: `${items17.pricingQuote.priceString}`,
      id: 17
    },
    {
      position: {
        lat: items18.listing.lat,
        lng: items18.listing.lng
      },
      price: `${items18.pricingQuote.priceString}`,
      id: 18
    },
    {
      position: {
        lat: items19.listing.lat,
        lng: items19.listing.lng
      },
      price: `${items19.pricingQuote.priceString}`,
      id: 19
    },


  ]

  return _houses;
};
