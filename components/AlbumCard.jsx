import { COLORS, SIZES } from '../constants/theme'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { StarIcon } from 'react-native-heroicons/solid'
import { UserContext } from '../app/_layout'
import { followAlbum } from '../services/services'

function AlbumCard(props) {
    const [isFollowing, setIsFollowing] = useState(false)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        setIsFollowing(
            currentUser.followedAlbums
                .map((album) => album.id)
                .includes(props.album.id)
        )
    }, [])
    useEffect(() => {
        setIsFollowing(
            currentUser.followedAlbums
                .map((album) => album.id)
                .includes(props.album.id)
        )
    }, [currentUser])

    const handleFollow = async () => {
        try {
            const res = await followAlbum(currentUser.id, props.album.id)
            setCurrentUser({ ...currentUser, ...res.data })
        } catch (error) {
            console.error(
                `Error received from addLike: ${JSON.stringify(error)}`
            )
        }
    }

    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                height: 300,
                marginHorizontal: 20,
                marginVertical: 20,
                borderRadius: 25,
            }}
        >
            <View
                style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    padding: SIZES.sm,
                    justifyContent: 'space-between',
                }}
            >
                <View style={{ width: '85%' }}>
                    <Text
                        style={{
                            color: COLORS.secondaryHover,
                            fontSize: SIZES.md,
                            fontWeight: 'bold',
                        }}
                    >
                        {props.album.title ?? 'Album Title'}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.secondaryHover,
                            fontSize: SIZES.sm,
                        }}
                    >
                        {props.album.description ??
                            'Short album description / tags'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={{ opacity: isFollowing ? 1 : 0.2 }}
                    onPress={() => {
                        handleFollow()
                        setIsFollowing(!isFollowing)
                    }}
                >
                    <StarIcon color={COLORS.secondary} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{
                    flex: 1,
                }}
                onPress={props.onPress}
            >
                <Image
                    style={{
                        flex: 1,
                        width: undefined,
                        height: undefined,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                    }}
                    source={require('../public/images/placeholder-image.jpg')}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    )
}

export default AlbumCard
