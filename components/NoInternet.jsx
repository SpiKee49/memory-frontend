import { COLORS, SIZES } from '../constants/theme'
import { SafeAreaView, Text, View } from 'react-native'

import React from 'react'

const NoInternet = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View
                style={{
                    flex: 1,
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
                    No internet connection
                </Text>
                <Text
                    style={{
                        color: COLORS.secondary,
                        fontSize: SIZES.md,
                        fontStyle: 'italic',
                    }}
                >
                    please connect to internet to access wanted data
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default NoInternet
