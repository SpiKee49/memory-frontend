import { FlatList, SafeAreaView, View } from 'react-native'

import AlbumCard from '../../components/AlbumCard'
import { COLORS } from '../../constants/theme'
import { useRouter } from 'expo-router'

const Home = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backdrop }}>
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

export default Home
