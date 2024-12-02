import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Box } from '../ui/box';
import * as Location from 'expo-location';

const API_URL = process.env.EXPO_PUBLIC_AQICN_URL;
const API_KEY = process.env.EXPO_PUBLIC_AQICN_KEY;

const Score = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(true);
    const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        const getLocationAndFetchData = async () => {
            await getCurrentLocation();
            if (location) {
                await fetchAirQuality(location.coords.latitude, location.coords.longitude);
            }
        };
 
        getLocationAndFetchData();
    }, []);

    const getCurrentLocation = async (): Promise<object | void> => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Permission to access location was denied');
            setLoading(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLoading(false);
    }

    const fetchAirQuality = async (latitude: number, longitude: number): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}${latitude};${longitude}/?token=${API_KEY}`);
            const data = await response.json();
            if (data.status === 'ok') {
                console.log(data.data);
                setAqiData(data.data);
            } else {
                setError(`Erreur lors de la récupération des données : ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur de réseau');
        } finally {
            setLoading(false);
        }
    };

    const getBackgroundColor = () => {
        if (!aqiData) return '#bfbfbf';
        const aqi = aqiData.aqi;
        if (aqi < 200) return '#9bd996';
        if (aqi < 300) return '#edea8a';
        if (aqi < 400) return '#e6bc7e';
        return '#e6837a';
    };

    return (
        <Box style={{ backgroundColor: getBackgroundColor() }} className='h-[200px] w-full rounded-xl flex flex-col justify-center items-center gap-4'>
            {loading ?? <ActivityIndicator size="large" color="#d1d1d1" />}
            {error != null ? <Text className='text-red-500'>{error}</Text> : ''}
            <Text className="text-white text-3xl font-bold">Score: {aqiData?.aqi}</Text>
            <Box className='flex flex-col justify-center items-center gap-2'>
                <Text className="text-white text-xl">{aqiData?.city.name}</Text>
                <Text className="text-white text-md">{aqiData?.time.s}</Text>
            </Box>
        </Box>
    );
};

export default Score;