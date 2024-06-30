import WeatherHeader from './components/WeatherHeader.jsx'
import Table from './components/Table/Table.jsx'
import CreateModal from './components/CreateModal.jsx'
import AppLoadingState from './components/LoadingStates/AppLoadingState.jsx';
import React, {useState, useEffect} from 'react';
import {fetchLogs, fetchWeatherData} from './services/api.js'

function App() {
    const [logs, setLogs] = useState([]);
    const [updatedLogs, setUpdatedLogs] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [temperature, setTemperature] = useState();
    const [currentWeather, setCurrentWeather] = useState({});
    const [sunrise, setSunrise] = useState();
    const [sunset, setSunset] = useState();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [backgroundScale, setBackgroundScale] = useState(false);
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [isUpdate, setIsUpdate] = useState(null);

    const toggleCreateModal = () => {
        setShowCreateModal(!showCreateModal);
        setBackgroundScale(!backgroundScale);
        console.log(isUpdate);
    }

    // Update state variable 'updatedLogs' in order to re-render table via useEffect
    // Handles data updates for POST and DEL API calls
    function handleUpdatedData(data) {
        setUpdatedLogs(data);
    }

    useEffect(() => {
        // Weather data retrieval function
        const loadWeatherData = async () => {
            try {
                const result = await fetchWeatherData();
                console.log('Fetched data in app:', result);
                setWeatherData(result);
                console.log(weatherData);
                setLoading(false);

                // Pass data to state variables associated with weather header
                setTemperature(Math.round(weatherData?.main?.temp));
                setCurrentWeather(weatherData?.weather[0]?.main);
                setSunrise(weatherData?.sys?.sunrise);
                setSunset(weatherData?.sys?.sunset);
                setLatitude(weatherData?.coord?.lat);
                setLongitude(weatherData?.coord?.lon);
            } catch (error) {
                console.error('Error in loadWeatherData:', error);
            } finally {
                setLoading(false);
            }
        }

        // Executing weather data retrieval function
        loadWeatherData();
    }, [currentWeather, temperature, sunrise, sunset, latitude, longitude]);

    useEffect(() => {
        // Log data retrieval function
        const loadLogData = async () => {
            try {
                const result = await fetchLogs();
                console.log(result);
                setLogs(result);
            } catch (error) {
                console.error(error);
            }
        }

        // Executing log retrieval function
        loadLogData();
    }, [updatedLogs]);

    return(
        <>
            <AppLoadingState loading={loading} />
            <CreateModal show={showCreateModal} onClose={toggleCreateModal} handleUpdatedData={handleUpdatedData} setIsUpdate={setIsUpdate} isUpdate={isUpdate}/>
            <div className="wrapper" id="wrapper">
                <div className={`content ${backgroundScale ? 'modal-background-scale' : ''}`} id="content">
                    {weatherData && 
                        <WeatherHeader weather={currentWeather} temperature={temperature} sunrise={sunrise} sunset={sunset} latitude={latitude} longitude={longitude}/>
                    }
                    <Table logs={logs} toggleModal={toggleCreateModal} fetchLogs={fetchLogs} handleUpdatedData={handleUpdatedData} setIsUpdate={setIsUpdate}/>
                </div>
            </div>
        </>
    );
}

export default App
