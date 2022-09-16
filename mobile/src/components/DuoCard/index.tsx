import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';
import { GameController } from 'phosphor-react-native'
export interface IDuoCardProps {
    id: string,
    name: string,
    weekDays: string[],
    useVoiceChannel: boolean,
    yearsPlaying: number
    horsStart: string,
    horsEnd: string,
}

interface IProps {
    data: IDuoCardProps,
    onConnect: () => void
}

export function DuoCard({ data, onConnect }: IProps) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label="Nome"
                value={data.name}
            />
            <DuoInfo
                label="Tempo de jogo"
                value={`${data.yearsPlaying} anos`}
            />
            <DuoInfo
                label="Disponibilidade"
                value={`${data.weekDays.length} dias \u2022 ${data.horsStart} - ${data.horsEnd}`}
            />
            <DuoInfo
                label="Chamada de áudio? "
                value={data.useVoiceChannel ? "Sim" : "Não"}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />
            <TouchableOpacity
            onPress={onConnect}
            style={styles.button}>
                <GameController
                    color={THEME.COLORS.TEXT}
                    size={20}
                />
                <Text style={styles.buttonText}>Conectar</Text>
            </TouchableOpacity>
        </View>
    );
}