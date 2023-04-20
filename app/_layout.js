import { COLORS, SIZES } from '../constants/theme'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

import { UserCircleIcon } from 'react-native-heroicons/solid'

export const UserContext = React.createContext({
    user: null,
    setUser: () => {},
})

const Layout = () => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState(null)
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
                    headerTitle: '',
                }}
            />
        </UserContext.Provider>
    )
}

export default Layout
