import React, { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Subscription } from "expo-modules-core"
import { Background } from './src/components/Background';
import { Home } from './src/screens/Home';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import "./src/services/notificationConfigs"
import { getNotificationToken } from "./src/services/getPushNotificationToken"

import * as Notifications from 'expo-notifications';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getNotificationToken()
  })

  useEffect(() => {
    // Sl3fGvCwSRvZhz62DPVTua
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification)
      })

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    })


    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])

  return (
    <Background>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      ></StatusBar>
      {fontsLoaded ? <Routes /> : <Loading></Loading>}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {},
});
