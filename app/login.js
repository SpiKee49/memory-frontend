import { COLORS, SIZES } from '../constants/theme'
import React, { useState } from 'react'
import { SafeAreaView, Text, TextInput, View } from 'react-native'

const login = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [profileName, setProfileName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View
                style={{
                    height: 600,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >
                <TextInput
                    style={styles.default}
                    placeholder="Username"
                    value={username}
                    onTextChange={setUsername}
                    placeholderTextColor={COLORS.secondary}
                />
                {isRegister && (
                    <TextInput
                        style={styles.default}
                        placeholder="Profile name"
                        value={profileName}
                        onTextChange={setProfileName}
                        placeholderTextColor={COLORS.secondary}
                    />
                )}
                {isRegister && (
                    <TextInput
                        style={styles.default}
                        placeholder="E-mail"
                        value={email}
                        onTextChange={setEmail}
                        placeholderTextColor={COLORS.secondary}
                    />
                )}
                <TextInput
                    style={styles.default}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onTextChange={setPassword}
                    placeholderTextColor={COLORS.secondary}
                />
                {isRegister && (
                    <TextInput
                        style={styles.default}
                        placeholder="Repeat password"
                        secureTextEntry={true}
                        value={repeatPassword}
                        onTextChange={setRepeatPassword}
                        placeholderTextColor={COLORS.secondary}
                    />
                )}

                {/*Register Button*/}
                <TouchableOpacity
                    style={[styles.buttonStyle]}
                    onPress={() => {}}
                >
                    <Text style={[styles.buttonText, { fontSize: SIZES.md }]}>
                        {isRegister ? 'Register' : 'Login'}
                    </Text>
                </TouchableOpacity>

                {/*Login/Register switch*/}
                <TouchableOpacity onPress={() => isRegister(!isRegister)}>
                    <Text
                        style={[
                            styles.buttonText,
                            { fontSize: SIZES.md, textDecoration: 'underline' },
                        ]}
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

export default login
