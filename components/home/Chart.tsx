import { BarChart } from "react-native-gifted-charts";
import { View, Text } from 'react-native';
        
const Chart = ({ data }: any) => {
    const o3 = data.forecast.daily.o3

    const todayString = new Date().toISOString().slice(0, 10);
    const todayValue = o3.find(item => item.day === todayString)?.avg || 'N/A';

    const today = new Date();
    today.setMinutes(today.getMinutes() + today.getTimezoneOffset());
    today.setHours(0, 0, 0, 0); // Remettre à zéro les heures

    const endDay = new Date(today);
    endDay.setDate(today.getDate() + 5); // 4 jours à partir d'aujourd'hui

    const transformedData = o3
    .filter(item => {
        const itemDate = new Date(item.day);
        return itemDate >= today && itemDate <= endDay;
    })
    .map(item => {
        const date = new Date(item.day);
        const options = { weekday: 'short' }; // Renvoyer les jours abrégés
        const formattedDay = new Intl.DateTimeFormat('en-US', options).format(date);

        return {
            value: item.avg,
            label: formattedDay,
            ...(item.day === todayString && { frontColor: '#177AD5' })
        };
    });

    return (
        <View>
            <Text className="text-center font-black text-xl mb-2">O3 : {todayValue} μg/m3</Text>
            <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={transformedData}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
    );
};

export default Chart;