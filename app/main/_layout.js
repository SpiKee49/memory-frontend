import {
    FolderPlusIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    UserGroupIcon,
} from 'react-native-heroicons/solid'

import { COLORS } from '../../constants/theme'
import { Tabs } from 'expo-router'

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    height: 60,
                },
                tabBarLabelStyle: {
                    marginBottom: 10,
                },
                tabBarIconStyle: { marginTop: 10 },
                tabBarLabelPosition: 'below-icon',
                headerShadowVisible: false,
                tabBarActiveTintColor: COLORS.secondaryHover,
                tabBarInactiveTintColor: COLORS.secondary,
                tabBarActiveBackgroundColor: COLORS.primaryHover,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeIcon color={color} size={24} />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ color }) => (
                        <MagnifyingGlassIcon color={color} size={24} />
                    ),
                    tabBarLabel: 'Explore',
                }}
            />
            <Tabs.Screen
                name="addPost"
                options={{
                    tabBarIcon: ({ color }) => (
                        <PlusIcon color={color} size={24} />
                    ),
                    tabBarLabel: 'Add Post',
                }}
            />
            <Tabs.Screen
                name="addAlbum"
                options={{
                    tabBarIcon: ({ color }) => (
                        <FolderPlusIcon color={color} size={24} />
                    ),
                    tabBarLabel: 'Add Album',
                }}
            />
            <Tabs.Screen
                name="friends"
                options={{
                    tabBarIcon: ({ color }) => (
                        <UserGroupIcon color={color} size={24} />
                    ),
                    tabBarLabel: 'Friend',
                }}
            />
        </Tabs>
    )
}

export default Layout
