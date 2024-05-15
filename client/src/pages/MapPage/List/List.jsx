import React, { useState, useEffect, createRef } from 'react';
import './List.css';
import CrimeList from './CrimeList';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, TextField, Button, useTheme, colors } from '@mui/material';


const List = ({ lat, lon, onTypeChange, onCoordinatesSubmit, crimeCount}) => {

    const theme = useTheme();
    const [className, setClassName] = useState('');
    const [type, setType] = useState('None');
    const [rating, setRating] = useState('None');
    const [latManual, setLatManual] = useState('');
    const [lonManual, setLonManual] = useState('');
    const [error, setError] = useState(false);
    const [errorRange, setErrorRange] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    // const toggleDrawer = (open) => (event) => {
    //     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }
    //     setDrawerOpen(open);
    // };
    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    console.log("crime couts:", crimeCount)
    console.log('Is Array:', Array.isArray(crimeCount));
    // const GPSlocation

    const handleLatitudeChange = (event) => {
        const value = event.target.value;
        // Allow only digits and one dot with up to six decimal places
        if (/^-?\d*\.?\d{0,6}$/.test(value) || value === "") {
            setLatManual(value);
            setError(false);
        } else {
            setError(true);  // Set error state to true if input is invalid
        }
    }
    const handleLonitudeChange = (event) => {
        const value = event.target.value;
        // Allow only digits and one dot with up to six decimal places
        if (/^-?\d*\.?\d{0,6}$/.test(value) || value === "") {
            setLonManual(value);
            setError(false);
        } else {
            setError(true);  // Set error state to true if input is invalid
        }
    }

    const handleChange = (event) => {
        const newType = event.target.value;
        console.log("Selected Season in List:", newType); 
        setType(newType);
        onTypeChange(newType);
    };

    const handleEnterClick = () => {
        console.log("In listjs", latManual, lonManual);
        onCoordinatesSubmit({ lat: latManual, lon: lonManual });
    };

    return(
        // <h1 style={{color:'white'}}>List</h1>
        <div>
            <Typography color={'white'} marginBottom={5} variant='h6'> CRIME TRACK NOW - LOCATION</Typography>
            {/* <FormControl>
                <InputLabel id='inputLon'>Classy</InputLabel>
                <Select value={className} onChange={(e)=>setClassName(e.target.value)}>
                    <MenuItem value="High">HIGH</MenuItem>
                    <MenuItem value="Mid">MID</MenuItem>
                    <MenuItem value="Low">LOW</MenuItem>
                </Select>
                
            </FormControl>
            <InputLabel id='inputLat'>Block</InputLabel> */}
            <FormControl className={'formControl'}>
                <InputLabel id="type" sx={{'&.MuiInputLabel-shrink': { transform: 'translate(0, -20px) scale(0.85)' } // Adjusts label position when shrunk
                }}>Season</InputLabel>
                <Select id="type" sx={{
                        color: 'white',
                        '& .MuiSelect-select': { color: 'white' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                    }} value={type} onChange={handleChange} >
                <MenuItem value="None" disabled>None</MenuItem>
                <MenuItem value="Spring">Spring</MenuItem>
                <MenuItem value="Summer">Summer</MenuItem>
                <MenuItem value="Fall">Fall</MenuItem>
                <MenuItem value="Winter">Winter</MenuItem>
                <MenuItem value="Clear">Clear</MenuItem>
                </Select>
            </FormControl>
            {/* <FormControl className={'formControl'}>
                <InputLabel id="rating" sx={{'&.MuiInputLabel-shrink': { transform: 'translate(0, -20px) scale(0.85)' }}}>
                    Rating</InputLabel>
                <Select id="rating" sx={{
                        color: 'white',
                        '& .MuiSelect-select': { color: 'white' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                    }} value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value="None" disabled>None</MenuItem>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="3">Above 3.0</MenuItem>
                <MenuItem value="4">Above 4.0</MenuItem>
                <MenuItem value="4.5">Above 4.5</MenuItem>
                </Select>
            </FormControl> */}

            <TextField
                id="latitude"
                label="Latitude"
                type="number"
                value={latManual}
                // onChange={(e) => setLat(e.target.value)}
                onChange={handleLatitudeChange}
                variant="outlined"
                error={error}
                sx={{ width: '93%', marginTop: 3,marginBottom: 3, '.MuiInputBase-input': { color: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } ,'& .MuiInputLabel-root': { color: 'white' } }}
            />
            <TextField
                id="longitude"
                label="Longitude"
                type="number"
                value={lonManual}
                // onChange={(e) => setLon(e.target.value)}
                onChange={handleLonitudeChange}
                variant="outlined"
                error={error}
                sx={{ width: '93%', marginBottom: 2, '.MuiInputBase-input': { color: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiInputLabel-root': { color: 'white' } }}
            />
            {error && (
                <Typography color="red" fontSize={12} sx={{ mt: 0.3 }}>
                     Format requires up to six decimal places. And In Philly region
                </Typography>
            )}

            <Button sx={{borderColor: 'white', width: '150px', color: 'white', borderStyle: 'solid', 
                    backgroundColor: theme.palette.primary.main, marginBottom: 3,
                    '&:hover': {
                        backgroundColor: 'white', // Change background on hover
                        color: 'black'            // Change text color on hover for better contrast
                    }}}
                    onClick={handleEnterClick}
                >
                ENTER
            </Button>

            {/* Display current or manual location */}
            <Typography color={'white'} variant='body1' fontSize={14}>
                Now GPS: [{lat}, {lon}]
            </Typography>

            <Button sx={{borderColor: 'white', width: '190px', color: 'white', borderStyle: 'solid', 
                    backgroundColor: theme.palette.primary.main, marginBottom: 0}}
                    onClick={toggleDrawer(true)} style={{ marginTop: '25px' }}>
                Show Crime Stats
            </Button>
            {/* <CrimeList crimes={crimeCount} isOpen={drawerOpen} toggleDrawer={toggleDrawer} /> */}
            {crimeCount && crimeCount.length > 0 ? (
                <CrimeList crimes={crimeCount} isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
            ) : (
                <p style={{color:'white'}}>Loading crimes data...</p>  // or any other placeholder content
            )}

        </div>
    );
}

export default List;