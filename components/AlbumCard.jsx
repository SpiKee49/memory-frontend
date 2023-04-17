import { COLORS, SIZES } from '../constants/theme';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';

function AlbumCard() {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        height: 300,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 25,
      }}
    >
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
          padding: SIZES.sm,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              color: COLORS.secondaryHover,
              fontSize: SIZES.md,
              fontWeight: 'bold',
            }}
          >
            Album name
          </Text>
          <Text
            style={{
              color: COLORS.secondaryHover,
              fontSize: SIZES.sm,
            }}
          >
            Short album description / tags
          </Text>
        </View>

        <TouchableOpacity style={{ opacity: 0.2 }}>
          <StarIcon color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.secondary,
        }}
      >
        <Image
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
          }}
          source={require('../public/images/placeholder-image.jpg')}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

export default AlbumCard;
