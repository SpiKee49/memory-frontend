import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { COLORS, SIZES } from '../../../constants/theme'
import { NetworkContext, UserContext } from '../../_layout'
import React, { useContext, useEffect, useState } from 'react'
import { getAlbumDetail, likePost } from '../../../services/services'

import NoInternet from '../../../components/NoInternet'
import PostCard from '../../../components/PostCard'
import { useSearchParams } from 'expo-router'
import { ws } from '../../_layout'

const Detail = () => {
    const { id } = useSearchParams()
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { internetAccess } = useContext(NetworkContext)
    const [album, setAlbum] = useState(null)

    useEffect(() => {
        if (internetAccess) fetchAlbumDetail()
    }, [id])

    const fetchAlbumDetail = async () => {
        if (id == null) return
        try {
            const res = await getAlbumDetail(id)
            setAlbum(res.data)
        } catch (error) {
            console.error(
                `Error received from fetchAlbumDetail: ${JSON.stringify(error)}`
            )
        }
    }

    const addLike = async (postId) => {
        try {
            const res = await likePost(currentUser.id, postId)
            setCurrentUser({ ...currentUser, ...res.data })
            ws.send('update')
        } catch (error) {
            console.error(
                `Error received from addLike: ${JSON.stringify(error)}`
            )
        }
    }

    if (!internetAccess) {
        return <NoInternet />
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
                                onLike={addLike}
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
