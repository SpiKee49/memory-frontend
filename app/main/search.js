import { FlatList, SafeAreaView, View } from 'react-native'
import React, { useState } from 'react'

import AlbumCard from '../../components/AlbumCard'
import { COLORS } from '../../constants/theme'
import SearchBar from '../../components/SearchBar'

const search = () => {
    const [searchValue, setSearchValue] = useState('')
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.backdrop }}>
            <SearchBar onChange={setSearchValue} value={'Search for album'} />
            <View>
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    renderItem={({ item }) => <AlbumCard />}
                    keyExtractor={(item) => item}
                />
            </View>
        </SafeAreaView>
    )
}

export default search
