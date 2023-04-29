import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import { Camera, CameraType } from 'expo-camera'
import React, { useState } from 'react'

import FormButton from './FormButton'

const AddPhotoModal = (props) => {
    const { setImage } = props
    const [camera, setCamera] = useState(null)
    const [type, setType] = useState(CameraType.back)
    const [permission, requestPermission] = Camera.useCameraPermissions()

    if (!permission) {
        return (
            <Modal
                animationType="slide"
                visible={props.visible}
                transparent={true}
                onRequestClose={() => {
                    props.setVisible(!props.visible)
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={COLORS.secondary}
                    style={{ marginTop: 20 }}
                />
            </Modal>
        )
    }

    if (!permission.granted) {
        return (
            <Modal
                animationType="slide"
                visible={props.visible}
                transparent={true}
                onRequestClose={() => {
                    props.setVisible(!props.visible)
                }}
            >
                <View
                    style={{
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
                        Bruh...
                    </Text>
                    <Text
                        style={{
                            color: COLORS.secondary,
                            fontSize: SIZES.md,
                            fontStyle: 'italic',
                        }}
                    >
                        You have to allow camera my guy
                    </Text>
                    <FormButton
                        onPress={requestPermission}
                        text="Give permission"
                    />
                </View>
            </Modal>
        )
    }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        )
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync({
                base64: true,
                imageType: 'png',
            })
            setImage(data.base64)
        }
    }
    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            transparent={true}
            onRequestClose={() => {
                props.setVisible(!props.visible)
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Camera
                        style={styles.camera}
                        type={type}
                        ref={(ref) => setCamera(ref)}
                        ratio="1:1"
                    ></Camera>
                    <FormButton
                        text="Flip Camera"
                        onPress={toggleCameraType}
                        highlighted
                    />
                    <FormButton
                        text="Take Photo"
                        onPress={() => takePicture()}
                        highlighted
                    />
                    <FormButton
                        text="Go Back"
                        onPress={() => props.setVisible(false)}
                        highlighted
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        aspectRatio: 1 / 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        marginTop: 150,
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
    modalText: {
        fontSize: SIZES.lg,
        color: COLORS.secondaryHover,
    },
})

export default AddPhotoModal
