import { COLORS, SIZES } from '../../constants/theme'
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    FolderIcon,
    GlobeAltIcon,
    PlusCircleIcon,
} from 'react-native-heroicons/solid'
import React, { useState } from 'react'

import SearchBar from '../../components/SearchBar'

const addPost = () => {
    const [albumModalVisible, setAlbumModalVisible] = useState(true)
    const [locationModalVisible, setLocationModalVisible] = useState(false)
    const [searchAlbum, setSearchAlbum] = useState('')
    const [searchLocation, setSearchLocation] = useState('')

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <View
                style={{
                    height: 600,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 0.8,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.primaryHover,
                        borderRadius: SIZES.sm,
                        gap: 5,
                    }}
                >
                    <PlusCircleIcon size={24} color={COLORS.secondary} />
                    <Text
                        style={{ color: COLORS.secondary, fontSize: SIZES.lg }}
                    >
                        Add photo
                    </Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.default}
                    placeholder="Post Title"
                    placeholderTextColor={COLORS.secondary}
                />
                <TextInput
                    style={styles.default}
                    placeholder="Description"
                    placeholderTextColor={COLORS.secondary}
                />

                {/* Select Album Modal */}
                <Modal
                    animationType="slide"
                    visible={albumModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        setAlbumModalVisible(!albumModalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Select Album for post
                            </Text>
                            <SearchBar
                                onChange={setSearchAlbum}
                                value="Search for album"
                            />
                            <View style={styles.modalAlbumList}>
                                <Text
                                    style={[
                                        styles.modalText,
                                        { textAlign: 'center' },
                                    ]}
                                >
                                    Albums
                                </Text>
                                <View
                                    style={{
                                        marginVertical: 10,
                                        borderBottomColor: COLORS.secondary,
                                        borderBottomWidth:
                                            StyleSheet.hairlineWidth,
                                    }}
                                />
                                <FlatList
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.default}
                                        >
                                            <Text style={styles.textStyle}>
                                                Tasty Album {item}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() =>
                                    setAlbumModalVisible(!albumModalVisible)
                                }
                            >
                                <Text style={styles.buttonText}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.default, styles.buttonWithIcon]}
                    onPress={() => setAlbumModalVisible(true)}
                >
                    <FolderIcon size={24} color={COLORS.secondary} />
                    <Text style={styles.textStyle}>Select Album</Text>
                </TouchableOpacity>

                {/* Select Location Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={locationModalVisible}
                    onRequestClose={() => {
                        setLocationModalVisible(!locationModalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Select Location for post
                            </Text>
                            <SearchBar
                                onChange={setSearchLocation}
                                value="Search for location"
                            />
                            <View style={styles.modalAlbumList}>
                                <Text
                                    style={[
                                        styles.modalText,
                                        { textAlign: 'center' },
                                    ]}
                                >
                                    Locations
                                </Text>
                                <View
                                    style={{
                                        marginVertical: 10,
                                        borderBottomColor: COLORS.secondary,
                                        borderBottomWidth:
                                            StyleSheet.hairlineWidth,
                                    }}
                                />
                                <FlatList
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.default}
                                        >
                                            <Text style={styles.textStyle}>
                                                Tasty Location {item}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() =>
                                    setLocationModalVisible(
                                        !locationModalVisible
                                    )
                                }
                            >
                                <Text style={styles.buttonText}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.default, styles.buttonWithIcon]}
                    onPress={() => setLocationModalVisible(true)}
                >
                    <GlobeAltIcon size={24} color={COLORS.secondary} />
                    <Text style={styles.textStyle}>Select Location</Text>
                </TouchableOpacity>

                {/* Create Post Button */}
                <TouchableOpacity
                    style={[styles.buttonStyle, styles.buttonWithIcon]}
                    onPress={() => setLocationModalVisible(true)}
                >
                    <Text style={[styles.buttonText, { fontSize: SIZES.md }]}>
                        Add post
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: COLORS.primaryHover,
        marginTop: 10,
        width: '100%',
        padding: 10,
        borderRadius: SIZES.sm,
    },
    buttonWithIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        marginTop: 150,
        marginHorizontal: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: SIZES.lg,
        color: COLORS.secondaryHover,
    },
    modalAlbumList: {
        width: '100%',
    },
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
    textStyle: {
        color: COLORS.secondaryHover,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default addPost
