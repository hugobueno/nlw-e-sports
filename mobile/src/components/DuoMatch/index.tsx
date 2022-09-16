import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { MaterialIcons } from "@expo/vector-icons"
import { CheckCircle } from 'phosphor-react-native'
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';
interface IProps extends ModalProps {
    discord: string,
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: IProps) {

    const [isCopping, setIsCopping] = useState(false)

    const handleCopyDiscordToClipboard = async () => {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord)
        Alert.alert("Discord copiado!", "Agora você colar no discord e encontrar essa pessoa.")
        setIsCopping(false)
    }

    return (
        <Modal
            transparent
            statusBarTranslucent
            animationType="fade"
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeIcon}
                    >
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>
                    <CheckCircle
                        color={THEME.COLORS.SUCCESS}
                        size={64}
                        weight={"bold"}
                    />
                    <Heading
                        title="Let's play"
                        subtitle="Agora é so começar a jogar"
                        style={{ alignItems: "center", marginTop: 24 }}
                    />
                    <Text style={styles.label}>
                        Adicione seu Discord
                    </Text>
                    <TouchableOpacity
                        onPress={handleCopyDiscordToClipboard}
                        style={styles.discordButton}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}