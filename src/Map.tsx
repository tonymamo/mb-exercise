import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import ReactMapGL, { AttributionControl, NavigationControl, Source } from 'react-map-gl';
import styled from 'styled-components';
import mapData from './data.json';
import MapMarker from './MapMarker';
import MapRoute from './Route';

type MapProps = {
  children?: React.ReactNode;
};

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  /* Isolation resets the stacking context for z-index, so this keeps the resizable handle from the Panel on top of the Map */
  isolation: isolate;
`;

const Map = (props: MapProps): JSX.Element => {
  const coordinates = mapData.stores
    .map((store) => `${store[1]},${store[0]}`)
    .toString()
    .replaceAll(',-', ';-');
  const { isLoading, data } = useQuery(['directions'], () =>
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${coordinates}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN}`
      )
      .then((res) => res.data)
  );

  const [viewState, setViewState] = useState({
    longitude: -74,
    latitude: 42,
    zoom: 6,
  });

  return (
    <MapWrapper>
      <ReactMapGL
        {...viewState}
        style={{
          minHeight: '100vh',
        }}
        reuseMaps
        mapStyle="mapbox://styles/tartan/ckwyaad2g03nh14mg1w3vh76t"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        attributionControl={false}
      >
        {mapData.stores.map((store) => (
          <MapMarker key={`${store[0]}${store[1]}`} lat={store[0]} lon={store[1]} />
        ))}

        {!isLoading && data && (
          <Source
            type="geojson"
            id="source"
            data={{
              type: 'FeatureCollection',
              features: data.waypoints.map(
                (waypoints: { location: [number, number] }, index: number) => ({
                  properties: {},
                  id: index,
                  geometry: {
                    type: 'LineString',
                    coordinates: [waypoints.location[1], waypoints.location[0]],
                  },
                  type: 'Feature',
                })
              ),
            }}
          >
            <MapRoute />
          </Source>
        )}

        <NavigationControl style={{ top: 10, left: 10 }} />
        <AttributionControl compact={true} style={{ bottom: 0, right: 0 }} />
      </ReactMapGL>
    </MapWrapper>
  );
};

export default Map;
