import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import React, { useContext, useEffect, useState } from 'react'

import AlbumCard from '../../components/AlbumCard'
import { NetworkContext } from '../_layout'
import NoInternet from '../../components/NoInternet'
import SearchBar from '../../components/SearchBar'
import { getAlbums } from '../../services/services'
import { useRouter } from 'expo-router'

const search = () => {
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()

    const [albums, setAlbums] = useState()
    const { internetAccess } = useContext(NetworkContext)

    useEffect(() => {
        if (internetAccess) fetchAlbums()
    }, [])

    useEffect(() => {
        if (internetAccess) fetchAlbums(searchValue)
    }, [searchValue])

    if (!internetAccess) {
        return <NoInternet />
    }
    const fetchAlbums = async (search) => {
        try {
            const res = await getAlbums(search)
            setAlbums(res.data)
        } catch (error) {
            console.error(
                `Error received from axios.get: ${JSON.stringify(error)}`
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
                                flex: 1,
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
