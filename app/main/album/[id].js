import { COLORS, SIZES } from '../../../constants/theme'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { API_URL } from '@env'
import PostCard from '../../../components/PostCard'
import axios from 'axios'
import { useSearchParams } from 'expo-router'

const Detail = () => {
    const { id } = useSearchParams()

    const [album, setAlbum] = useState(null)

    useEffect(() => {
        fetchAlbumDetail()
    }, [])

    const fetchAlbumDetail = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/albums/${id}`)
            setAlbum(res.data)
        } catch (error) {
            console.error(error.data)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View
                style={{
                    width: '100%',
                    backgroundColor: COLORS.primary,
                    paddingBottom: 10,
                }}
            >
                <Text style={styles.title}>
                    {album?.title ?? 'Album title'}
                </Text>
                <Text style={[styles.title, { fontSize: SIZES.sm }]}>
                    {album?.description ?? 'Album description'}
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

const styles = StyleSheet.create({
    title: {
        color: COLORS.secondary,
        padding: 10,
        paddingHorizontal: 25,
        fontSize: SIZES.lg,
        fontWeight: 'bold',
    },
})

export default Detail
