"use client"; // Precisamos de interação (clique)
import { useState, useEffect } from 'react';
import { createClient } from '../../../utils/supabase/client';

export default function RifaDetalhes({ params }: { params: { id: string } }) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [raffle, setRaffle] = useState<any>(null);
  const supabase = createClient();

  // Função para selecionar/desmarcar número
  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Escolha seus números</h1>
      
      {/* Grade de Números */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: 100 }).map((_, index) => (
          <button
            key={index}
            onClick={() => toggleNumber(index)}
            className={`h-10 w-full rounded font-bold border ${
              selectedNumbers.includes(index)
                ? 'bg-emerald-500 text-white border-emerald-600'
                : 'bg-white text-zinc-800 border-zinc-200 hover:border-emerald-400'
            }`}
          >
            {index.toString().padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* Resumo da Compra */}
      <div className="mt-8 p-4 bg-zinc-100 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm text-zinc-600">Números selecionados:</p>
          <p className="font-bold">{selectedNumbers.join(', ') || 'Nenhum'}</p>
        </div>
        <button 
          disabled={selectedNumbers.length === 0}
          className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50"
        >
          Reservar Agora
        </button>
      </div>
    </div>
  );
}