import { Marker } from 'react-map-gl';

type MapMarkerProps = {
  lat: number;
  lon: number;
};

const MapMarker = (props: MapMarkerProps): JSX.Element | null => {
  if (!props.lat || !props.lon) {
    return null;
  }
  return <Marker latitude={props.lat} longitude={props.lon}></Marker>;
};

export default MapMarker;
