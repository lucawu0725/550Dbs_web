const mysql = require('mysql')
const config = require('./config.json')

const express = require('express');
const router = express.Router();

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));


router.get('/helloa', (req, res) => {
    res.send('Hello World!');
});

const hello = async function(req, res){
    const name = 'luca';
    const team = 'team24';
    if (req.params.type === 'name') {
        res.json({ name: name });
      } else if (req.params.type === 'team') {
        res.json({ team : team})
      } else {
        res.status(404).json({});
      }
}

// test use
const test = async function(req, res){
  connection.query(`
    SELECT *
    FROM bail_data 
    WHERE day ='2011-01-03 00:00:00' `,
    (err, data) => {
      if(err || data.length === 0){
        console.log(err);
        res.json({});
      } else {
        res.json(data)
      }
    });
}


// test use
const test2 = async function(req, res){
  connection.query(`
    SELECT *
    FROM bail_data 
    WHERE defendant_race='white' `,
    (err, data) => {
      if(err || data.length === 0){
        console.log(err);
        res.json({});
      } else {
        res.json(data)
      }
    });
}

// Route 1
// GET /offense_bail/category/:offense_category:
const avg_bail = async function(req, res){
  const offense_category = req.params.offense_category.split(',');
  connection.query(`
    SELECT defendant_race, offense_category, AVG(avg_bail) AS avg_bail
    FROM bail_data
    WHERE offense_category IN (?)
    GROUP BY defendant_race, offense_category;`, [offense_category],
    (err, data) => {
      if(err || data.length === 0){
        console.log(err);
        res.json({});
      }else {
        res.json(data)
      }
    });
}

// Route 2
// GET /incidents/:police_district/:month
const poilce_month = async function(req, res){
  const Police_Districts = req.params.police_district;
  const Month = req.params.month;
  const Offense_Type = req.params.Text_General_Code;
  connection.query(`
    SELECT *
    FROM incidents_data
    WHERE Police_Districts = ? and Month= ? and Text_General_Code = ?
    LIMIT 10;`, [parseInt(Police_Districts), Month, Offense_Type],
    (err, data) => {
      if(err || data.length === 0){
        console.log(err);
        res.json({});
      }else {
        res.json(data)
      }
    });
}


// Route 3
// GET /incidents/year/:year/month/:month
// CREATE INDEX idx_month ON incidents_data (Month);  - speed up purpose
const incedents_year = async function(req, res) {
  const { year, month } = req.params;
  const [startMonth, endMonth] = month.split('-');

  connection.query(`
    SELECT Text_General_Code, Police_Districts, Month
    FROM incidents_data
    WHERE Month BETWEEN ? AND ?
    ORDER BY Month DESC;`, [`${year}-${startMonth}`, `${year}-${endMonth}`],
    (err, data) => {
      if (err) {
        console.error('SQL Error:', err);
        res.status(500).json({ error: 'Server Error' });
      } else {
        console.log('Data Retrieved:', data);
        if (data.length === 0) {
          res.status(404).json({ error: 'No data found' });
        } else {
          res.json(data);
        }
      }
    }
  );
};

// Route 4
// GET /offense_bail/bail/:avgbail
const filtAvgbail = async function(req, res){
  const Avgbail = req.params.avgbail;
  connection.query(`
    SELECT defendant_race, offense_category, AVG(avg_bail) AS avg_bail_kind
    FROM bail_data
    GROUP BY offense_category
    HAVING avg_bail_kind > ? 
    ORDER BY avg_bail_kind
    LIMIT 20; `, [parseFloat(Avgbail)],
    (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
      }else {
        if (data.length === 0){
          res.status(404).json({ error: 'No data found' });
          // res.json({});
        } else {
          res.json(data)
        }
      }
    });
}



// Route 5
// GET /incidents/map/:lon/:lat
// -75.165222/39.952583
// WOULD GET LARGE DATA, SEE/use how much
const lat_lon_data = async function(req, res){
  // const Lon = req.params.lon;
  const Lon = parseFloat(req.params.lon)
  // const Lat = req.params.lat;
  const Lat = parseFloat(req.params.lat);

  const lonMin = Lon - 0.016000;
  const lonMax = Lon + 0.016000;
  const latMin = Lat - 0.016000;
  const latMax = Lat + 0.016000;

  connection.query(`
    SELECT *
    FROM incidents_data
    WHERE Lon >= ? AND Lon <= ?
      AND Lat >= ? AND Lat <= ?
    LIMIT 300;`, [lonMin, lonMax, latMin, latMax],
    (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
      }else {
        if (data.length === 0){
          // res.status(404).json({ error: 'No data found' });
          res.json({});
        } else {
          res.json(data)
        }
      }
    });
}


