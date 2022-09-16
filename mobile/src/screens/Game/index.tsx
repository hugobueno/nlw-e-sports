import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native'
import { GameParams } from '../../@types/navegation';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard, IDuoCardProps } from '../../components/DuoCard';
import { api } from '../../utils/api';
import { DuoMatch } from '../../components/DuoMatch'

export function Game() {
    const [duos, setDuos] = useState<IDuoCardProps[]>([])
    const route = useRoute()
    const game = route.params as GameParams
    const navegation = useNavigation()
    const [discordDuoSelected, setDiscordDuoSelected] = useState("")

    const handleGoBack = () => {
        navegation.goBack()
    }
    const handleGetAllAds = async () => {
        const { data, status } = await api.get(`/games/${game.id}/ads`)
        setDuos(data)
        console.log(data);
    }

    const handleGetDiscordUser = async (adsId: string) => {
        const { data, status } = await api.get(`ads/${adsId}/discord`)
        setDiscordDuoSelected(data.discord)
    }

    useEffect(() => {
        handleGetAllAds()
    }, [])
    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} >
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                        />
                    </TouchableOpacity>
                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />
                    <View style={styles.right}></View>
                </View>
                <Image
                    style={styles.cover}
                    source={{ uri: game.bannerUrl }}
                    resizeMode="cover"
                />
                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />
                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            onConnect={() => handleGetDiscordUser(item.id)}
                            data={item}
                        />
                    )}
                    horizontal
                    contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>Não ha anuncios publicado ainda</Text>
                    )}
                />
                <DuoMatch
                    discord={discordDuoSelected}
                    visible={discordDuoSelected.length > 0}
                    onClose={() => setDiscordDuoSelected("")}
                />
            </SafeAreaView>
        </Background>
    );
}