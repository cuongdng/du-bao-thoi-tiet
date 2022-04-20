import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Location from 'expo-location';

import { getWeatherData, setLocationActive } from './src/redux/slices/weatherSlice';

import Detail from './src/components/Detail';

import { ConvertKToC, ConvertUnixTimeToUTC } from './src/utils';

const Main = () => {
    const dispatch = useDispatch();
    const [coordinates, setCoordinates] = useState({});
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        handleTurnOnLocation();
    }, []);

    const handleTurnOnLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('permission denied');
            Alert.alert('permission denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCoordinates({
            lon: location.coords.longitude,
            lat: location.coords.latitude,
        });
    };

    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            console.log(coordinates);
            dispatch(
                setLocationActive({
                    lon: coordinates.lon,
                    lat: coordinates.lat,
                })
            );
        }
    }, [coordinates]);

    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            dispatch(getWeatherData({ lon: coordinates.lon, lat: coordinates.lat }))
                .unwrap()
                .then((originalPromiseResult) => {
                    setWeatherData(originalPromiseResult);
                });
        }
    }, [coordinates]);
    const locationName = useSelector((state) => state.weather.locationActive);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{locationName}</Text>

            <View>
                <Text style={{ fontSize: 60, marginRight: 12 }}>{ConvertKToC(weatherData?.current?.temp)}°C</Text>
                <View>
                    <Text>
                        Nhiệt độ cao nhất trong ngày: {ConvertKToC(weatherData?.daily ? weatherData?.daily[0]?.temp?.max : null)}
                        °C
                    </Text>
                    <Text>
                        Nhiệt độ thấp nhất trong ngày: {ConvertKToC(weatherData?.daily ? weatherData?.daily[0]?.temp?.min : null)}
                        °C
                    </Text>
                </View>
            </View>

            <Text style={styles.date}>{ConvertUnixTimeToUTC(weatherData?.current?.dt, 'dddd, Do MMMM')}</Text>

            <View style={{ marginTop: 12 }}>
                <Detail />
            </View>
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexRowCenterAlign: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
