import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

const TimePicker = () => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [alarmSound, setAlarmSound] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTime]);

  const checkTime = () => {
    if(selectedTime)
    {
      console.log(selectedTime.getHours() + " : " + selectedTime.getMinutes() + " = " + new Date().getHours() + " : " + new Date().getMinutes());
      if(selectedTime.getHours() == new Date().getHours() && selectedTime.getMinutes() == new Date().getMinutes())
      {
        playAlarmSound();
        setSelectedTime(null);
      }
    }
  }

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    scheduleAlarm(time);
    hideTimePicker();
  };

  const scheduleAlarm = async (time) => {
    try {
      const dateTime = new Date();
      dateTime.setHours(time.getHours());
      dateTime.setMinutes(time.getMinutes());

      const schedulingOptions = {
        content: {
          title: 'Alarm!',
          body: 'Time to wake up!',
        },
        trigger: {
          date: dateTime.getTime(), 
        },
      };
  
      await Notifications.scheduleNotificationAsync(schedulingOptions);
  
      // playAlarmSound();
    } catch (error) {
      console.error('Error scheduling alarm:', error);
    }
  };
  

  const playAlarmSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/alarm.mp3')
      );
      await sound.playAsync();
      setAlarmSound(sound);
    } catch (error) {
      console.error('Error playing alarm sound:', error);
    }
  };

  const dismissAlarm = async () => {
    try {
      if (alarmSound) {
        await alarmSound.stopAsync();
        await alarmSound.unloadAsync();
        setAlarmSound(null);
      }
    } catch (error) {
      console.error('Error dismissing alarm sound:', error);
    }
  };

  return (
    <View>
      <Button title="Set Alarm" onPress={showTimePicker} />
      <Text>Selected Time: {selectedTime ? selectedTime.toLocaleTimeString() : 'None'}</Text>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <Button title="Test Alarm" onPress={playAlarmSound} disabled={!selectedTime} />
      <Button title="Dismiss Alarm" onPress={dismissAlarm} disabled={!alarmSound} />
    </View>
  );
};

export default TimePicker;
