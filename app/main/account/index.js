import { Text, View } from 'react-native'

import { COLORS } from '../../../constants/theme'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { UserCircleIcon } from 'react-native-heroicons/solid'

const index = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <UserCircleIcon color={COLORS.secondary} size={24} />
                <Text>Full name</Text>
                <Text>username</Text>
                <Text>email@email.com</Text>
            </View>
        </SafeAreaView>
    )
}

export default index
