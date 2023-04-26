import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAxiosClient } from './createAxiosClient'
import { useRouter } from 'expo-router'

const REFRESH_TOKEN_URL = `${API_URL}auth/refreshToken`
const BASE_URL = API_URL

async function getCurrentAccessToken() {
    try {
        const accessToken = await AsyncStorage.getItem('@accessToken')
        return accessToken
    } catch (e) {
        console.error(e)
    }
}

async function getCurrentRefreshToken() {
    try {
        const refreshToken = await AsyncStorage.getItem('@refreshToken')
        return refreshToken
    } catch (e) {
        console.error(e)
    }
}

async function setRefreshedTokens(tokens) {
    console.log('Setting new tokens...')
    try {
        await AsyncStorage.setItem('@accessToken', tokens.accessToken)
        await AsyncStorage.setItem('@refreshToken', tokens.refreshToken)
    } catch (e) {
        console.error(e)
    }
}

async function logout() {
    console.log('Logging out...')

    try {
        await AsyncStorage.removeItem('@accessToken')
        await AsyncStorage.removeItem('@refreshToken')
        useRouter().push('/login')
    } catch (e) {
        console.error(e)
    }
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens,
})
