import { Wrapper } from '@googlemaps/react-wrapper'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

const MapContainer = ({
  center,
  zoom,
  postalCode,
  setLatLng
}: {
    center: any;
    zoom: number;
    postalCode: string | undefined;
    setLatLng: Dispatch<SetStateAction<{ lat: number; lng: number; }>>;
}) => {
  const ref = useRef()
  const geocoder = new window.google.maps.Geocoder()

  let marker: any = null
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, {
      center,
      zoom
    })

    map.setOptions({ draggable: true })

    marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(center.lat, center.lng),
      map: map,
      zIndex: 10
    })

    window.google.maps.event.addListener(map, 'drag', function () {
      // @ts-ignore
      setLatLng({ lat: map?.getCenter().lat(), lng: map?.getCenter().lng() })
      marker.setPosition(map.getCenter())
    })

    if (postalCode) {
      geocoder.geocode({ address: postalCode }).then(({ results }: any) => {
        if (results[0]) {
          const latLng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
          setLatLng(latLng)
          map.setCenter(results[0].geometry.location)
          marker.setPosition(map.getCenter())
        }
      }, (e) => {
        console.error(e)
      })
    }

    return () => {}
  }, [postalCode])

  // @ts-ignore
  return <div ref={ref} id="map" className="width-auto h-96" />
}

type MapProps = {
    setLatLng: Dispatch<SetStateAction<{ lat: number; lng: number; }>>;
    lat: number | undefined;
    lng: number | undefined;
    postalCode: string | undefined;
}

const Map = ({ setLatLng, lat, lng, postalCode }: MapProps) => {
  const center = { lat: lat || 38.736946, lng: lng || -9.142685 }
  const zoom = 18

  return <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
    <MapContainer center={center} zoom={zoom} setLatLng={setLatLng} postalCode={postalCode} />
  </Wrapper>
}

export default Map
