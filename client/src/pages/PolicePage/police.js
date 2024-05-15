import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaShieldAlt } from 'react-icons/fa'; // Importing the police badge icon
import './police.css';

function Police() {
    const [data, setData] = useState([]);
    const [policeDistrict, setPoliceDistrict] = useState('');
    const [month, setMonth] = useState('');
    const [offenseType, setOffenseType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [districtData, setDistrictData] = useState([]);
    const [districtLoading, setDistrictLoading] = useState(false);
    const [districtError, setDistrictError] = useState(null);

    const offenseTypes = [
        "Aggravated Assault Firearm",
        "Aggravated Assault No Firearm",
        "All Other Offenses",
        "Arson",
        "Burglary Non-Residential",
        "Burglary Residential",
        "Disorderly Conduct",
        "DRIVING UNDER THE INFLUENCE",
        "Embezzlement",
        "Forgery and Counterfeiting",
        "Fraud",
        "Gambling Violations",
        "Homicide - Criminal",
        "Homicide - Gross Negligence",
        "Homicide - Justifiable",
        "Liquor Law Violations",
        "Motor Vehicle Theft",
        "Narcotic / Drug Law Violations",
        "Offenses Against Family and Children",
        "Other Assaults",
        "Other Sex Offenses (Not Commercialized)",
        "Prostitution and Commercialized Vice",
        "Public Drunkenness",
        "Rape",
        "Receiving Stolen Property",
        "Recovered Stolen Motor Vehicle",
        "Robbery Firearm",
        "Robbery No Firearm",
        "Theft from Vehicle",
        "Thefts",
        "Vagrancy/Loitering",
        "Vandalism/Criminal Mischief",
        "Weapon Violations", 
    ];
    const theme = useTheme();

    const fetchData = () => {
        if (!policeDistrict || !month || !offenseType) {
            setError(new Error("Please enter Police District, Month, and Offense Type."));
            return;
        }

        setLoading(true);
        const apiUrl = `http://localhost:8080/incidents/police/${policeDistrict}/${month}/${offenseType}`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data.');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setError(null);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const fetchDistrictData = () => {
        setDistrictLoading(true);
        fetch('http://localhost:8080/incidents/police_crime_num')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch district data.');
                }
                return res.json();
            })
            .then(data => {
                setDistrictData(data);
                setDistrictError(null);
                setDistrictLoading(false);
            })
            .catch(error => {
                setDistrictError(error);
                setDistrictLoading(false);
            });
    };

    useEffect(() => {
        fetchDistrictData();
    }, []);

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom style={{ color: theme.palette.primary.main }}>
                Police Data Analysis
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Fetch and analyze incident data by specifying the police district, month, and offense type.
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Police District"
                        value={policeDistrict}
                        onChange={e => setPoliceDistrict(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Month (YYYY-MM)"
                        value={month}
                        onChange={e => setMonth(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Select
                        fullWidth
                        value={offenseType}
                        onChange={e => setOffenseType(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select Offense Type</MenuItem>
                        {offenseTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        Fetch Data
                    </Button>
                </Grid>
            </Grid>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error.message}</Typography>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Police District</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Offense Type</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length ? (
                                data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.Police_Districts}</TableCell>
                                        <TableCell>{item.Month}</TableCell>
                                        <TableCell>{item.Text_General_Code}</TableCell>
                                        <TableCell>{item.Location_Block}</TableCell>
                                        <TableCell>{item.Dispatch_Time}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>No data available for this selection</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Display Incidents by Police District */}
            <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                <Typography variant="h6" gutterBottom style={{ color: theme.palette.primary.main }}>
                    <FaShieldAlt /> Incidents by Police District
                </Typography>
                {districtLoading ? (
                    <CircularProgress />
                ) : districtError ? (
                    <Typography color="error">{districtError.message}</Typography>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Police District</TableCell>
                                    <TableCell>Number of Incidents</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {districtData.length ? (
                                    districtData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.Police_Districts}</TableCell>
                                            <TableCell>{item.NUMBER_OF_INCIDENTS}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2}>No data available for police districts</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Paper>
    );
}

export default Police;





