import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import React, { useEffect, useState } from 'react'

import { API_URL } from '@env'
import AlbumCard from '../../components/AlbumCard'
import SearchBar from '../../components/SearchBar'
import axios from 'axios'
import { useRouter } from 'expo-router'

const search = () => {
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()

    const [albums, setAlbums] = useState()

    useEffect(() => {
        fetchAlbums()
    }, [])

    useEffect(() => {
        fetchAlbums(searchValue)
    }, [searchValue])

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
                `Error received from axios.post: ${JSON.stringify(error)}`
            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <SearchBar
                onChange={setSearchValue}
                debounce
                value={'Search for album'}
            />
            {albums == undefined ? (
                <ActivityIndicator
                    size="large"
                    color={COLORS.secondary}
                    style={{ marginTop: 20 }}
                />
            ) : (
                <View>
                    {albums.length === 0 ? (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 40,
                                gap: 5,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: SIZES.xxl,
                                    fontWeight: 'bold',
                                    paddingHorizontal: 40,
                                    paddingBottom: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: COLORS.secondary,
                                }}
                            >
                                No match
                            </Text>
                            <Text
                                style={{
                                    color: COLORS.secondary,
                                    fontSize: SIZES.md,
                                    fontStyle: 'italic',
                                }}
                            >
                                try different search value
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={albums}
                            renderItem={({ item }) => (
                                <AlbumCard
                                    album={item}
                                    onPress={() =>
                                        router.push(`/main/album/${item.id}`)
                                    }
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    )}
                </View>
            )}
        </SafeAreaView>
    )
}

export default search