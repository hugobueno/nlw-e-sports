import { GameController, Check } from "phosphor-react";
import { Input } from "../Form/Input";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useState, useEffect, FormEvent } from "react";
import { IGames } from "../../pages";
import { api } from "../../utils/api";
const CreateAdModal: React.FC = () => {
    const [games, setGames] = useState<IGames[]>()
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    const handleGetAllGames = async () => {
        const { data, status } = await api.get("/games")
        setGames(data)
    }
    useEffect(() => {
        handleGetAllGames()
    }, [])

    const handleCreateAd = async (event: FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const dataForm = Object.fromEntries(formData)
        console.log({
            name: dataForm.name,
            yearsPlaying: Number(dataForm.yearsPlaying),
            discord: dataForm.discord,
            weekDays: weekDays.map(Number),
            horsStart: dataForm.hoursStart,
            horsEnd: dataForm.hoursEnd,
            useVoiceChannel: useVoiceChannel
        });

        try {
            const { data, status } = await api.post(`games/${dataForm.game}/ads`, {
                name: dataForm.name,
                yearsPlaying: Number(dataForm.yearsPlaying),
                discord: dataForm.discord,
                weekDays: weekDays.map(Number),
                horsStart: dataForm.hoursStart,
                horsEnd: dataForm.hoursEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert("Anúncio criado com sucesso")
        } catch (error) {
            alert("Falha ao criar anúncio")

        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg'>
                    <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
                    <form
                        onSubmit={handleCreateAd}
                        className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className='font-semibold' htmlFor="game">Qual o game?</label>
                            <select
                                name="game"
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                id="game"
                            >
                                <option disabled selected defaultValue={""} value="Selecione o game que deseja jogar">Selecione o game que deseja jogar</option>
                                {games?.map(game => {
                                    return (
                                        <option key={game.id} value={game.id}>{game.title}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Seu nome (nickname)</label>
                            <Input name="name" id="name" type="text" placeholder="Como te chamar dentro do jogo?" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                                <Input name="yearsPlaying" type="text" id="yearsPlaying" placeholder="Tudo bem se ZERO" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discord">Qual seu discord?</label>
                                <Input name="discord" type="text" placeholder="Usuario #0000" id="discord" />
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="weekdays">Quando contuma jogar?</label>
                                <ToggleGroup.Root
                                    type="multiple"
                                    className="grid grid-cols-4 gap-2"
                                    onValueChange={setWeekDays}
                                    value={weekDays}
                                >
                                    <ToggleGroup.Item value="0" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("0") && 'bg-violet-500'}`} title="Domingo">D</ToggleGroup.Item>
                                    <ToggleGroup.Item value="1" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("1") && 'bg-violet-500'}`} title="Segunda">S</ToggleGroup.Item>
                                    <ToggleGroup.Item value="2" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("2") && 'bg-violet-500'}`} title="Terça">T</ToggleGroup.Item>
                                    <ToggleGroup.Item value="3" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("3") && 'bg-violet-500'}`} title="Quarta">Q</ToggleGroup.Item>
                                    <ToggleGroup.Item value="4" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("4") && 'bg-violet-500'}`} title="Quinta">Q</ToggleGroup.Item>
                                    <ToggleGroup.Item value="5" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("5") && 'bg-violet-500'}`} title="Sexta">S</ToggleGroup.Item>
                                    <ToggleGroup.Item value="6" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("6") && 'bg-violet-500'}`} title="Sabado">S</ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="hoursStart">Qual horario do dia?</label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Input name="hoursStart" type="time" id="hoursStart" placeholder="De" />
                                    <Input name="hoursEnd" type="time" id="hoursEnd" placeholder="Até" />
                                </div>
                            </div>
                        </div>
                        <label className="mt-2 flex gap-2 text-sm items-center">
                            <Checkbox.Root
                                onCheckedChange={(checked) => {
                                    if (checked === true) {
                                        return setUseVoiceChannel(true)
                                    }
                                    setUseVoiceChannel(false)

                                }}
                                className="w-6 h-6 p-1 rounded bg-zinc-900">
                                <Checkbox.Indicator >
                                    <Check className="text-emerald-400 w-4 h-4" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Constumo me conectar ao chat de voz
                        </label>
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
    )
}

export default CreateAdModal;