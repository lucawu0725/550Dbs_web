import './map.css';
//  when global import
// be careful about class/element name


import React from "react";
import { useTheme, Grid, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
// import { Container, Divider, Link } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import List_part from './List/List';
import Map_part from './Map/Map';
// import Place_part from './Place/Place';
const config = require('../../config.json');


function Map() {
    const theme = useTheme();
    const API_Key = "uK5KQiG3kRSRj6CGY8wr1MLniUGG4IuL";
    const [lat, setLat] = useState(40.0043505);
    const [lon, setLon] = useState(-75.2037186);
    const [coords, setCoords] = useState({});
    const [autocomplete, setAutocomplete] = useState(null);
    const [mapPoint, setMapPoint] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [manualInput, setManualInput] = useState(0);
    const [manualPlace, setManulPlace] = useState();
    const [crimeCount, setCrimeCount] = useState({});
    // const [bounds, setBounds] = useState(null);


    // const onLoad = (autoC) => setAutocomplete(autoC);

    // const onPlaceChanged = () => {
    //     const lat = autocomplete.getPlace().geometry.location.lat();
    //     const lng = autocomplete.getPlace().geometry.location.lng();
    
    //     setCoords({ lat, lng });
    //   };
    // const handleSuccess = async (position) => {
    //     console.log('Latitude:', position.coords.latitude);
    //     console.log('Longitude:', position.coords.longitude);
    //     fetch(`https://api.tomtom.com/search/2/nearbySearch/.json?key=${API_Key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         const addressObj = data.results[0].address;
    //         // const stateCode = addressObj.countrySubdivisionCode;
    //         // const cityName = addressObj.municipality
    //       });
    // };

    // const handleError = (error) => {
    //     console.error('Error accessing location:', error.message);
    // };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Set the latitude and longitude from the position object
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                    console.log('Latitude-:', lat);
                    console.log('Latitude-:', lon);
                },
                (error) => {
                    console.error('Error fetching geolocation:', error);
                },
                {
                    enableHighAccuracy: true, // Request high accuracy position
                    timeout: 5000,            // Timeout for the request
                    maximumAge: 60000         // Acceptable cache age of a position
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }, );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
          console.log('Latitud999-:', coords);
        });
      }, []);


    const places = [
        { lat: 40.0043472, lon: -75.2069231, label: "New York" },
        { lat: 40.0413462, lon: -75.2089231, label: "Los Angeles" },
        { lat: 40.0183452, lon: -75.2069231, label: "Chicago" }
        // More points...
    ];

    const handleTypeChange = (type) => {
        setSelectedType(type);
        // Optionally filter mapPoints based on selected type here if necessary
        // Set selected type based on List's input
    };

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/incidents/map/${lon}/${lat}`)
          .then(res => res.json())
          .then(resJson => {
            // console.log("API Response:", resJson);
            const transformedData = resJson.map((item) => {
                const monthNumber = parseInt(item.Month.split('-')[1], 10);
                return {
                    lat: item.Lat,
                    lon: item.Lon,
                    label: item.Text_General_Code,
                    month: monthNumber // This will now be an integer like 1, 2, 3, etc.
                };
            });
            setMapPoint(transformedData);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);


    //coor-manually input
    const handleCoordinatesSubmit = ({ lat, lon }) => {
        // Update coordinates state; this can trigger effects in Map.js
        // setManualInput({lat, lon});
        setManualInput({
            latM: parseFloat(lat) || 0,  // Convert to float, default to 0 if NaN
            lonM: parseFloat(lon) || 0
        });
        console.log("Manually entered location::",lat, lon);
        // console.log("Manually entered location2::",manualInput);

        // Optionally trigger fetch directly 
    };

    useEffect(() => {
        console.log("Updated manualInput:", manualInput);
    }, [manualInput]);


    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/incidents/map/${manualInput.lonM}/${manualInput.latM}`)
          .then(res => res.json())
          .then(resJson => {
            // Transform the API response into the format needed for manualPlace
            const transformedData = resJson.map((item) => {
                return {  
                    lat: item.Lat,
                    lon: item.Lon,
                    label: item.Text_General_Code,
                    time: item.Dispatch_Time
                };
            });
            setManulPlace(transformedData);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, [manualInput.lonM, manualInput.latM]);
    

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/incidents/type_num/${lon}/${lat}`)
          .then(res => res.json())
          .then(resJson => setCrimeCount(resJson));
      }, []);





    return(
        // <div style={{ color: 'green'}}>Hello!
        //     <h1> Nihao2!</h1>
        // </div>
        <>
        
            <CssBaseline />
            <Grid container spacing={3} style={{width:"100%"}} >
                <Grid item xs={12} md={4}>
                    <List_part lat={lat} lon={lon} 
                    onTypeChange={handleTypeChange}
                    onCoordinatesSubmit={handleCoordinatesSubmit}
                    //send data to list.jsx
                    crimeCount={crimeCount}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Map_part lat={lat} lon={lon} 
                    setCoords={setCoords}
                    coords={coords}
                    //datapoints coming in...
                    // places={places}
                    places={mapPoint}
                    selectedType={selectedType}
                    //send data to map.jsx
                    manualPlace={manualPlace}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Map;