// Route 6
// GET /incidents/vicinity/:lon/:lat
// -75.165222/39.952583
// WOULD GET LARGE DATA, SEE/use how much
const vicinity_lonlat = async function(req, res){
  // const Lon = req.params.lon;
  const Lon = parseFloat(req.params.lon)
  // const Lat = req.params.lat;
  const Lat = parseFloat(req.params.lat);

  const lonMin = Lon - 0.010000;
  const lonMax = Lon + 0.010000;
  const latMin = Lat - 0.010000;
  const latMax = Lat + 0.010000;

  connection.query(`
    SELECT
      CONCAT('LatBlock_', FLOOR((Lat - ?) / (? / 10)), '_LonBlock_', FLOOR((Lon - ?) / ((?) / 10))) AS block,
      COUNT(*) AS num_incidents
    FROM
      incidents_data
    WHERE
      Lat BETWEEN ? AND ?
      AND Lon BETWEEN ? AND ?
    GROUP BY
      block;`, [latMin, (latMax-latMin), lonMin, (lonMax-lonMin),latMin, latMax, lonMin, lonMax ],
    (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
      }else {
        if (data.length === 0){
          res.status(404).json({ error: 'No data found' });
          // res.json({});
        } else {
          res.json(data)
        }
      }
    });
}


// Route 7
// GET /incidents/police_crime_num
// CREATE INDEX idx_Police_Districts ON incidents_data (Police_Districts);
const police_dis = async function(req, res){
  // const Police = req.params.police;
  connection.query(`
    SELECT Police_Districts, COUNT(*) AS NUMBER_OF_INCIDENTS
    FROM incidents_data
    GROUP BY Police_Districts
    ORDER BY Police_Districts`,
    (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
      }else {
        if (data.length === 0){
          res.status(404).json({ error: 'No data found' });
          res.json({});
        } else {
          res.json(data)
        }
      }
    });
}

// Route 8
// GET /incidents/type_num/:lon/:lat
// -75.165222/39.952583
// CREATE INDEX idx_Lon_Lat ON incidents_data (Lon, Lat);
// Even though, still time consuming - prob
const crime_type_num = async function(req, res){
  const Lon = parseFloat(req.params.lon)
  const Lat = parseFloat(req.params.lat);

  const lonMin = Lon - 0.010000;
  const lonMax = Lon + 0.010000;
  const latMin = Lat - 0.010000;
  const latMax = Lat + 0.010000;

  connection.query(`
    SELECT Text_General_Code, COUNT(*) AS crimes_per_type 
    FROM incidents_data
    WHERE Lon >= ?
    AND Lon <= ? AND Lat >= ?
    AND Lat <= ?
    GROUP BY Text_General_Code ORDER BY crimes_per_type DESC;`, [lonMin, lonMax, latMin, latMax],
    (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
      }else {
        if (data.length === 0){
          res.status(404).json({ error: 'No data found' });
          // res.json({});
        } else {
          res.json(data)
        }
      }
    });
}



// Route 9
// GET /incidents/dispatch_time/:lon/:lat
// -75.165222/39.952583
// CREATE INDEX idx_Lon_Lat ON incidents_data (Lon, Lat);
// Even though, still time consuming - prob
const dispatch_time = async function(req, res){
  const Lon = parseFloat(req.params.lon)
  const Lat = parseFloat(req.params.lat);

  const lonMin = Lon - 0.010000;
  const lonMax = Lon + 0.010000;
  const latMin = Lat - 0.010000;
  const latMax = Lat + 0.010000;

  connection.query(`
    SELECT Text_General_Code, AVG(EXTRACT(HOUR FROM Dispatch_Time)) AS average_time_of_crime
    FROM incidents_data
    WHERE Lon >= ?
    AND Lon <= ? AND Lat >= ?
    AND Lat <= ?
    GROUP BY Text_General_Code 
    ORDER BY average_time_of_crime ;`, [lonMin, lonMax, latMin, latMax],
    (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
      }else {
        if (data.length === 0){
          res.status(404).json({ error: 'No data found' });
          // res.json({});
        } else {
          res.json(data)
        }
      }
    });
}


// Route 10
// GET /incidents/danger_hour;
const danger_hour = async function(req, res){
  // const Police = req.params.police;
  connection.query(`
    SELECT Hour, COUNT(*) AS number_per_hour 
    FROM incidents_data
    GROUP BY Hour
    ORDER BY number_per_hour DESC;`,
    (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
      }else {
        if (data.length === 0){
          res.status(404).json({ error: 'No data found' });
          res.json({});
        } else {
          res.json(data)
        }
      }
    });
}

module.exports = {
    hello,
    test,
    test2,
    avg_bail,
    poilce_month,
    incedents_year,
    filtAvgbail,
    lat_lon_data,
    vicinity_lonlat,
    police_dis,
    crime_type_num,
    dispatch_time,
    danger_hour,
    router
}