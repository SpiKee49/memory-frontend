import { COLORS, SIZES } from '../constants/theme'
import {
    CheckCircleIcon,
    UserCircleIcon,
    UserMinusIcon,
    UserPlusIcon,
    XCircleIcon,
} from 'react-native-heroicons/solid'
import { Text, TouchableOpacity, View } from 'react-native'

import React from 'react'

function FriendCard(props) {
    const { type } = props
    const isFriend = type === 'friend'
    const isRequest = type === 'request'
    const isSuggestion = type === 'suggestion'
    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                marginHorizontal: 20,
                marginVertical: 10,
                borderRadius: 25,
            }}
        >
            <View
                style={{
                    marginVertical: 5,
                    marginHorizontal: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                    }}
                >
                    <UserCircleIcon size={50} color={COLORS.secondary} />
                    <Text
                        style={{
                            color: COLORS.secondaryHover,
                            fontSize: SIZES.md,
                            fontWeight: 'bold',
                        }}
                    >
                        {isFriend ? "Friend's name" : 'Profile name'}
                    </Text>
                </View>
                {isFriend && (
                    <TouchableOpacity>
                        <UserMinusIcon size={24} color={COLORS.alert} />
                    </TouchableOpacity>
                )}
                {isRequest && (
                    <View>
                        <TouchableOpacity>
                            <CheckCircleIcon
                                size={24}
                                color={COLORS.secondary}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <XCircleIcon size={24} color={COLORS.alert} />
                        </TouchableOpacity>
                    </View>
                )}
                {isSuggestion && (
                    <TouchableOpacity>
                        <UserPlusIcon size={24} color={COLORS.secondary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FriendCard
