import { COLORS, SIZES } from '../constants/theme'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import React from 'react'

const FormButton = (props) => {
    return (
        <TouchableOpacity
            style={[
                props.highlighted ? styles.buttonStyle : styles.default,
                styles.buttonWithIcon,
            ]}
            onPress={props.onPress}
        >
            {props.icon}
            <Text
                style={[
                    styles.buttonText,
                    {
                        color: props.highlighted
                            ? COLORS.primary
                            : COLORS.secondaryHover,
                    },
                ]}
            >
                {props.text}
            </Text>
        </TouchableOpacity>
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
    buttonStyle: {
        backgroundColor: COLORS.secondaryHover,
        marginTop: 10,
        width: '100%',
        padding: 10,
        borderRadius: SIZES.sm,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonWithIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
})

export default FormButton
