import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { API_URL } from '@env'
import AlbumCard from '../../components/AlbumCard'
import { COLORS } from '../../constants/theme'
import { UserContext } from '../_layout'
import axios from 'axios'
import { useRouter } from 'expo-router'

const Home = () => {
    const router = useRouter()
    const [albums, setAlbums] = useState([])
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        fetchAlbums()
    }, [])

    const fetchAlbums = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/api/users/${currentUser.id}`,
                { headers: { 'Content-Type': 'application/json' } }
            )
            setAlbums(res.data.followedAlbums)
            router.push('/main/home')
        } catch (error) {
            console.error(
                `Error received from axios.post: ${JSON.stringify(error)}`
            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View>
                {albums.length === 0 ? (
                    <ActivityIndicator
                        size="large"
                        color={COLORS.secondary}
                        style={{ marginTop: 20 }}
                    />
                ) : (
                    <FlatList
                        data={albums}
                        renderItem={({ item }) => (
                            <AlbumCard
                                album={item}
                                onPress={() =>
                                    router.push(`/main/album/${item.id}`)
                                }
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default Home
