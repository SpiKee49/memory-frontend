import { COLORS, SIZES } from '../constants/theme'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { HeartIcon } from 'react-native-heroicons/solid'
import React from 'react'

const PostCard = () => {
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
                        Post Title
                    </Text>
                    <Text
                        style={{
                            color: COLORS.secondaryHover,
                            fontSize: SIZES.sm,
                        }}
                    >
                        Post description
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
                        <HeartIcon size={24} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.secondary }}>1111</Text>
                </View>
            </View>
        </View>
    )
}

export default PostCard
