import './home.css';
import React from 'react'; 
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

const lineData = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024 (Predict)'],
    datasets: [{
        label: 'Crime Counts Per Year',
        data: [56422, 56185, 54212, 50761, 46737, 43431, 40464, 42638, 38445, 39546, 26475, 23854, 22613, 22843, 18938],
        fill: false,
        borderColor: 'purple',
        tension: 0.1,
        borderWidth: 5,
    }]
};

const pieData = {
    labels: [
        'Drug Possession', 'Uncategorized Offenses', 'Drug Sales', 
        'Aggravated Assault', 'DUI', 'Theft', 'Robbery', 'Simple Assault', 
        'Retail Theft', 'Burglary/Residential', 'Auto Theft', 
        'Firearm Possession without a License', 'Threats of Violence', 
        'Prostitution/Sex Work', 'Firearm Possession by a Prohibited Person', 
        'Criminal Mischief', 'Other Violent Crimes', 'Violation of Protection Order', 
        'Burglary/Commercial', 'Drug Sales with a Firearm', 'Other'
    ],
    datasets: [{
        label: 'Crime Types',
        data: [15.07, 13.95, 12.70, 9.83, 8.60, 5.17, 3.67, 3.60, 3.04, 
               2.53, 2.35, 2.06, 1.56, 1.55, 1.54, 1.42, 1.35, 1.31, 
               0.98, 0.98, 6.77],
        backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#8E44AD', 
            '#3498DB', '#1ABC9C', '#2ECC71', '#95A5A6', '#F39C12', '#D35400', 
            '#1F618D', '#7D3C98', '#C0392B', '#F4D03F', '#7F8C8D', '#16A085', 
            '#2980B9', '#273746', '#BDC3C7'
        ],
        hoverOffset: 4
    }]
};

const crimeHourData = {
    labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', 
    '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-00' ],
    datasets: [{
        label: 'Average Crime Count Per Hour',
        data: [18, 14, 10, 7, 5, 4, 4, 6, 12, 15, 17, 18, 18, 18, 15, 17, 21, 20, 19, 19, 19, 18, 19, 18],
        backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#8E44AD', 
            '#3498DB', '#1ABC9C', '#2ECC71', '#95A5A6', '#F39C12', '#D35400', 
            '#1F618D', '#7D3C98', '#C0392B', '#F4D03F', '#7F8C8D', '#16A085', 
            '#2980B9', '#273746', '#BDC3C7', '#34495E', '#9B59B6', '#3498DB'
        ],
        hoverOffset: 4
    }]
};

const options = {
    maintainAspectRatio: false, 
    aspectRatio: 1, 
    plugins: {
        legend: {
            position: 'right', 
        },
        tooltip: {
            enabled: true,
            titleFont: {
                size: 14,
            },
            bodyFont: {
                size: 12,
            },
            backgroundColor: "rgba(0, 123, 255, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#ffffff",
            borderWidth: 1,
            radius: '140%'
        },
    },
};



export default function Home() {
    return (
        <div className="white-background">
            <div className="title">
                <h1 className='titlecolor'>Welcome to the Philly Crime Tracker!</h1>
            </div>
            <div className="description">
                <p><strong>Explore real-time updates on crime rates and trends across various neighborhoods in Philadelphia. We're committed to delivering the most accurate and comprehensive safety information to empower your decisions.</strong></p>
                <p><strong>Discover your path to safety with the Philly Crime Tracker, your primary resource for aggregated data and detailed insights into Philadelphia's safety conditions. We aim to make accessing safety information convenient and transparent, ensuring peace of mind as you navigate through city life.</strong></p>
                <p><strong>Your safety is our priority. At Philly Crime Tracker, we not only provide up-to-date crime data but also interpret the stories behind the numbers to help you better understand and assess risks in your area.</strong></p>
            </div>
            <div className="chart-container">
                <div className="chart-row1">
                    <div className="chart">
                        <Line data={lineData} options={options} />
                    </div>
                </div>
                <div className='chart-row'>
                <div className="chart1">
                        <Pie data={pieData} options={options} />
                    </div>
                    <div className="chart2">
                    <Pie data={crimeHourData} options={options} />
                </div>
                </div>
                
            </div>
        </div>
    );
}
