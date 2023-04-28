import { Alert, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import { NetworkContext, UserContext } from '../_layout'
import React, { useContext, useState } from 'react'

import FormButton from '../../components/FormButton'
import NoInternet from '../../components/NoInternet'
import { createAlbum } from '../../services/services'

const addAlbum = () => {
    const { currentUser } = useContext(UserContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const { internetAccess } = useContext(NetworkContext)

    const sendAlbum = async () => {
        try {
            const data = {
                title,
                description,
                tags,
                ownerId: currentUser.id,
            }

            const res = await createAlbum(data)
            if (res.status === 201) {
                Alert.alert(
                    'Album created sucessfully',
                    `New album ${res.data.title} was created sucessfully.`,
                    [{ text: 'OK' }]
                )
            }
        } catch (error) {
            Alert.alert(
                'Error occured',
                `Error received: ${JSON.stringify(error)}`,
                [{ text: 'OK' }]
            )
        }
    }
    if (!internetAccess) {
        return <NoInternet />
    }

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
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.default}
                    placeholder="Description"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.default}
                    placeholder="Tags separated with coma, i.e.: nature,leasure,hiking..."
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={(text) => {
                        const array = text.replace(/\s/g, '').split(',')
                        setTags(array)
                    }}
                />
                {/* Create Post Button */}
                <FormButton
                    text="Add Album"
                    onPress={() => sendAlbum()}
                    highlighted
                />
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
        color: COLORS.secondary,
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
