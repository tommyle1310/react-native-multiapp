import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome6, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import PieChart from 'react-native-pie-chart';
import * as CSS from '../../constants/css';
import { calculateTimeTotalResumeTime, convertDateTimeFormat, convertMilisecondToTimeFormat, convertSeriesTime, convertTimestampToTimeOrDate } from '../../utils/formatTimestamp';
import Txt from '../../components/commonComponents/Txt';

const { colorSet, fontSet, justifyBetween, itemsCenter } = CSS;

const DetailTimeTrackerScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { activity } = route.params;
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalPauses, setTotalPauses] = useState(0)
    const [seriesTimeDuration, setSeriesTimeDuration] = useState([])
    const [seriesColors, setSeriesColors] = useState([])
    const [timeResume, setTimeResume] = useState(null)
    const [dateResume, setDateResume] = useState(null)
    const [timePause, setTimePause] = useState(null)
    const [datePause, setDatePause] = useState(null)

    const [startDateTime, setStartDateTime] = useState(null)

    // time data
    useEffect(() => {
        // start date
        setStartDateTime(convertDateTimeFormat(activity.timestamps[0].timestamp))

        //resume date time  data
        setTimeResume(convertTimestampToTimeOrDate(activity.timestamps, 1, activity.timestamps.length === 2 ? 'start' : 'resume', 'hour'))
        setDateResume(convertTimestampToTimeOrDate(activity.timestamps, 1, activity.timestamps.length === 2 ? 'start' : 'resume', 'date'))
        //pause date time  data
        setTimePause(convertTimestampToTimeOrDate(activity.timestamps, 1, 'pause', 'hour'))
        setDatePause(convertTimestampToTimeOrDate(activity.timestamps, 1, 'pause', 'date'))

        // pie chart percentage
        setSeriesTimeDuration(convertSeriesTime(activity.timestamps))

        // totalPauses
        const countPauseActions = activity.timestamps.reduce((count, obj) => {
            if (obj.action === "pause") {
                count++;
            }
            return count;
        }, 0);
        setTotalPauses(countPauseActions)


        // Calculate total resume time from existing timestamps
        const newTotalTime = calculateTimeTotalResumeTime(activity.timestamps);
        setElapsedTime(countPauseActions)
        setElapsedTime(newTotalTime);
        let interval;
        const startTimer = () => {
            interval = setInterval(() => {
                if (activity.timestamps[activity.timestamps.length - 1].action !== 'pause') {
                    setElapsedTime(prevTime => prevTime + 1000); // Increment elapsed time by 1 second
                }
            }, 1000);
        };
        startTimer();

        // Clean up interval when component unmounts
        return () => clearInterval(interval);
    }, [activity.timestamps]);


    useEffect(() => {
        const colors = [];

        // Iterate over timestamps
        for (let i = 0; i < activity.timestamps.length; i++) {
            const currentTimestamp = activity.timestamps[i];
            const nextTimestamp = activity.timestamps[i + 1];

            // Push cyan for start to pause and resume to pause
            if (currentTimestamp.action === 'start' && nextTimestamp && nextTimestamp.action === 'pause') {
                colors.push(colorSet.timeTracker.cyan);
            } else if (currentTimestamp.action === 'resume' && nextTimestamp && nextTimestamp.action === 'pause') {
                colors.push(colorSet.timeTracker.cyan);
            }
            // Push violet for pause to resume
            else if (currentTimestamp.action === 'pause' && nextTimestamp && nextTimestamp.action === 'resume') {
                colors.push(colorSet.timeTracker.violet);
            }
        }

        // Set the colors state
        setSeriesColors(colors);
    }, [activity.timestamps]);
    // Convert elapsed time to time format
    const totalResumeTime = convertMilisecondToTimeFormat(elapsedTime);



    return (
        <View style={{ ...CSS.background, paddingBottom: 0, color: colorSet.timeTracker.white }}>
            <View style={{ ...CSS.justifyBetween, ...CSS.itemsCenter }}>
                <Pressable onPress={() => navigation.navigate('MainTimeTracking')}>
                    <FontAwesome6 name="chevron-left" size={24} color={colorSet.timeTracker.white} />
                </Pressable>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Done</Text>
            </View>
            <View style={{ ...CSS.justifyBetween, ...CSS.itemsCenter, paddingTop: 20 }}>
                <View style={{ gap: 4 }}>
                    <Text style={{ ...fontSet.timeTracker.h3Bold, color: colorSet.timeTracker.white }}>{activity.name}</Text>
                    <Text style={{ ...fontSet.timeTracker.h4Light, color: colorSet.timeTracker.softViolet }}>{activity.tags.length > 1 ? `${activity.tags[0]} - ${activity.tags[1]}` : activity.tags[0]}</Text>
                </View>
                <Feather name="trash-2" size={24} color={colorSet.timeTracker.white} />
            </View>
            <ScrollView>
                <View style={{ ...CSS.justifyBetween, ...CSS.itemsCenter, marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', ...CSS.itemsCenter, gap: 10 }}>
                        <Text style={{ ...fontSet.timeTracker.h4Light, color: colorSet.timeTracker.white }}>Total time:</Text>
                        <Text style={{ ...fontSet.timeTracker.h3Bold, color: colorSet.timeTracker.white }}>{totalResumeTime}</Text>
                    </View>
                    <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>{totalPauses === 0 ? 'Tracking...' : `1 of ${totalPauses} sets`}</Text>
                </View>
                <View style={{ ...CSS.itemsCenter, marginVertical: 20 }}>
                    <View style={{ flex: 1, gap: 10 }}>
                        <View style={{ height: 30, width: 30, backgroundColor: colorSet.timeTracker.softGray, borderRadius: 9999, ...CSS.centercenter }}>
                            <FontAwesome name="square" size={16} color={colorSet.timeTracker.softViolet} />
                        </View>
                        <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h3Light }}>{timeResume}</Text>
                        <Text style={{ color: colorSet.timeTracker.softViolet, ...fontSet.timeTracker.h5Light }}>{dateResume}</Text>
                    </View>
                    <View style={{ flex: 1, gap: 10 }}>
                        <View style={{ height: 30, width: 30, backgroundColor: colorSet.timeTracker.softGray, borderRadius: 9999, ...CSS.centercenter }}>
                            <FontAwesome5 name="play" size={14} color={colorSet.timeTracker.softViolet} />
                        </View>
                        <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h3Light }}>{timePause}</Text>
                        <Text style={{ color: colorSet.timeTracker.softViolet, ...fontSet.timeTracker.h5Light }}>{datePause}</Text>
                    </View>
                </View>
                <View style={{ gap: 10, marginVertical: 20 }}>
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: colorSet.timeTracker.softViolet, gap: 5 }}>
                        {/* {
                            activity.timestamps[activity.timestamps.length - 1].action === 'pause' &&

                            <View style={{ flex: 1, ...justifyBetween, ...itemsCenter }}>
                                <View style={{ width: '40%', backgroundColor: colorSet.timeTracker.green, height: 20, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></View>
                                <Txt text={'Your latest pause duration'} />
                            </View>
                        } */}
                        <View style={{ flex: 1, ...justifyBetween, ...itemsCenter }}>
                            <View style={{ width: '40%', backgroundColor: colorSet.timeTracker.cyan, height: 20, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></View>
                            <Txt text={'Tracking time'} />
                        </View>
                        <View style={{ flex: 1, ...justifyBetween, ...itemsCenter }}>
                            <View style={{ width: '40%', backgroundColor: colorSet.timeTracker.violet, height: 20, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></View>
                            <Txt text={'Rest time'} />
                        </View>
                    </View>
                    {
                        totalPauses === 0 ?
                            <View style={{ ...CSS.itemsCenter, gap: 10, ...CSS.justifyCenter }}>
                                <FontAwesome5 name="pause" size={20} color={colorSet.timeTracker.softViolet} />
                                <Text style={{ color: colorSet.timeTracker.softViolet, maxWidth: 280 }}>Started from {startDateTime}</Text>
                            </View>
                            :
                            <View style={{ ...CSS.itemsCenter, gap: 10, ...CSS.justifyCenter }}>
                                <FontAwesome5 name="pause" size={20} color={colorSet.timeTracker.softViolet} />
                                <Text style={{ color: colorSet.timeTracker.softViolet, maxWidth: 280 }}>Interupted on {'20/02/2004-08:20'}</Text>
                            </View>
                    }
                </View>
                <View style={{ gap: 10, marginVertical: 20 }}>
                    <View style={{ gap: 10, marginVertical: 20 }}>
                        {
                            seriesTimeDuration.length > 0 && seriesColors.length === seriesTimeDuration.length && // Fix this line

                            <PieChart
                                widthAndHeight={250}
                                series={seriesTimeDuration}
                                sliceColor={seriesColors}
                                coverRadius={0.8}
                                style={{ alignSelf: 'center' }}
                                coverFill={colorSet.timeTracker.black}
                            />
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignSelf: 'center',
        borderRadius: 999,
    },
    gradient: {
        borderRadius: 999,
    },
    absoluteContainer: {
        position: 'absolute',
        backgroundColor: colorSet.timeTracker.black,
        width: 110,
        height: 110,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        left: '50%',
        top: '50%',
        marginLeft: -55,
        marginTop: -55,
    },
});

export default DetailTimeTrackerScreen;
