import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import CreateAdBanner from '../components/CreateAdBanner';
import GameBanner from '../components/GameBanner';
import { api } from '../utils/api';
import CreateAdModal from '../components/CreateAdModal';

export type IGames = {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

const Home: NextPage = () => {
  const [games, setGames] = useState<IGames[]>()

  const handleGetAllGames = async () => {
    const { data, status } = await api.get("/games")
    setGames(data)
  }

  useEffect(() => {
    handleGetAllGames()
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src="/assets/Logo.png" alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-clip-text text-transparent bg-nlw-gradient '>duo</span> está aqui
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games?.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default Home
