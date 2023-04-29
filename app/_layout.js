import * as Device from 'expo-device'
import * as Network from 'expo-network'
import * as Notifications from 'expo-notifications'

import { COLORS, SIZES } from '../constants/theme'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import { postPushToken } from '../services/services'

export const UserContext = React.createContext({
    user: null,
    setUser: () => {},
})
export const NetworkContext = React.createContext({
    internetAccess: true,
    setNetworkStatus: () => {},
})

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
})

async function registerForPushNotificationsAsync() {
    let token
    if (Device.isDevice) {
        try {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!')
                return
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId: 'fafe2249-e7e0-4969-98ba-30d44009646d',
                })
            ).data
            console.log(token)
            await postPushToken(token)
        } catch (error) {
            console.error(error)
        }
    } else {
        alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    return token
}

export const ws = new WebSocket(`${API_URL}`)

const Layout = () => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState(null)
    const [internetAccess, setInternetAccess] = useState(true)
    const [_, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
        checkConnection()

        registerForPushNotificationsAsync()

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification)
            })

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response)
                }
            )

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )
            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }
    }, [])

    useEffect(() => {
        ;(async () =>
            await AsyncStorage.setItem(
                '@userData',
                JSON.stringify(currentUser)
            ))()
    }, [currentUser])

    const checkConnection = (interval) => {
        setInterval(
            async () => {
                const network = await Network.getNetworkStateAsync()
                if (internetAccess !== network.isInternetReachable) {
                    setInternetAccess(network.isInternetReachable)
                }
            },
            interval ? interval * 1000 : 5000
        )
    }

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NetworkContext.Provider
                value={{ internetAccess, setInternetAccess }}
            >
                <Stack
                    screenOptions={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: COLORS.primary,
                        },
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 10,
                                }}
                                onPress={() => router.push('/main/home')}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: SIZES.xl,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Memory
                                </Text>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10 }}
                                onPress={() => router.push('/main/account')}
                            >
                                <UserCircleIcon color={'white'} size={28} />
                            </TouchableOpacity>
                        ),
                        headerTitle: internetAccess ? '' : '-offline mode-',
                    }}
                />
            </NetworkContext.Provider>
        </UserContext.Provider>
    )
}

export default Layout
