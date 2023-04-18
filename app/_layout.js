import { COLORS, SIZES } from '../constants/theme'
import { Stack, useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

import { UserCircleIcon } from 'react-native-heroicons/solid'

const Layout = () => {
    const router = useRouter()
    return (
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
    )
}

export default Layout
