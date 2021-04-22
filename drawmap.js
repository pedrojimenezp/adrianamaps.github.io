function drawmap({ domElement, center, positions, options }) {
  let map;
  map = new google.maps.Map(document.getElementById(domElement), {
    zoom: 13,
    center,
  });

  map.set('styles', [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ]);

  for (let i in positions) {
    const [lat, lng, title] = positions[i];
    const position = {
      lat,
      lng,
    };

    const markerOptions = {
      position,
      map,
      title,
      animation: google.maps.Animation.DROP,
    };

    if (options.complexInfoWindow) {
      markerOptions.icon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: i < 3 ? 12 : 8,
        strokeColor: i < 3 ? 'crimson' : 'steelblue',
      };
    }

    const marker = new google.maps.Marker(markerOptions);

    marker.addListener('click', () => {
      if (options.complexInfoWindow) {
        handleMarkerClickComplex(positions, i, marker, map);
      } else {
        handleMarkerClickSimple(positions, i, marker, map);
      }
    });
  }
}

function handleMarkerClickSimple(positions, index, marker, map) {
  const [lat, lng, name, accidentes] = positions[index];
  const infowindow = new google.maps.InfoWindow({
    content: `
      <p><strong>${name}</strong></p>
      <p><strong>Numero de accidentes viales:</strong>: ${accidentes}</p>
      `,
  });
  infowindow.open(map, marker);
}

function handleMarkerClickComplex(positions, index, marker, map) {
  const [
    lat,
    lng,
    name,
    danios,
    heridos,
    muertos,
    lesionados,
    muertos12,
    total,
  ] = positions[index];
  const infowindow = new google.maps.InfoWindow({
    content: `
        <p><strong>${name}</strong></p>
        <p><strong>Danios</strong>: ${danios}</p>
        <p><strong>Heridos</strong>: ${heridos}</p>
        <p><strong>Muertos</strong>: ${muertos}</p>
        <p><strong>Lesionados X 1.5</strong>: ${lesionados}</p>
        <p><strong>Muertos X 12</strong>: ${muertos12}</p>
        <p><strong>Total</strong>: ${total}</p>
        `,
  });
  infowindow.open(map, marker);
}
