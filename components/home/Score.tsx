import React from 'react';
import { View, Text } from 'react-native';

const Score = ({ data }: any) => {

    const getBackgroundColor = (data: any) => {
        if (!data) return '#bfbfbf';
        const aqi = data.aqi;
        if (aqi < 200) return '#9bd996';
        if (aqi < 300) return '#edea8a';
        if (aqi < 400) return '#e6bc7e';
        return '#e6837a';
    };

    return (
        <View style={{ backgroundColor: getBackgroundColor(data) }} className='h-[200px] w-full rounded-xl flex flex-col justify-center items-center gap-4'>
            <Text className="text-white text-3xl font-bold">Score: {data.aqi}</Text>
            <View className='flex flex-col justify-center items-center gap-2'>
                <Text className="text-white text-xl">{data.city.name}</Text>
                <Text className="text-white text-md">{data.time.s}</Text>
            </View>
        </View>
    );
};

export default Score;