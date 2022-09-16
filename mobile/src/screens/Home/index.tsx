import React, { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { styles } from './styles';
import logoImage from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { GAMES } from '../../utils/games';
import { api } from '../../utils/api';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native'
export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navegation = useNavigation()

  const handleGetAllGames = async () => {
    const { data, status } = await api.get("/games")
    setGames(data)
  }

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navegation.navigate('game', {
      id,
      title,
      bannerUrl
    })
  }

  useEffect(() => {
    handleGetAllGames()
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImage} style={styles.logo}></Image>
        <Heading
          title='Encontra o teu duo!'
          subtitle='Seleciona o jogo que queres jogar...'
        ></Heading>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              onPress={() => handleOpenGame(item)}
              data={item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        ></FlatList>
      </SafeAreaView>
    </Background>

  );
}
