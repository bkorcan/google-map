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
import GetItems from "./get_items";



export default function Home() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const itemsData = useStore(state => state.itemsData)
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
  const center = useMemo(() => ({ lat: 36.7538442, lng: 28.935806 }), []);
  // const zoom =useMemo(()=> (mapRef.current.zoom),[])
  const options = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: false,
  }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  // const houses = useMemo(() => generateHouses(), []);
  const [viewCenter, setViewCenter] = useState({ lat: 36.2748, lng: 29.403 })
  const [call, setCall] = useState(false)
  const callData = useStore(state => state.callData)

  const viewBoxClick = useStore(state => state.viewBoxClick)
  const markerClick = useStore(state => state.markerClick)
  const setMarkerClick = useStore(state => state.setMarkerClick)

  return (
    <> 
    <GetItems/>
    
    { itemsData &&
    <>  
      <div className={Style.mainContainer}>
     
      
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
              itemsData.map((house,key) => (
                
                <Marker
                  key={house.listing.lat}
                  position={{lat:house.listing.lat,lng:house.listing.lng}}
                  // clusterer={clusterer}
                  onClick={() => {
                    setId(key)
                    // console.log(house.id); 
                    setCall(true);
                    setMarkerClick(true)
                    const y = ((mapRef.current.getBounds().getNorthEast().lat() - mapRef.current.getBounds().getSouthWest().lat())) / screenHeight * 400
                    const x = ((mapRef.current.getBounds().getNorthEast().lng() - mapRef.current.getBounds().getSouthWest().lng())) / screenWidth * 370
                    let _lng = 0
                    let _lat = 0
                    house.listing.lng > mapRef.current.getCenter().lng() ?
                      _lng = house.listing.lng - x
                      : _lng = house.listing.lng

                    house.listing.lat < mapRef.current.getCenter().lat() ?
                      _lat = house.listing.lat + y
                      : _lat = house.listing.lat
                    setViewCenter({ lat: _lat, lng: _lng })

                  }}
                  label={house.pricingQuote.priceString}
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
    </>
 
    }
    </>
  );
}

const generateHouses = () => {
  // const spe= '\u20ba'
  // dollar sign unicode
  // [
  //   {
  //     position: {
  //       lat: items0.listing.lat,
  //       lng: items0.listing.lng
  //     },
  //     price: items0.pricingQuote.priceString,
  //     id: 0
  //   },  ]
  
  
  // return houses;
};