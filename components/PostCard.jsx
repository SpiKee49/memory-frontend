import { COLORS, SIZES } from '../constants/theme'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { HeartIcon } from 'react-native-heroicons/solid'
import { encode as btoa } from 'base-64'
import { getLikes } from '../services/services'
import { ws } from '../app/_layout'

const PostCard = (props) => {
    const [likes, setLikes] = useState(props.liked ? 1 : 0)
    const [liked, setLiked] = useState(props.liked ?? false)

    ws.onmessage = (data) => {
        fetchLikes()
    }

    useEffect(() => {
        fetchLikes()
    }, [])

    const arrayBufferToBase64 = (buffer) => {
        let binary = ''
        let bytes = new Uint8Array(buffer)
        let len = bytes.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return btoa(binary)
    }

    const fetchLikes = async () => {
        try {
            const res = await getLikes(props.post.id)
            setLikes(res.data)
        } catch (error) {
            console.error(
                `Error received from axios.post: ${JSON.stringify(error)}`
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
                    flex: 1,
                }}
            >
                <Image
                    style={{
                        flex: 1,
                        width: undefined,
                        height: undefined,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                    }}
                    source={{
                        uri:
                            `data:image/png;base64,` +
                            arrayBufferToBase64(props.post.photo.data),
                    }}
                    resizeMode="cover"
                />
            </View>
            <View
                style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    padding: SIZES.sm,
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text
                        style={{
                            color: COLORS.secondaryHover,
                            fontSize: SIZES.md,
                            fontWeight: 'bold',
                        }}
                    >
                        {props.post?.title ?? 'Post Title'}
                    </Text>
                    <Text
                        style={{
                            color: COLORS.secondaryHover,
                            fontSize: SIZES.sm,
                        }}
                    >
                        {props.post?.description ?? 'Post Description'}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            props.onLike(props.post.id)
                            setLikes(liked ? likes - 1 : likes + 1)
                            setLiked(!liked)
                        }}
                    >
                        <HeartIcon
                            size={24}
                            color={COLORS.secondary}
                            style={{ opacity: liked ? 1 : 0.2 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.secondary }}>
                        {likes ?? '1111'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default PostCard
