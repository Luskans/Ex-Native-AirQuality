export default function filterFiveDays(data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDay = new Date(today);
    endDay.setDate(today.getDate() + 4); // Add 4 days to today

    const filteredData = data.filter(item => {
        const itemDate = new Date(item.day);
        return itemDate >= today && itemDate <= endDay;
    });

    return filteredData;
}