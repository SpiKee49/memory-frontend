import { COLORS, SIZES } from '../../../constants/theme'
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import FormButton from '../../../components/FormButton'
import { SafeAreaView } from 'react-native'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import { UserContext } from '../../_layout'
import { useRouter } from 'expo-router'

const profile = () => {
    const router = useRouter()
    const { currentUser, setCurrentUser } = React.useContext(UserContext)
    const [nameModalVisible, setNameModalVisible] = useState(false)
    const [emailModalVisible, setEmailModalVisible] = useState(false)
    const [passwordModalVisible, setPasswordModalVisible] = useState(false)
    const [profileName, setProfileName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logOut = async () => {
        await AsyncStorage.removeItem('@accessToken')
        await AsyncStorage.removeItem('@refreshToken')
        await AsyncStorage.removeItem('@username')
        router.push('/login')
        setCurrentUser(null)
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.backdrop, gap: 20 }}
        >
            <View
                style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <UserCircleIcon
                    color={COLORS.secondary}
                    size={84}
                    style={{ width: 20 }}
                />
                <Text style={styles.profileData}>
                    {currentUser?.profileName ?? 'Full name'}
                </Text>
                <Text style={styles.profileData}>
                    {currentUser?.username ?? 'username'}
                </Text>
                <Text style={styles.profileData}>
                    {currentUser?.email ?? 'email'}
                </Text>
            </View>
            <View>
                {/* Change Name Modal */}
                <Modal
                    animationType="slide"
                    visible={nameModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        setNameModalVisible(!nameModalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change Name</Text>
                            <TextInput
                                style={styles.default}
                                placeholder="New profile name"
                                value={profileName}
                                onChangeText={setProfileName}
                                placeholderTextColor={COLORS.secondary}
                            ></TextInput>
                            <FormButton
                                onPress={() =>
                                    setNameModalVisible(!nameModalVisible)
                                }
                                text={'Confirm changes'}
                                highlighted
                            />
                            <FormButton
                                onPress={() =>
                                    setNameModalVisible(!nameModalVisible)
                                }
                                text={'Go Back'}
                                highlighted
                            />
                        </View>
                    </View>
                </Modal>
                <FormButton
                    onPress={() => setNameModalVisible(true)}
                    text={'Change Name'}
                />

                {/* Change E-mail Modal */}
                <Modal
                    animationType="slide"
                    visible={emailModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        setEmailModalVisible(!emailModalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Change E-mail</Text>
                            <TextInput
                                style={styles.default}
                                placeholder="New e-mail"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={COLORS.secondary}
                                keyboardType="email-address"
                            ></TextInput>
                            <FormButton
                                onPress={() =>
                                    setEmailModalVisible(!emailModalVisible)
                                }
                                text={'Confirm changes'}
                                highlighted
                            />
                            <FormButton
                                onPress={() =>
                                    setEmailModalVisible(!emailModalVisible)
                                }
                                text={'Go Back'}
                                highlighted
                            />
                        </View>
                    </View>
                </Modal>
                <FormButton
                    onPress={() => setEmailModalVisible(true)}
                    text={'Change Email'}
                />

                {/* Change Password Modal */}
                <Modal
                    animationType="slide"
                    visible={passwordModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        setPasswordModalVisible(!passwordModalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Change Password
                            </Text>
                            <TextInput
                                style={styles.default}
                                placeholder="Old Password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={COLORS.secondary}
                            />
                            <TextInput
                                style={styles.default}
                                placeholder="New Password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={COLORS.secondary}
                            />
                            <TextInput
                                style={styles.default}
                                placeholder="Repeate Password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={COLORS.secondary}
                            />

                            <FormButton
                                onPress={() =>
                                    setPasswordModalVisible(
                                        !passwordModalVisible
                                    )
                                }
                                text={'Confirm changes'}
                                highlighted
                            />
                            <FormButton
                                onPress={() =>
                                    setPasswordModalVisible(
                                        !passwordModalVisible
                                    )
                                }
                                text={'Go back'}
                                highlighted
                            />
                        </View>
                    </View>
                </Modal>
                <FormButton
                    onPress={() => setPasswordModalVisible(true)}
                    text={'Change Password'}
                />
            </View>
            <FormButton onPress={() => logOut()} text={'Log out'} highlighted />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileData: {
        width: 'auto',
        color: COLORS.secondary,
        textAlign: 'center',
    },
    default: {
        backgroundColor: COLORS.primaryHover,
        marginTop: 10,
        width: '100%',
        padding: 10,
        borderRadius: SIZES.sm,
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
        marginHorizontal: 20,
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
    modalText: {
        fontSize: SIZES.lg,
        color: COLORS.secondaryHover,
    },
    modalAlbumList: {
        width: '100%',
    },
})

export default profile
