import { COLORS, SIZES } from '../constants/theme';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import AlbumCard from '../components/AlbumCard';
import { UserCircleIcon } from 'react-native-heroicons/solid';

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.backdrop }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: true,
          headerLeft: () => (
            <View
              style={{ flex: 1, paddingHorizontal: 10 }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: SIZES.xl,
                  fontWeight: 'bold',
                }}
              >
                Memory
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
            >
              <UserCircleIcon color={COLORS.secondary} />
            </TouchableOpacity>
          ),
          headerTitle: '',
        }}
      />
      <View>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => <AlbumCard />}
          keyExtractor={item => item}
        />
      </View>
      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
};

export default Home;
