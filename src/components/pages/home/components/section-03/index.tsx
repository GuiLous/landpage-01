import {
  Brain,
  Crosshair,
  HandHelping,
  HeartHandshake,
  Library,
  ShieldAlert,
} from 'lucide-react'
import Image from 'next/image'

import { Card } from '@/components/pages/home/components/section-03/card'

import add from '@/assets/images/add.svg'
import triangles from '@/assets/images/triangles.svg'

export function Section03() {
  return (
    <section
      id="section03"
      className="relative mt-16 flex flex-col gap-12 px-6"
    >
      <div className="relative">
        <Image
          src={triangles}
          alt="Triângulos"
          width={65}
          className="absolute -top-20"
        />

        <h2 className="text-center font-poppins text-4xl font-bold leading-snug">
          O que oferecemos para você
        </h2>

        <Image
          src={add}
          alt="Mais"
          width={39}
          className="absolute -bottom-6 right-0"
        />
      </div>

      <div className="relative flex flex-col gap-10">
        <Card
          icon={Brain}
          title="Pensamentos"
          description="Reformular pensamentos negativos e falar consigo"
          iconColor="text-yellow-300"
          iconBg="bg-yellow-500/20"
        />
        <Card
          icon={HeartHandshake}
          title="Companhia"
          description="Evitar pessoas negativas e pessimistas"
          iconColor="text-red-500"
          iconBg="bg-red-500/20"
        />
        <Card
          icon={Library}
          title="Validação"
          description=" Testar suas ideias minuciosamente antes de lançar novos produtos"
          iconColor="text-green-500"
          iconBg="bg-green-500/20"
        />
        <Card
          icon={ShieldAlert}
          title="Erros"
          description="Preparar-se para o fracasso e aprender com seus erros sempre que possível"
          iconColor="text-violet-500"
          iconBg="bg-violet-500/20"
        />
        <Card
          icon={Crosshair}
          title="Foco"
          description="Manter-se focado em seus clientes e em suas necessidades"
          iconColor="text-cyan-500"
          iconBg="bg-cyan-500/20"
        />
        <Card
          icon={HandHelping}
          title="Ajuda"
          description="Obter a ajuda necessária para alcançar seus objetivos"
          iconColor="text-orange-500"
          iconBg="bg-orange-500/20"
        />

        <div className="absolute left-0 top-16 min-h-[668px] min-w-[450px] rotate-45 bg-gradient_purple blur-3xl" />

        <div className="absolute bottom-10 left-0 min-h-[668px] min-w-[350px] -rotate-45 bg-gradient_purple blur-3xl" />
      </div>

      <Image
        src={add}
        alt="Mais"
        width={39}
        className="absolute -bottom-14 left-6"
      />
    </section>
  )
}
