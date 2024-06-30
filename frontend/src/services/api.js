import React from 'react';

// Grab all logs from database
export const fetchLogs = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/logs');
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const fetchLog = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/api/logs/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Create a new log
export const createLog = async (data) => {
    console.log('Form Data:', data);
    try {
        const response = await fetch('http://localhost:4000/api/logs', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Form submitted successfully');
            return response;
        } else {
            console.error('Error submitting form');
        }
    } catch (error) {
        console.error('Error submitting form', error);
        return null;
    }
};

// Update an existing log
export const updateLog = async (data, id) => {
    console.log('Form Data:', data);
    console.log('Log ID:', id);
    try {
        const response = await fetch(`http://localhost:4000/api/logs/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Form submitted successfully');
            setTimeout(() => {
                fetchLogs();
            }, 200);
            return response;
        } else {
            console.error('Error submitting form');
        }
    } catch (error) {
        console.error('Error submitting form', error);
        return null;
    }
};

// Delete an existing log
export const deleteLog = async (id) => {
    console.log('Delete log' , id);
    
    const response = await fetch(`http://localhost:4000/api/logs/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log('Log successfully deleted');
        setTimeout(() => {
            fetchLogs();
        }, 200);
    } else {
        console.log('Error deleting course');
    }
}

// Fetch weather data from Open Weather API
export const fetchWeatherData = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
    
                try {
                    console.log('Fetching weather data...');
                    const response = await fetch(`http://localhost:4000/api/fetch-data?latitude=${latitude}&longitude=${longitude}`);
                    console.log('Response', response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    console.log('Data', result);
                    resolve(result);
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            }, (error) => {
                console.error('Geolocation error:', error);
                reject(error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            reject(new Error('Geolocation is not supported by this browser'));
        }
    });
}