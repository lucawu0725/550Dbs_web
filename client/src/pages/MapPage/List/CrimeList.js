// import React, { useState } from 'react';
// import { List, ListItem, ListItemText, IconButton, Drawer } from '@mui/material';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


// function CrimeList({ crimes }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setIsOpen(open);
//   };

//   return (
//     <>
//       <IconButton onClick={toggleDrawer(true)}>
//         <ArrowUpwardIcon /> {/* Button to open the slide-up panel */}
//       </IconButton>
//       <Drawer
//         anchor="bottom"
//         open={isOpen}
//         onClose={toggleDrawer(false)}
//       >
//         <div
//           role="presentation"
//           onClick={toggleDrawer(false)}
//           onKeyDown={toggleDrawer(false)}
//         >
//           <List style={{ maxHeight: 400, overflow: 'auto' }}>
//             {/* erorr since funcitno map? */}
//             {crimes.map((crime, index) => (
//               <ListItem key={index}>
//                 <ListItemText primary={crime.Text_General_Code} secondary={`Crimes: ${crime.crimes_per_type}`} />
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </Drawer>
//     </>
//   );
// }

// export default CrimeList;




import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CrimeList = ({ crimes, isOpen, toggleDrawer }) => {
    return (
        // <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer(false)}>
        //     <IconButton onClick={toggleDrawer(!isOpen)}>
        //         {isOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        //     </IconButton>
            // <List style={{ width: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            //     {crimes.map((crime, index) => (
            //         <ListItem key={index}>
            //             <ListItemText primary={crime.Text_General_Code} secondary={`Occurrences: ${crime.crimes_per_type}`} />
            //         </ListItem>
            //     ))}
            // </List>
        // </Drawer>

        // <div>
        //     <Drawer anchor="bottom" open={isOpen}>
        //         <p style={{color:'white'}}>mouse</p>
        //         <List style={{ width: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        //             {crimes.map((crime, index) => (
        //                 <ListItem key={index}>
        //                     <ListItemText primary={crime.Text_General_Code} secondary={`Occurrences: ${crime.crimes_per_type}`} />
        //                 </ListItem>
        //             ))}
        //         </List>
        //     </Drawer>
        // </div>
        <div style={{ position: 'relative', bottom:'20px'}}>
            <IconButton onClick={() => toggleDrawer(!isOpen)}>
                {isOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </IconButton>
            <div style={{
                maxHeight: '130px',
                overflowY: 'auto',
                backgroundColor: 'rgba(131, 111, 255, 0.7)',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                color: 'white'
            }}>
                <List>
                    {crimes.map((crime, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={crime.Text_General_Code} secondary={`Occurrences: ${crime.crimes_per_type}`} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default CrimeList;
