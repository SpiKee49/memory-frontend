import { COLORS, SIZES } from '../constants/theme'
import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { API_URL } from '@env'
import { UserContext } from './_layout'
import axios from 'axios'

const Login = () => {
    const router = useRouter()

    const { setCurrentUser } = React.useContext(UserContext)
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [profileName, setProfileName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const login = async () => {
        try {
            console.log(username, password)
            const user = await axios.post(`${API_URL}/api/users/login`, {
                username,
                password,
            })
            setCurrentUser(user.data)
            router.push('/main/home')
        } catch (error) {
            console.error(error) // NOTE - use "error.response.data` (not "error")
        }
    }

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
                    onPress={isRegister ? () => {} : () => login()}
                >
                    <Text style={[styles.buttonText, { fontSize: SIZES.md }]}>
                        {isRegister ? 'Register' : 'Login'}
                    </Text>
                </TouchableOpacity>

                {/*Login/Register switch*/}
                <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
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
