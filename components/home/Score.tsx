import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { AQICN_KEY, AQICN_URL } from 'react-native-dotenv';
import { Box } from '../ui/box';

const API_KEY = AQICN_KEY;
const BASE_URL = AQICN_URL;

const Score = () => {
    const [loading, setLoading] = useState(true);
    const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                fetchAirQuality(position.coords.latitude, position.coords.longitude);
            },
            error => {
                setLoading(false);
                setError('Erreur de localisation');
            console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    const fetchAirQuality = async (latitude, longitude) => {
        try {
            const response = await fetch(`${BASE_URL}${latitude};${longitude}/?token=${API_KEY}`);
            const data = await response.json();
            if (data.status === 'ok') {
                console.log(data.data);
                setAqiData(data.data);
            } else {
                setError('Erreur lors de la récupération des données');
            }
        } catch (err) {
            console.error(err);
            setError('Erreur de réseau');
        } finally {
            setLoading(false);
        }
    };

    const getBackgroundColor = () => {
        if (!aqiData) return '#fff';
        const aqi = aqiData.aqi;
        if (aqi < 200) return 'green';
        if (aqi < 300) return 'yellow';
        if (aqi < 400) return 'orange';
        return 'red';
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>{error}</Text>;
    }

    return (
        <Box style={{ backgroundColor: getBackgroundColor() }} className='h-[200px] w-full rounded-xl flex flex-col justify-center items-center gap-4'>
            <Text className="text-white text-3xl font-bold">Score: 28</Text>
            <Box className='flex flex-col justify-center items-center gap-2'>
                <Text className="text-white text-xl">Roanne, France</Text>
                <Text className="text-white text-md">12 février 2025</Text>
            </Box>
        </Box>
    );
};

export default Score;