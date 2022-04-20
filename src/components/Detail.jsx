import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { useSelector } from 'react-redux';
import { ConvertUnixTimeToUTC, ConvertKToC, ConvertVisibility } from '../utils/index';

import globalStyles from '../constants';

const Item = (props) => (
    <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.data}>{props.data}</Text>
    </View>
);

const Detail = () => {
    const [currentWeatherData, setCurrentWeatherData] = useState({});

    const currentData = useSelector((state) => state.weather.weatherData.current);

    useEffect(() => {
        if (currentData !== undefined) {
            setCurrentWeatherData(currentData);
            console.log('currentData', currentData);
        }
    }, [currentData]);

    const dataList = [
        {
            id: '1',
            title: 'Cảm Giác Như',
            data: `${ConvertKToC(currentWeatherData?.feels_like)}°C`,
        },
        {
            id: '2',
            title: 'Độ Ẩm',
            data: `${currentWeatherData?.humidity ? currentWeatherData?.humidity : ''}%`,
        },
        {
            id: '3',
            title: 'Chỉ Số UV',
            data: `${Number(currentWeatherData?.uvi).toFixed() === NaN ? '' : Number(currentWeatherData?.uvi).toFixed()}`,
        },
        {
            id: '4',
            title: 'Tầm Nhìn',
            data: `${ConvertVisibility(currentWeatherData?.visibility)} km`,
        },
        {
            id: '5',
            title: 'Điểm Sương',
            data: `${ConvertKToC(currentWeatherData?.dew_point)}°C`,
        },
        {
            id: '6',
            title: 'Ấp Suất',
            data: `${currentWeatherData?.pressure ? currentWeatherData?.pressure : ''}`,
        },
    ];

    return (
        <>
            <View>
                {dataList.map((item) => (
                    <Item key={item.id} title={item.title} icon={item.icon} data={item.data} bgColor={{ backgroundColor: '#4ee43e' }} />
                ))}
            </View>
        </>
    );
};

export default Detail;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderRadius: 8,
    },
    title: {
        fontSize: 12,
        marginTop: 4,
    },
    data: {
        fontSize: 28,
        fontWeight: '300',
    },
});
