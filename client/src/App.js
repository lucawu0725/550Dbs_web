import './App.css';
import theme from './theme';
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'

import NavBar from './components/NavBar/NavBar';
import DropdownMenu from './components/DropdownMenu/DropdownMenu';

import Home from './pages/HomePage/home'
import Map from './pages/MapPage/map'
import Police from './pages/PolicePage/police'
import Search from './pages/SearchPage/search'



function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <ThemeProvider theme={theme}>
      <CssBaseline>
        {/* <Router> */}
        <BrowserRouter>
          <div style={{'display': "flex", "flexDirection": "column", "height": "100vh"}}>
            <NavBar/>
            <DropdownMenu/>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/map" element={<Map />}/>
              <Route path="/police" element={<Police />}/>
              <Route path="/search" element={<Search />}/>
            </Routes>
          </div>
        </BrowserRouter>
        {/* </Router> */}
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
