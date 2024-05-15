import React, { useEffect, useState } from 'react';
// import useStyle from './styles'
import GoogleMapReact from 'google-map-react';
import {Paper , Typography, useMediaQuery} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import {Rating} from '@mui/material'




const Map = ({ lat, lon, setCoords, coords, places, selectedType, manualPlace}) => {
    // const classes = useStyle();
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    // console.log("apiapiapi:", apiKey)
    const isMobile = useMediaQuery('(min-width: 600px)');
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    console.log("map page maual data::",manualPlace);
    // const matches = useMediaQuery('(min-width:600px)');
    // const coordinates = {lat: 0, lon: 0};
    const defaultProps = {
        center: {
          lat: lat,
          lng: lon
        },
        zoom: 11
    };

    const getSeasonMonths = (season) => {
        const seasons = {
            Spring: [3, 4, 5],
            Summer: [6, 7, 8],
            Fall: [9, 10, 11],
            Winter: [12, 1, 2],
            Clear: []
        };
        return seasons[season] || [];
    };

    const getSeasonColor = (season) => {
        const seasons = {
            Spring: "#00c4a9",
            Summer: "#7fffd4",
            Fall: "#d6c6a4",
            Winter: "#0000FF"
        };
        return seasons[season] || [];
    };

    useEffect(() => {
        console.log("Latitude+:", lat, "Longitude+:", lon);
    }, [lat, lon]);


    useEffect(() => {
        console.log("Received selectedType in Map:", selectedType); // Logs the type received from parent
    }, [selectedType]);


    useEffect(() => {
        if (map && maps) {  // Ensure map objects are defined
            // clearMarkers();  // First, clear existing markers
            loadMarkers();   // Then, load new markers based on the updated type
        }
    }, [selectedType, map, maps]);

    useEffect(() => {
        if (map && maps) {
            loadManualMarkers();  
            // Load manual markers when the map and maps objects are ready and data changes
        }
    }, [map, maps, manualPlace]);

    const clearMarkers = () => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    };

    const loadMarkers = () => {
        clearMarkers();
        const seasonMonths = getSeasonMonths(selectedType); // Get relevant months for the selected type
        const seasonColor = getSeasonColor(selectedType);
    
        const newMarkers = places.filter(point => {
            const pointMonth = parseInt(point.month);
            return seasonMonths.includes(pointMonth);
        }).map(point => {
            const marker = new maps.Marker({
                position: { lat: point.lat, lng: point.lon },
                map: map,
                icon: {
                    path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 3,
                    fillColor: seasonColor,
                    fillOpacity: 0.7,
                    strokeWeight: 0.4
                },
                title: point.label
            });
            return marker;
        });
    
        setMarkers(newMarkers);  // Store the new markers array
    };

    const loadManualMarkers = () => {
        if (!map || !maps || !manualPlace || manualPlace.length === 0) {
            // Ensure that all necessary objects and data are available and valid
            console.log("Skipping loading of manual markers: necessary data or objects not available.");
            return;  // Exit the function if any condition fails
        }
        clearMarkers();  // Optionally clear existing markers first if needed
    
        const manualMarkers = manualPlace.map(point => {
            // return new maps.Marker({
            const marker = new maps.Marker({
                position: { lat: point.lat, lng: point.lon },
                map: map,
                icon: {
                    path: maps.SymbolPath.CIRCLE,
                    scale: 2,
                    fillColor: "#ffd966",
                    fillOpacity: 1,
                    strokeWeight: 0.2
                },
                title: point.label
            });

            const infoWindow = new maps.InfoWindow({
                content: `<div style='color: black;'>${point.label} at ${point.time}</div>`
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
                setTimeout(() => infoWindow.close(), 1000);  // Close the info window after 1 second
            });

            return marker;

        });
        setMarkers(manualMarkers);
        // setMarkers(prevMarkers => [...prevMarkers, ...manualMarkers]); // Combine with existing markers if needed
    };



    const handleApiLoaded = ({ map, maps }) => {
        // Create a marker and set its position
        new maps.Marker({
            position: { lat: lat, lng: lon },
            // position: coords,
            map: map,
            title: 'Your Location'
        });
        setMap(map);
        setMaps(maps);
        loadMarkers();
        handleApiLoaded_2({ map, maps });
        handleApiLoaded_3({ map, maps });
        loadManualMarkers();
    };

    const handleApiLoaded_2 = ({ map, maps }) => {
        // Iterate over all data points and create a marker for each
        places.forEach(point => {
            // new maps.Marker({
            const marker = new maps.Marker({
                position: { lat: point.lat, lng: point.lon },
                map: map,
                icon: { // Custom icon definition
                    path: maps.SymbolPath.CIRCLE,
                    scale: 4, // Size of the marker
                    fillColor: "#D00",
                    fillOpacity: 1,
                    strokeWeight: 0.4
                },
                title: point.label
            });
            // Create an InfoWindow
            const infoWindow = new maps.InfoWindow({
                content: `<div style='color: black;'>${point.label}</div>` 
                // Ensure content is properly escaped if dynamically generated
            });

            // Add a click listener to the marker
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    };

    const handleApiLoaded_3 = ({ map, maps }) => {
        const seasonMonths = getSeasonMonths(selectedType); // Get months for the selected season
        // const seasonMonths = getSeasonMonths('Fall');
    
        places.forEach(point => {
            // const pointMonth = parseInt(point.Month.split('-')[1], 10); // Extract month number from data
            const pointMonth = (point.month);
            console.log("Processing point with month:", point.month);
    
            // Check if the month of the current point is within the season's months
            if (seasonMonths.includes(pointMonth)) {
                new maps.Marker({
                    position: { lat: point.lat, lng: point.lon },
                    map: map,
                    icon: {
                        path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        scale: 2,
                        fillColor: "#0000FF",
                        fillOpacity: 0.7,
                        strokeWeight: 0.4
                    },
                    title: point.label
                });
            } else {
                console.log("Skipped marker for month:", pointMonth);
            }
        });
    };

    

    const dataPoints = [
        { lat: 40.0443472, lon: -75.1069231, label: "New York" },
        { lat: 40.0113462, lon: -75.2889231, label: "Los Angeles" },
        { lat: 40.0283452, lon: -75.2469231, label: "Chicago" }
        // More points...
    ];

    





    return(
        // <h1 style={{color:'white'}}>Map</h1>
        <div style={{ height: '90vh', width: '210%' }}>
        {/* // <div style={{ height: '85vh', width: '100%' }}> */}
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                // center={defaultProps.center}
                // defaultCenter={defaultProps.center}
                // defaultZoom={defaultProps.zoom}
                defaultCenter={coords}
                center={coords}
                defaultZoom={11}
                margin={[50, 50, 50, 50]}
                onChange={(e)=>{
                    console.log(e)
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                    console.log(coords);
                }}

                onError={(error) => console.log('Google Maps Error:', error)}
                // onGoogleApiLoaded={({ map, maps }) => console.log('Google Maps Loaded:', map, maps)}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleApiLoaded}
            >  
            {/* {places?.map((place, i) => (
                <div
                    lat={Number(place.lat)}
                    lng={Number(place.lon)}
                    key={i}
                    // style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}
                >
                    <LocationOnOutlinedIcon style={{ color: 'red', fontSize: '20px' }} ></LocationOnOutlinedIcon>
                </div>
                ))} */}
            </GoogleMapReact>
        </div>

    );
}

export default Map;