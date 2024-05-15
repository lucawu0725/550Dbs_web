import React, { useState } from 'react';
import {
    Typography, Paper, Grid, Button, Slider, TextField, MenuItem, Table, TableContainer,
    TableHead, TableRow, TableCell, TableBody
  } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';
import './search.css';

function Search() {
  const [yearData, setYearData] = useState([]);
  const [bailData, setBailData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2010');
  const [monthRange, setMonthRange] = useState([1, 12]);
  const [avgBail, setAvgBail] = useState('');
  const [yearError, setYearError] = useState(null);
  const [bailError, setBailError] = useState(null);

  const theme = useTheme();

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthRangeChange = (event, newValue) => {
    setMonthRange(newValue);
  };

  const fetchIncidentsByYearAndMonth = () => {
    const startYear = selectedYear;
    const startMonth = String(monthRange[0]).padStart(2, '0');
    const endMonth = String(monthRange[1]).padStart(2, '0');
    const apiUrl = `http://localhost:8080/incidents/year/${startYear}/month/${startMonth}-${endMonth}`;
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // Log the response
        setYearData(Array.isArray(result) ? result : []); // Ensure data is an array
        setYearError(null);
      })
      .catch((error) => {
        setYearError('Error fetching data');
        console.error(error);
      });
  };
  

  const fetchAvgBail = () => {
    const apiUrl = `http://localhost:8080/offense_bail/bail/${avgBail}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        setBailData(result);
        setBailError(null);
      })
      .catch((error) => {
        setBailError('Error fetching data');
        console.error(error);
      });
  };

  // Aggregate data by month for the bar chart
  const aggregatedData = (yearData || []).reduce((acc, cur) => {
    const { Month } = cur;
    acc[Month] = (acc[Month] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(aggregatedData)
  .sort((a, b) => parseInt(a) - parseInt(b)) // Sort keys numerically
  .map((key) => ({
    name: key,
    count: aggregatedData[key],
  }));

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ color: theme.palette.primary.main }}>
        Search Page
      </Typography>

      {/* Year and Month Search */}
      <Paper elevation={1} style={{ marginBottom: '20px', padding: '20px' }}>
        <Typography variant="subtitle1" gutterBottom>
          Select the year and range of months to search for incidents:
        </Typography>

        <Grid container spacing={3}>
          {/* Year Selection */}
          <Grid item xs={12}>
            <TextField
              select
              label="Year"
              value={selectedYear}
              onChange={handleYearChange}
              fullWidth
            >
              {[...Array(2017 - 2006 + 1).keys()].map((i) => (
                <MenuItem key={2006 + i} value={2006 + i}>
                  {2006 + i}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Month Range Slider */}
          <Grid item xs={12}>
            <Slider
              value={monthRange}
              min={1}
              max={12}
              onChange={handleMonthRangeChange}
              valueLabelDisplay="auto"
              marks={[...Array(12).keys()].map((i) => ({
                value: i + 1,
                label: new Date(0, i).toLocaleString('default', { month: 'short' })
              }))}
            />
            <Typography>
              Selected Months: {monthRange[0]} - {monthRange[1]}
            </Typography>
            <Button variant="contained" color="primary" onClick={fetchIncidentsByYearAndMonth}>
              Search Incidents by Year and Month
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Display Bar Chart */}
      {yearError ? (
        <Typography color="error">{yearError}</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Average Bail Search */}
      <Paper elevation={1} style={{ marginBottom: '20px', padding: '20px' }}>
        <Typography variant="subtitle1" gutterBottom>
          Search for incidents with a minimum average bail:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Minimum Average Bail"
              value={avgBail}
              onChange={(e) => setAvgBail(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={fetchAvgBail} style={{ marginTop: '10px' }}>
              Search by Average Bail
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Display Bail Data */}
      {bailError ? (
        <Typography color="error">{bailError}</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Defendant Race</TableCell>
                <TableCell>Offense Category</TableCell>
                <TableCell>Average Bail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bailData.length ? (
                bailData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.defendant_race}</TableCell>
                    <TableCell>{row.offense_category}</TableCell>
                    <TableCell>{row.avg_bail_kind}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No data available for this selection</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default Search;





















