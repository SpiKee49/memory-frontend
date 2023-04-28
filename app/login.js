import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { getProfile, login, register } from '../services/services'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from './_layout'

const Login = () => {
    const router = useRouter()

    const { setCurrentUser } = React.useContext(UserContext)
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [profileName, setProfileName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onLogin = async () => {
        if (isRegister && password !== repeatPassword) {
            Alert.alert('Register Error', "Passwords don't match", [
                { text: 'OK' },
            ])
            return
        }
        setIsLoading(true)
        try {
            const response = isRegister
                ? await register({ username, profileName, email, password })
                : await login({ username, password })
            const { accessToken, refreshToken } = response.data

            if (accessToken && refreshToken) {
                await AsyncStorage.setItem('@accessToken', accessToken)
                await AsyncStorage.setItem('@refreshToken', refreshToken)
                await AsyncStorage.setItem('@username', username)
                const user = await getProfile(username)

                setCurrentUser(user.data)
                setIsLoading(false)
                router.push('/main/home')
                setUsername('')
                setPassword('')
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        setIsLoading(true)
        ;(async () => {
            const accessToken = await AsyncStorage.getItem('@accessToken')
            const refreshToken = await AsyncStorage.getItem('@refreshToken')
            const username = await AsyncStorage.getItem('@username')
            if (accessToken && refreshToken && username) {
                const user = await getProfile(username)

                setCurrentUser(user.data)
                router.push('/main/home')
            }
            setIsLoading(false)
        })()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color={COLORS.secondary}
                        style={{ marginTop: 20 }}
                    />
                ) : (
                    <>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 40,
                                gap: 5,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: SIZES.xxl,
                                    fontWeight: 'bold',
                                    paddingHorizontal: 40,
                                    paddingBottom: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: COLORS.secondary,
                                }}
                            >
                                Memory
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.secondary,
                                    fontSize: SIZES.md,
                                    fontStyle: 'italic',
                                }}
                            >
                                for moments to remember
                            </Text>
                        </View>
                        <TextInput
                            style={styles.default}
                            placeholder="Username"
                            onChangeText={(text) => {
                                setUsername(text)
                            }}
                            placeholderTextColor={COLORS.secondary}
                        />
                        {isRegister && (
                            <TextInput
                                style={styles.default}
                                placeholder="Profile name"
                                value={profileName}
                                onChangeText={setProfileName}
                                placeholderTextColor={COLORS.secondary}
                            />
                        )}
                        {isRegister && (
                            <TextInput
                                style={styles.default}
                                placeholder="E-mail"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={COLORS.secondary}
                            />
                        )}
                        <TextInput
                            style={styles.default}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor={COLORS.secondary}
                        />
                        {isRegister && (
                            <TextInput
                                style={styles.default}
                                placeholder="Repeat password"
                                secureTextEntry={true}
                                value={repeatPassword}
                                onChangeText={setRepeatPassword}
                                placeholderTextColor={COLORS.secondary}
                            />
                        )}

                        {/*Register Button*/}
                        <TouchableOpacity
                            style={[styles.buttonStyle]}
                            onPress={() => onLogin()}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    { fontSize: SIZES.md },
                                ]}
                            >
                                {isRegister ? 'Register' : 'Login'}
                            </Text>
                        </TouchableOpacity>

                        {/*Login/Register switch*/}
                        <TouchableOpacity
                            onPress={() => setIsRegister(!isRegister)}
                        >
                            <Text
                                style={{
                                    fontSize: SIZES.md,
                                    color: COLORS.secondary,
                                    marginTop: 10,
                                }}
                            >
                                {isRegister ? 'Log in' : 'Sign up'}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: COLORS.primaryHover,
        marginTop: 10,
        width: '100%',
        padding: 10,
        color: COLORS.secondaryHover,
        fontWeight: 'bold',
        borderRadius: SIZES.sm,
    },
    centeredView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: COLORS.secondaryHover,
        marginTop: 10,
        width: '100%',
        padding: 10,
        borderRadius: SIZES.sm,
    },
    buttonText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        color: COLORS.secondaryHover,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Login
