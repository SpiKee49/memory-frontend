import { COLORS, SIZES } from '../constants/theme'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { API_URL } from '@env'
import { HeartIcon } from 'react-native-heroicons/solid'
import axios from 'axios'

const PostCard = (props) => {
    const [likes, setLikes] = useState(0)

    useEffect(() => {
        fetchLikes()
    }, [])

    const fetchLikes = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/api/posts/${parseInt(props.post.id, 10)}/likes`
            )
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
                    source={require('../public/images/placeholder-image.jpg')}
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
                    <TouchableOpacity>
                        <HeartIcon
                            size={24}
                            color={COLORS.secondary}
                            style={{ opacity: props.liked ? 1 : 0.2 }}
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
