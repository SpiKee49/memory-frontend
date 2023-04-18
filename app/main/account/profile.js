import { COLORS, SIZES } from '../../../constants/theme'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { SafeAreaView } from 'react-native'
import { UserCircleIcon } from 'react-native-heroicons/solid'

const profile = () => {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.backdrop, gap: 20 }}
        >
            <View
                style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <UserCircleIcon
                    color={COLORS.secondary}
                    size={84}
                    style={{ width: 20 }}
                />
                <Text style={styles.profileData}>Full name</Text>
                <Text style={styles.profileData}>username</Text>
                <Text style={styles.profileData}>email@email.com</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text style={styles.textStyle}>Change Name</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text style={styles.textStyle}>Change Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text style={styles.textStyle}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.button, styles.buttonStyle]}
                onPress={() => {}}
            >
                <Text style={[styles.textStyle, styles.buttonText]}>
                    Log out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileData: {
        width: 'auto',
        color: COLORS.secondary,
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: COLORS.secondaryHover,
    },
    button: {
        backgroundColor: COLORS.primaryHover,
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: SIZES.sm,
    },
    textStyle: {
        color: COLORS.secondaryHover,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        color: COLORS.primary,
    },
})

export default profile
