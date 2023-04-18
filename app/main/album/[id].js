import { COLORS, SIZES } from '../../../constants/theme'
import { FlatList, SafeAreaView, Text, View } from 'react-native'

import PostCard from '../../../components/PostCard'
import React from 'react'
import { useSearchParams } from 'expo-router'

const Detail = () => {
    const { id } = useSearchParams()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View
                style={{
                    width: '100%',
                    backgroundColor: COLORS.primary,
                }}
            >
                <Text
                    style={{
                        color: COLORS.secondary,
                        padding: 10,
                        paddingHorizontal: 25,
                        fontSize: SIZES.lg,
                        fontWeight: 'bold',
                    }}
                >
                    Album title {id}
                </Text>
            </View>
            <View>
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    renderItem={({ item }) => <PostCard />}
                    keyExtractor={(item) => item}
                />
            </View>
        </SafeAreaView>
    )
}

export default Detail
