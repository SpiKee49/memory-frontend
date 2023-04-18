import { COLORS, SIZES } from '../../constants/theme'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import React from 'react'

const addAlbum = () => {
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
                <TextInput
                    style={styles.default}
                    placeholder="Album Title"
                    placeholderTextColor={COLORS.secondary}
                />
                <TextInput
                    style={styles.default}
                    placeholder="Description"
                    placeholderTextColor={COLORS.secondary}
                />

                {/* Create Post Button */}
                <TouchableOpacity
                    style={[styles.buttonStyle, styles.buttonWithIcon]}
                    onPress={() => setLocationModalVisible(true)}
                >
                    <Text style={[styles.buttonText, { fontSize: SIZES.md }]}>
                        Add Album
                    </Text>
                </TouchableOpacity>
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
    buttonWithIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '100%',
        height: '80%',
        margin: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
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
    modalAlbumList: {
        width: '100%',
    },
    buttonStyle: {
        backgroundColor: COLORS.secondaryHover,
        marginTop: 10,
        width: '100%',
        padding: 10,
        borderRadius: SIZES.sm,
    },
    buttonText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        color: COLORS.secondaryHover,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: COLORS.secondaryHover,
        fontSize: SIZES.md,
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default addAlbum
