import { useState, FormEvent } from 'react';

import * as CheckBox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';

import axios from 'axios';

interface FormModalProps {
    games: {
        id: string;
        title: string;
    }[];
};

export function FormModal({games}: FormModalProps) {
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // Fazer uma validação

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel,
            });

            alert("Anúncio criado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Erro ao criar o anúncio.");
        }
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 -z-1 h-[100vh] overflow-auto formModalBreakePoint:w-full formModalBreakePoint:rounded-[0px]">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>   
            <form 
                onSubmit={handleCreateAd}
                className="mt-8 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="game"
                  className="font-semibold" 
                >
                  Qual o game?
                </label>
                <select 
                    id="game"
                    name="game"
                    className="bg-zinc-900 py-3 px-4 rounded text-formTextResponsive placeholder:text-zinc-500 appearance-none"
                >
                    <option disabled selected>Selecione o game que deseja jogar</option>
                    {
                        games.map(game => {
                            return (
                                <option  key={game.id} value={game.id}>{game.title}</option>
                            );
                        })
                    }
                </select>
              </div>

              <div className="flex flex-col gap-2 placeholder:text-formTextResponsive">
                <label htmlFor="name">Seu Nome/Nickname</label>
                <Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className='grid grid-cols-2 gap-6 formModalBreakePoint:grid-cols-1'>
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input type="number" id="yearsPlaying" name="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord??</label>
                  <Input id="discord" name="discord" placeholder="usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6 formModalBreakePoint:flex-col">
                <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                        type="multiple" 
                        className="grid grid-cols-4 gap-2"
                        value={weekDays}
                        onValueChange={setWeekDays}
                    >
                        <ToggleGroup.Item
                            value="0" 
                            title="Domingo"
                            className={`w-8 h-8 rounded ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"} formModalBreakePoint:w-full`}
                        >
                        D
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="1" 
                            title="Segunda"
                            className={`w-8 h-8 rounded ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"} formModalBreakePoint:w-full`}
                        >
                        S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="2" 
                            title="Terça"
                            className={`w-8 h-8 rounded ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"} formModalBreakePoint:w-full`}
                        >
                        T
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="3" 
                            title="Quarta"
                            className={`w-8 h-8 rounded ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"} formModalBreakePoint:w-full`}
                        >
                        Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="4" 
                            title="Quinta"
                            className={`w-8 h-8 rounded ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"} formModalBreakePoint:w-full`}
                        >
                        Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="5" 
                            title="Sexta"
                            className={`w-8 h-8 rounded ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"} formModalBreakePoint:w-full`}
                        >
                        S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="6" 
                            title="Sábado"
                            className={`w-8 h-8 rounded ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"} formModalBreakePoint:w-full`}
                        >
                        S
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourGame">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" name="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnd" name="hourEnd" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <CheckBox.Root 
                    checked={useVoiceChannel}
                    onCheckedChange={checked => {
                        if (checked === true) {
                            setUseVoiceChannel(true);
                        } else {
                            setUseVoiceChannel(false);
                        }
                    }}
                    className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center"
                >
                    <CheckBox.Indicator>
                        <Check size={16} className="text-emerald-400" />
                    </CheckBox.Indicator>
                </CheckBox.Root>
                Costumo me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4 formModalBreakePoint:justify-center formModalBreakePoint:flex-col">
                <button 
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 formModalBreakePoint:justify-center" 
                >
                  <GameController size={24} />
                  Encotrar duo
                </button>
                <Dialog.Close 
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >Cancelar
                </Dialog.Close>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
    );
}