import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { COLORS, SIZES } from '../../../constants/theme'
import React, { useContext, useEffect, useState } from 'react'

import { API_URL } from '@env'
import PostCard from '../../../components/PostCard'
import { UserContext } from '../../_layout'
import axios from 'axios'
import { useSearchParams } from 'expo-router'

const Detail = () => {
    const { id } = useSearchParams()
    const { currentUser } = useContext(UserContext)

    const [album, setAlbum] = useState(null)

    useEffect(() => {
        console.log(JSON.stringify(currentUser))
        fetchAlbumDetail()
    }, [id])

    const fetchAlbumDetail = async () => {
        if (id == null) return
        try {
            const res = await axios.get(
                `${API_URL}/api/albums/${parseInt(id, 10)}`
            )
            setAlbum(res.data)
        } catch (error) {
            console.error(
                `Error received from axios.post: ${JSON.stringify(error)}`
            )
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
                <Text
                    style={[
                        styles.title,
                        { fontSize: SIZES.sm, fontWeight: 'normal' },
                    ]}
                >
                    Tagy:{' '}
                    {album?.tags.map((item, idx) => {
                        return `${item}${
                            idx !== album.tags.length - 1 ? ', ' : ' '
                        }`
                    }) ?? 'Album tags'}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                {album && album.posts ? (
                    <FlatList
                        data={album.posts}
                        renderItem={({ item }) => (
                            <PostCard
                                post={item}
                                liked={currentUser.likedPosts
                                    .map((post) => post.id)
                                    .includes(item.id)}
                            />
                        )}
                        keyExtractor={(post) => post.id}
                    />
                ) : (
                    <ActivityIndicator size="large" color={COLORS.secondary} />
                )}
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
