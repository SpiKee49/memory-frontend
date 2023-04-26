import { COLORS, SIZES } from '../../constants/theme'
import {
    FlatList,
    Image,
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
import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useState } from 'react'

import { API_URL } from '@env'
import AddPhotoModal from '../../components/AddPhotoModal'
import FormButton from '../../components/FormButton'
import SearchBar from '../../components/SearchBar'
import axios from 'axios'

const addPost = () => {
    const [albumModalVisible, setAlbumModalVisible] = useState(false)
    const [locationModalVisible, setLocationModalVisible] = useState(false)
    const [image, setImage] = useState(null)
    const [cameraModal, setCameraModal] = useState(false)
    const [searchAlbum, setSearchAlbum] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const [albums, setAlbums] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetchAlbums()
        fetchLocations()
    }, [])

    useEffect(() => {
        fetchAlbums(searchAlbum)
    }, [searchAlbum])

    useEffect(() => {
        fetchLocations(searchLocation)
    }, [searchLocation])

    const fetchAlbums = async (search) => {
        try {
            const res = await axios.get(
                !search
                    ? `${API_URL}/api/albums`
                    : `${API_URL}/api/albums?search=${search}`
            )
            setAlbums(res.data)
        } catch (error) {
            console.error(
                `Error received from axios.get: ${JSON.stringify(error)}`
            )
        }
    }

    const fetchLocations = async (search) => {
        try {
            const res = await axios.get(
                !search
                    ? `${API_URL}/api/locations`
                    : `${API_URL}/api/locations?search=${search}`
            )
            setLocations(res.data)
        } catch (error) {
            console.error(
                `Error received from axios.get: ${JSON.stringify(error)}`
            )
        }
    }

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
                <AddPhotoModal
                    visible={cameraModal}
                    setVisible={setCameraModal}
                    setImage={setImage}
                />
                {image == undefined ? (
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
                        onPress={() => setCameraModal(true)}
                    >
                        <PlusCircleIcon size={24} color={COLORS.secondary} />
                        <Text
                            style={{
                                color: COLORS.secondary,
                                fontSize: SIZES.lg,
                            }}
                        >
                            Add photo
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Image
                        source={{ uri: image }}
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
                    />
                )}
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
                                debounce
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
                                    data={albums}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.default}
                                        >
                                            <Text style={styles.textStyle}>
                                                {item.title}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                            <FormButton
                                onPress={() =>
                                    setAlbumModalVisible(!albumModalVisible)
                                }
                                text={'Go back'}
                                highlighted
                            />
                        </View>
                    </View>
                </Modal>
                <FormButton
                    onPress={() => setAlbumModalVisible(true)}
                    icon={<FolderIcon size={24} color={COLORS.secondary} />}
                    text={'Select Album'}
                />

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
                                debounce
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
                                    data={locations}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.default}
                                        >
                                            <Text style={styles.textStyle}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    marginTop: 10,
                                }}
                            >
                                <MapView
                                    initialRegion={{
                                        latitude: 48.15345504232036,
                                        longitude: 17.071571441913836,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    userInterfaceStyle={'dark'}
                                    style={{ flex: 1 }}
                                >
                                    {locations.length > 0 &&
                                        locations.map((loc, index) => {
                                            return (
                                                <Marker
                                                    key={index}
                                                    title={loc.name}
                                                    coordinate={{
                                                        latitude: Number(
                                                            loc.longitude
                                                        ),
                                                        longitude: Number(
                                                            loc.latitude
                                                        ),
                                                    }}
                                                />
                                            )
                                        })}
                                </MapView>
                            </View>

                            <FormButton
                                onPress={() =>
                                    setLocationModalVisible(
                                        !locationModalVisible
                                    )
                                }
                                text={'Go back'}
                                highlighted
                            />
                        </View>
                    </View>
                </Modal>
                <FormButton
                    onPress={() => setLocationModalVisible(true)}
                    text={'Select Location'}
                    icon={<GlobeAltIcon size={24} color={COLORS.secondary} />}
                />

                {/* Create Post Button */}
                <FormButton
                    onPress={() => setLocationModalVisible(true)}
                    text={'Add post'}
                    highlighted
                />
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
    textStyle: {
        color: COLORS.secondary,
        textAlign: 'center',
    },
})

export default addPost
