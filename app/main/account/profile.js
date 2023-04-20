import { COLORS, SIZES } from '../../../constants/theme'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { SafeAreaView } from 'react-native'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import { UserContext } from '../../_layout'

const profile = () => {
    const { currentUser, setCurrentUser } = React.useContext(UserContext)
    const [nameModalVisible, setNameModalVisible] = useState(false)
    const [emailModalVisible, setEmailModalVisible] = useState(false)
    const [passwordModalVisible, setPasswordModalVisible] = useState(false)
    const [profileName, setProfileName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
                    {currentUser.profileName ?? 'Full name'}
                </Text>
                <Text style={styles.profileData}>
                    {currentUser.username ?? 'username'}
                </Text>
                <Text style={styles.profileData}>
                    {currentUser.email ?? 'email'}
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
                            <Text style={styles.modalText}>
                                Change Name
                            </Text>
                            <TextInput 
                                style={styles.default}
                                placeholder="New profile name"
                                value={profileName}
                                onChangeText={setProfileName}
                                placeholderTextColor={COLORS.secondary}
                                >
                            </TextInput>
                            <Text style={[styles.textStyle, styles.buttonText]}>
                                Confirm changes
                            </Text>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() =>
                                    setNameModalVisible(!nameModalVisible)
                                }
                            >
                                <Text style={styles.buttonText}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.default, styles.buttonWithIcon]}
                    onPress={() => setNameModalVisible(true)}
                >
                    <FolderIcon size={24} color={COLORS.secondary} />
                    <Text style={styles.textStyle}>Change Name</Text>
                </TouchableOpacity>

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
                            <Text style={styles.modalText}>
                                Change E-mail
                            </Text>
                            <TextInput 
                                style={styles.default}
                                placeholder="New e-mail"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={COLORS.secondary}
                                keyboardType="email-address"
                                >
                            </TextInput>
                            <Text style={[styles.textStyle, styles.buttonText]}>
                                Confirm changes
                            </Text>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() =>
                                    setEmailModalVisible(!emailModalVisible)
                                }
                            >
                                <Text style={styles.buttonText}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.default, styles.buttonWithIcon]}
                    onPress={() => setEmailModalVisible(true)}
                >
                    <FolderIcon size={24} color={COLORS.secondary} />
                    <Text style={styles.textStyle}>Change Email</Text>
                </TouchableOpacity>

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
                                Change Name
                            </Text>
                            <TextInput 
                                style={styles.default}
                                placeholder="Password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={COLORS.secondary}
                                >
                            </TextInput>
                            <Text style={[styles.textStyle, styles.buttonText]}>
                                Confirm changes
                            </Text>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() =>
                                    setPasswordModalVisible(!passwordModalVisible)
                                }
                            >
                                <Text style={styles.buttonText}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.default, styles.buttonWithIcon]}
                    onPress={() => setPasswordModalVisible(true)}
                >
                    <FolderIcon size={24} color={COLORS.secondary} />
                    <Text style={styles.textStyle}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.button, styles.buttonStyle]}
                onPress={() => {}}
            >
                <Text style={[styles.textStyle, styles.buttonText]}>
                    Log out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileData: {
        width: 'auto',
        color: COLORS.secondary,
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: COLORS.secondaryHover,
    },
    button: {
        backgroundColor: COLORS.primaryHover,
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: SIZES.sm,
    },
    textStyle: {
        color: COLORS.secondaryHover,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        color: COLORS.primary,
    },
})

export default profile
