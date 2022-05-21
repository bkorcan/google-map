import {
    useMemo, useRef, useCallback, useState, useEffect
  } from "react";
  import {
    GoogleMap, useLoadScript, Marker, MarkerClusterer, OverlayView
  } from "@react-google-maps/api";
  import { Stepper } from "../components/stepper";
  import { useStore } from '../components/state_map'
  import Style from '../styles/map.module.css'
  import Pagination from '@mui/material/Pagination';
  import Stack from '@mui/material/Stack';
  import { useRouter } from "next/router"

  
  export default function MapHome() {

    const router =useRouter()
    const {t, ci, co, g, minp, maxp } = router.query
    console.log(t)
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
    const setItemsData = useStore(state => state.setItemsData)
    
    const [page, setPage] = useState(1);
    const pageChange = (event, value) => {
      setPage(value);
      
    };
  
  
    // ////////////////////////////////////////////////////////
    const ListView = useMemo(() => list(itemsData), [itemsData])
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
        mapRef.current.addListener("zoom_changed", () => { 
          // console.log('zoom changed');
         setCall(false) })
  
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
  
    const [viewCenter, setViewCenter] = useState({ lat: 36.2748, lng: 29.403 })
    const [call, setCall] = useState(false)
    const viewBoxClick = useStore(state => state.viewBoxClick)
    const markerClick = useStore(state => state.markerClick)
    const setMarkerClick = useStore(state => state.setMarkerClick)
  
  
  //Pagination And Get Data
  const [countPage, setCountPage ] = useState(1)

      useEffect(
        async () => {
          let drop = 0
            if(page!==5) drop = 10*(page-1)
            if(page===5) drop = 0
                const res = await fetch(`../api/get_items?t=10&d=${drop}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
  
              if (res.status === 200) { setItemsData(await res.json());  }
              if (res.status === 500) { console.log('There is an error') }
          }, [page]
      )
  /////////////////////////////////////////////////////////////////////
    return (
  
      <div>
  
        {itemsData &&
          <div className={Style.mainContainer}>
  
            <div className={Style.card} >
              {ListView}
              <Stack spacing={2} style={{ marginTop: 40 }} >
  
                <Pagination count={10} color="primary" size='large' onChange={pageChange} />
  
              </Stack>         
            </div>
  
            <div ref={node} className={Style.mapContainer} >
  
  
              <GoogleMap zoom={15} center={center} mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                onClick={() => {
                  // console.log(viewBoxClick)
                  // console.log(markerClick)
                  viewBoxClick && markerClick ? null : setCall(false)
                  // console.log(mapRef.current.zoom)
                }}
              >
                <MarkerClusterer>
                  {() =>
                    itemsData.map((house, key) => (
  
                      <Marker
                        key={house.listing.lat}
                        position={{ lat: house.listing.lat, lng: house.listing.lng }}
                        onClick={() => {
                          setId(key)
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
                    <Stepper id={id} itemsData={itemsData}/>
                  </OverlayView>
                  : <>  </>
                }
  
              </GoogleMap>
            </div>
          </div>
        }
      </div>
    );
  }
  
  
  const list = itemsData => <div>{itemsData.map((_, key) => <Stepper key={key} id={key} itemsData={itemsData} />)}</div>
  