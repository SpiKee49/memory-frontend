import { COLORS, SIZES } from '../constants/theme'
import { TextInput, View } from 'react-native'

import { MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import PropTypes from 'prop-types'
import React from 'react'
import { debounce } from 'lodash'

function SearchBar(props) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: COLORS.primary,
            }}
        >
            <MagnifyingGlassIcon color={COLORS.secondary} size={24} />
            <TextInput
                style={{
                    flex: 1,
                    height: 50,
                    backgroundColor: COLORS.primaryHover,
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: SIZES.sm,
                }}
                onChangeText={
                    props.debounce
                        ? props.onChange
                        : (text) => {
                              debounce(props.onChange(text))
                          }
                }
                placeholder={props.value}
                placeholderTextColor={COLORS.secondary}
            />
        </View>
    )
}

SearchBar.propsType = {
    debounce: PropTypes.boolean,
    onChange: PropTypes.func.isRequired,
}

export default SearchBar
