import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'
import CreateAdBanner from '../components/CreateAdBanner';
import GameBanner from '../components/GameBanner';
import { api } from '../utils/api';
import { Input } from '../components/Form/Input';
type IGames = {
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
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg'>
              <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className='font-semibold' htmlFor="game">Qual o game?</label>
                  <Input
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                    type={"text"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (nickname)</label>
                  <Input id="name" type="text" placeholder="Como te chamar dentro do jogo?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input type="text" id="yearsPlaying" placeholder="Tudo bem se ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu discord?</label>
                    <Input type="text" placeholder="Usuario #0000" id="discord" />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekdays">Quando contuma jogar?</label>
                    <div className='grid grid-cols-4 gap-2'>
                      <button className="w-8 h-8 rounded bg-zinc-900 " title="Domingo">D</button>
                      <button className="w-8 h-8 rounded bg-zinc-900 " title="Segunda">S</button>
                      <button className="w-8 h-8 rounded bg-zinc-900 " title="Terça">T</button>
                      <button className="w-8 h-8 rounded bg-zinc-900 " title="Quarta">Q</button>
                      <button className="w-8 h-8 rounded bg-zinc-900 " title="Quinta">Q</button>
                      <button className="w-8 h-8 rounded bg-zinc-900 " title="Sexta">S</button>
                      <button className="w-8 h-8 rounded bg-zinc-900 " title="Sabado">S</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hoursStart">Qual horario do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input type="time" id="hoursStart" placeholder="De" />
                      <Input type="time" id="hoursEnd" placeholder="Até" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox" id="speakOn" />
                  <label htmlFor="speakOn">Constumo me conectar ao chat de voz</label>
                </div>
                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                    type="submit">
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default Home
