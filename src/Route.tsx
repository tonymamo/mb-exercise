import { Expression } from 'mapbox-gl';
import { Layer } from 'react-map-gl';

type MapRouteProps = {};

const MapRoute = (props: MapRouteProps): JSX.Element | null => {
  return (
    <Layer
      id="source"
      source="source"
      type="line"
      layout={{ 'line-join': 'round', 'line-cap': 'round' }}
      paint={{
        'line-color': 'red',
        // line-width and line-offset below use Expressions to change based on zoom level as documented here
        // https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#camera-expressions
        'line-width': [
          'interpolate',
          ['linear'],
          ['zoom'],
          5, // when zoom is 5 (or less)
          2, // -> line width will be 1px
          13, // when zoom is 13 (or greater)
          8, // -> line width will be 10px
        ] as Expression, // need to explicitly tell Mapbox that this is an expression ¯\_(ツ)_/¯
        'line-opacity': 0.5,
        'line-offset': ['interpolate', ['linear'], ['zoom'], 5, -1, 13, -8] as Expression,
      }}
    />
  );
};

export default MapRoute;
