import React, {useState, useEffect} from 'react';
import { IconSun, IconCloud, IconCloudRain, IconCloudStorm, IconCloudSnow, IconMist, IconThermometer } from '@tabler/icons-react';



function WeatherHeader({weather, temperature, sunrise, sunset, latitude, longitude}) {

    const formatDate = (date) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }

    const formatTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour time
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}${ampm}`;
    }

    const handleWeatherIcon = () => {
        switch (weather) {
            case 'Clear':
                return(<IconSun stroke={2} />);
            case 'Clouds':
                return(<IconCloud stroke={2} />);
            case 'Drizzle':
                return(<IconCloudRain stroke={2} />);
            case 'Rain':
                return(<IconCloudRain stroke={2} />);
            case 'Thunderstorm':
                return(<IconCloudStorm stroke={2} />);
            case 'Snow':
                return(<IconCloudSnow stroke={2} />);
            case 'Mist':    
                return(<IconMist stroke={2} />);
            default:
                return(<IconThermometer stroke={2} />);
        }
    }

    return(
        <>
            <div className="header">
                <div className="header-container">
                    <div className="header-details">
                        <h1 className="font-semibold" id="tracker-heading">Fishing Log</h1>
                    </div>
                    <div className="header-details">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
                        <h2 className="text-slate-700 font-medium" id="header-date">{formatDate(new Date())}</h2>
                    </div>
                </div>
            </div>
            <div className="subheader">
                <div className="subheader-container">
                    <div className="subheader-details-container">
                        <div className="subheader-details">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world-latitude"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M4.6 7l14.8 0" /><path d="M3 12l18 0" /><path d="M4.6 17l14.8 0" /></svg>                        
                            <h2 className="text-slate-500" id="subheader-latitude">{latitude}</h2>
                        </div>
                        <div className="subheader-details">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world-longitude"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M11.5 3a11.2 11.2 0 0 0 0 18" /><path d="M12.5 3a11.2 11.2 0 0 1 0 18" /><path d="M12 3l0 18" /></svg>                        
                            <h2 className="text-slate-500" id="subheader-longitude">{longitude}</h2>
                        </div>
                    </div>
                    <div className="subheader-details-container">
                        <div className="subheader-details" id="current-weather">
                            {handleWeatherIcon()}
                            <h2 className="text-slate-500" id="subheader-weather">{`${weather} and ${temperature}ºF`}</h2>
                        </div>
                        <div className="subheader-details">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-sunrise"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" /><path d="M3 21l18 0" /><path d="M12 9v-6l3 3m-6 0l3 -3" /></svg>                        
                            <h2 className="text-slate-500" id="subheader-sunrise">{formatTime(sunrise)}</h2>
                        </div>
                        <div className="subheader-details">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-sunset"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" /><path d="M3 21l18 0" /><path d="M12 3v6l3 -3m-6 0l3 3" /></svg>                        
                            <h2 className="text-slate-500" id="subheader-sunset">{formatTime(sunset)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeatherHeader