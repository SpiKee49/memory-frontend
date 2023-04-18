import { Stack } from 'expo-router'

export default Layout = () => {
    return (
        <Stack
            initialRouteName="profile"
            screenOptions={{
                headerShown: false,
            }}
        />
    )
}
