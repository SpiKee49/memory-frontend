import { COLORS, SIZES } from '../constants/theme'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'

function AlbumCard(props) {
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

                <TouchableOpacity style={{ opacity: 0.2 }}>
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
