import { FlatList, SafeAreaView, View } from 'react-native'
import React, { useState } from 'react'

import AlbumCard from '../../components/AlbumCard'
import { COLORS } from '../../constants/theme'
import SearchBar from '../../components/SearchBar'
import { useRouter } from 'expo-router'

const search = () => {
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
            <SearchBar onChange={setSearchValue} value={'Search for album'} />
            <View>
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    renderItem={({ item }) => (
                        <AlbumCard
                            onPress={() => router.push(`/main/album/${item}`)}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </SafeAreaView>
    )
}

export default search
