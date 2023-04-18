import { COLORS, SIZES } from '../../../constants/theme'
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useState } from 'react'

import FriendCard from '../../../components/FriendCard'
import SearchBar from '../../../components/SearchBar'

const friends = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isFriendList, setIsFriendList] = useState(true)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <SearchBar onChange={setSearchValue} value={'Search for friend'} />
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
                        data={Array.from({ length: 10 }, (_, i) => i + 1)}
                        renderItem={({ item }) => <FriendCard type="friend" />}
                        keyExtractor={(item) => item}
                    />
                </View>
            ) : (
                <View style={{ flex: 1, marginTop: 10 }}>
                    {!searchValue && (
                        <View style={{ maxHeight: 250 }}>
                            <Text style={[styles.labelText, styles.label]}>
                                Friend Requests
                            </Text>
                            <FlatList
                                data={Array.from(
                                    { length: 20 },
                                    (_, i) => i + 1
                                )}
                                renderItem={({ item }) => (
                                    <FriendCard type="request" />
                                )}
                                keyExtractor={(item) => item}
                                scrollEnabled={true}
                            />
                            <Text style={[styles.labelText, styles.label]}>
                                Friend Suggestions
                            </Text>
                        </View>
                    )}

                    <FlatList
                        data={Array.from({ length: 10 }, (_, i) => i + 1)}
                        renderItem={({ item }) => (
                            <FriendCard type="suggestion" />
                        )}
                        keyExtractor={(item) => item}
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
