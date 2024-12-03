import Chart from '@/components/home/Chart';
import Score from '@/components/home/Score';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const API_URL = process.env.EXPO_PUBLIC_AQICN_URL;
const API_KEY = process.env.EXPO_PUBLIC_AQICN_KEY;

export default function IndexScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchAirQuality(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  const getCurrentLocation = async (): Promise<void> => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setError('Erreur lors de la récupération de la position');
    }
  }
  
  const fetchAirQuality = async (latitude: number, longitude: number): Promise<void> => {
    try {
      const url = `${API_URL}${latitude};${longitude}/?token=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'ok') {
        setAqiData(data.data);
      } else {
        setError(`Erreur lors de la récupération des données : ${data.message}`);
      }
    } catch (err) {
      setError('Erreur de réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Text className="text-white text-center m-auto text-3xl font-bold">Air Quality</Text>
      }
    >
      <View className='flex flex-col gap-8'>
        {loading && <ActivityIndicator size="large" color="#d1d1d1" />}
        {error && <Text className="text-red-500">{error}</Text>}
        {!loading && !error && aqiData && (
          <>
            <Score data={aqiData} />
            <Chart data={aqiData} />
          </>
        )}
      </View>
            
    </ParallaxScrollView>
  );
}
