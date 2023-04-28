import { COLORS, SIZES } from '../../../constants/theme'
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {
    getAllFriends,
    getAllUsers,
    getFriendRequests,
    handleFriendRequest,
    removeFriend,
    sendFriendRequest,
} from '../../../services/services'

import FriendCard from '../../../components/FriendCard'
import SearchBar from '../../../components/SearchBar'
import { UserContext } from '../../_layout'

const friends = () => {
    const { currentUser } = useContext(UserContext)
    const [searchValue, setSearchValue] = useState('')
    const [isFriendList, setIsFriendList] = useState(true)
    const [suggestedUsers, setSuggestedUsers] = useState()
    const [friends, setFriends] = useState()
    const [friendRequests, setFriendRequests] = useState()
    const [sentFriendRequests, setSentFriendRequests] = useState()

    useEffect(() => {
        ;(async () => {
            await fetchaAllFriends()
            await fetchAllRequests()
            await fetchAllSentRequests()
            await fetchSuggestedUsers()
        })()
    }, [])

    useEffect(() => {
        fetchSuggestedUsers(searchValue)
    }, [searchValue])

    const fetchaAllFriends = async () => {
        try {
            const res = await getAllFriends(currentUser.id)
            setFriends(res.data)
        } catch (error) {
            console.error(
                `Error received from fetchaAllFriends: ${JSON.stringify(error)}`
            )
        }
    }
    const fetchAllRequests = async () => {
        try {
            const res = await getFriendRequests('to', currentUser.id)
            setFriendRequests(res.data)
        } catch (error) {
            console.error(
                `Error received from fetchAllRequests: ${JSON.stringify(error)}`
            )
        }
    }
    const fetchAllSentRequests = async () => {
        try {
            const res = await getFriendRequests('from', currentUser.id)
            setSentFriendRequests(res.data)
        } catch (error) {
            console.error(
                `Error received from fetchAllSentRequests: ${JSON.stringify(
                    error
                )}`
            )
        }
    }

    const fetchSuggestedUsers = async (search) => {
        try {
            const users = await getAllUsers(search)
            const suggested =
                !friends || friends.length === 0
                    ? users.data
                    : users.data.filter(
                          (user) =>
                              !friends
                                  .map((friend) => friend.id)
                                  .includes(user.id) ||
                              !friendRequests
                                  .map((item) => item.fromId)
                                  .includes(user.id) ||
                              user.id !== currentUser.id
                      )
            setSuggestedUsers(suggested)
        } catch (error) {
            console.error(
                `Error received from fetchSuggestedUsers: ${JSON.stringify(
                    error
                )}`
            )
        }
    }

    const sendRequest = async (toId) => {
        try {
            await sendFriendRequest(currentUser.id, toId)
            await fetchAllSentRequests()
        } catch (error) {
            console.error(
                `Error received from sendRequest: ${JSON.stringify(error)}`
            )
        }
    }

    const friendRequestHandler = async (id, value) => {
        try {
            await handleFriendRequest(id, value)
            await fetchAllRequests()
            await fetchaAllFriends()
        } catch (error) {
            console.error(
                `Error received from friendRequestHandler: ${JSON.stringify(
                    error
                )}`
            )
        }
    }

    const unFriend = async (toId) => {
        try {
            const friends = await removeFriend(currentUser.id, toId)
            setFriends(friends)
        } catch (error) {
            console.error(
                `Error received from unFriend: ${JSON.stringify(error)}`
            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            {!isFriendList && (
                <SearchBar
                    onChange={setSearchValue}
                    value={'Search for friend'}
                />
            )}
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setIsFriendList(!isFriendList)}
            >
                <Text style={styles.buttonText}>
                    {isFriendList ? 'Add Friends' : 'Show Friends'}
                </Text>
            </TouchableOpacity>
            {isFriendList ? (
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={friends}
                        renderItem={({ item: friend }) => (
                            <FriendCard
                                type="friend"
                                data={friend}
                                onFunction={() => unFriend(friend.id)}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : (
                <View style={{ flex: 1, marginTop: 10 }}>
                    {!searchValue && (
                        <View style={{ maxHeight: 250 }}>
                            {friendRequests && friendRequests.length !== 0 && (
                                <>
                                    <Text
                                        style={[styles.labelText, styles.label]}
                                    >
                                        Friend Requests
                                    </Text>
                                    <FlatList
                                        data={friendRequests}
                                        renderItem={({
                                            item: friendRequests,
                                        }) => {
                                            console.log('item', friendRequests)
                                            return (
                                                <FriendCard
                                                    type="request"
                                                    data={{
                                                        ...friendRequests.fromUser,
                                                        reqId: friendRequests.id,
                                                    }}
                                                    handler={
                                                        friendRequestHandler
                                                    }
                                                />
                                            )
                                        }}
                                        keyExtractor={(item) => item.id}
                                        scrollEnabled={true}
                                    />
                                </>
                            )}
                            <Text style={[styles.labelText, styles.label]}>
                                Friend Suggestions
                            </Text>
                        </View>
                    )}

                    <FlatList
                        data={suggestedUsers}
                        renderItem={({ item: suggested }) => (
                            <FriendCard
                                type="suggestion"
                                data={suggested}
                                pending={
                                    sentFriendRequests
                                        ?.map((request) => request.toId)
                                        .includes(suggested.toId) ?? false
                                }
                                onFunction={() => sendRequest(suggested.id)}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: COLORS.secondaryHover,
        marginTop: 10,
        width: '100%',
        padding: 10,
        borderRadius: SIZES.sm,
    },
    buttonText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        width: '100%',
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.sm,
    },
    labelText: {
        color: COLORS.secondaryHover,
        fontSize: SIZES.md,
        fontWeight: 'bold',
    },
})

export default friends
