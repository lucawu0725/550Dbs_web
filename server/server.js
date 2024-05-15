const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const app = express();

app.use(cors({
  origin: '*',
}));

// test
app.use(express.json()); // for parsing application/json

app.use('/api', routes.router);
app.get('/test', routes.test)
app.get('/test2', routes.test2)
app.use('/hella/:type', routes.hello);
app.get('/hello/:type', routes.hello);
app.get('/offense_bail/category/:offense_category', routes.avg_bail)
app.get('/incidents/police/:police_district/:month/:Text_General_Code', routes.poilce_month)
app.get('/incidents/year/:year/month/:month', routes.incedents_year)
app.get('/offense_bail/bail/:avgbail', routes.filtAvgbail)
app.get('/incidents/map/:lon/:lat', routes.lat_lon_data)
app.get('/incidents/vicinity/:lon/:lat', routes.vicinity_lonlat)
app.get('/incidents/police_crime_num', routes.police_dis)
app.get('/incidents/type_num/:lon/:lat', routes.crime_type_num)
app.get('/incidents/dispatch_time/:lon/:lat', routes.dispatch_time)
app.get('/incidents/danger_hour', routes.danger_hour)

// app.get('/search_songs', routes.search_songs);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
