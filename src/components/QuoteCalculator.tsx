"use client";

import { useMemo, useState } from "react";
import { buildWhatsappUrl, site } from "@/lib/site";

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type Props = {
  defaultGuests?: number;
};

export default function QuoteCalculator({ defaultGuests = 100 }: Props) {
  const [guests, setGuests] = useState<number>(defaultGuests);
  const [kmRoundTrip, setKmRoundTrip] = useState<number>(0);
  const [outsideCampinas, setOutsideCampinas] = useState<boolean>(false);

  const pricing = useMemo(() => {
    const pricePerPerson = 16.5;
    const minimumEventValue = 1650;
    const baseRaw = guests * pricePerPerson;
    const baseValue = Math.max(baseRaw, minimumEventValue);

    const travelFixed = 200;
    const travelPerKm = 2.5;

    const travelValue = outsideCampinas ? travelFixed + kmRoundTrip * travelPerKm : 0;
    const total = baseValue + travelValue;
    const perPerson = guests > 0 ? total / guests : 0;

    return {
      pricePerPerson,
      minimumEventValue,
      baseRaw,
      baseValue,
      travelFixed,
      travelPerKm,
      travelValue,
      total,
      perPerson,
    };
  }, [guests, kmRoundTrip, outsideCampinas]);

  const whatsappMessage = useMemo(() => {
    const kmText = outsideCampinas ? ` (fora de Campinas, ${kmRoundTrip} km rodados)` : " (em Campinas)";
    return `Olá! Quero orçamento para aluguel da máquina de sorvete da ${site.name}. Evento para ${guests} pessoas${kmText}.`;
  }, [guests, kmRoundTrip, outsideCampinas]);

  return (
    <div className="rounded-2xl border border-[var(--mg-border)] bg-[var(--mg-card)] p-5 shadow-[var(--mg-shadow)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-[var(--mg-brown)]">
            Simule um orçamento rápido
          </div>
          <div className="text-sm text-[color:rgba(31,20,15,0.78)]">
            Pacote base em Campinas: sorvete à vontade por 4 horas (máquina + funcionário
            uniformizado).
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
              Pessoas (estimativa)
            </span>
            <input
              inputMode="numeric"
              value={Number.isFinite(guests) ? guests : ""}
              onChange={(e) => setGuests(Math.max(0, Number(e.target.value || 0)))}
              className="h-11 rounded-xl border border-[var(--mg-border)] bg-white px-3 text-sm outline-none focus:border-[color:rgba(229,58,134,0.55)]"
              aria-label="Quantidade de pessoas"
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-[var(--mg-border)] bg-white px-3 py-3">
            <input
              type="checkbox"
              checked={outsideCampinas}
              onChange={(e) => setOutsideCampinas(e.target.checked)}
              aria-label="Evento fora de Campinas"
            />
            <span className="text-sm font-semibold text-[color:rgba(31,20,15,0.78)]">
              Fora de Campinas
            </span>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
              KM rodados (ida + volta)
            </span>
            <input
              inputMode="numeric"
              value={Number.isFinite(kmRoundTrip) ? kmRoundTrip : ""}
              onChange={(e) => setKmRoundTrip(Math.max(0, Number(e.target.value || 0)))}
              disabled={!outsideCampinas}
              className="h-11 rounded-xl border border-[var(--mg-border)] bg-white px-3 text-sm outline-none disabled:opacity-40 focus:border-[color:rgba(229,58,134,0.55)]"
              aria-label="Quilometragem rodada"
            />
          </label>
        </div>

        <div className="grid gap-4 rounded-2xl bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] p-4 md:grid-cols-3">
          <div className="flex flex-col">
            <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
              Total estimado
            </div>
            <div className="text-lg font-extrabold text-[var(--mg-brown)]">
              {BRL.format(pricing.total)}
            </div>
            <div className="text-xs text-[color:rgba(31,20,15,0.7)]">
              {BRL.format(pricing.perPerson)} por pessoa (média)
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
              Pacote base
            </div>
            <div className="text-sm font-semibold text-[color:rgba(31,20,15,0.9)]">
              {BRL.format(pricing.baseValue)}
            </div>
            <div className="text-xs text-[color:rgba(31,20,15,0.7)]">
              {BRL.format(pricing.pricePerPerson)} por pessoa • mínimo{" "}
              {BRL.format(pricing.minimumEventValue)}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
              Deslocamento
            </div>
            <div className="text-sm font-semibold text-[color:rgba(31,20,15,0.9)]">
              {pricing.travelValue ? BRL.format(pricing.travelValue) : "R$ 0,00"}
            </div>
            <div className="text-xs text-[color:rgba(31,20,15,0.7)]">
              Fora de Campinas: {BRL.format(pricing.travelPerKm)}/km +{" "}
              {BRL.format(pricing.travelFixed)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-[color:rgba(31,20,15,0.7)]">
            Estimativa para qualificar o atendimento. Orçamento final pode variar conforme
            data, local e detalhes do evento.
          </div>
          <a
            href={buildWhatsappUrl(whatsappMessage)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mg-pink)] px-5 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(229,58,134,0.32)] transition-transform hover:translate-y-[-1px] focus:outline-none focus:ring-4 focus:ring-[color:rgba(229,58,134,0.25)]"
          >
            Pedir orçamento no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

