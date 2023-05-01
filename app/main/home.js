import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import React, { useContext, useEffect, useState } from 'react'

import AlbumCard from '../../components/AlbumCard'
import { UserContext } from '../_layout'
import { useRouter } from 'expo-router'

const Home = () => {
    const router = useRouter()
    const { currentUser } = useContext(UserContext)
    const [albums, setAlbums] = useState()

    useEffect(() => {
        setAlbums(currentUser.followedAlbums)
    }, [])
    useEffect(() => {
        setAlbums(currentUser.followedAlbums)
    }, [currentUser])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View>
                {albums == undefined ? (
                    <ActivityIndicator
                        size="large"
                        color={COLORS.secondary}
                        style={{ marginTop: 20 }}
                    />
                ) : (
                    <View>
                        {albums.length === 0 ? (
                            <View
                                style={{
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
                                    No albums to be found
                                </Text>
                                <Text
                                    style={{
                                        color: COLORS.secondary,
                                        fontSize: SIZES.md,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    follow some albums to see them here
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={albums}
                                renderItem={({ item }) => (
                                    <AlbumCard
                                        album={item}
                                        onPress={() =>
                                            router.push(
                                                `/main/album/${item.id}`
                                            )
                                        }
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Home
