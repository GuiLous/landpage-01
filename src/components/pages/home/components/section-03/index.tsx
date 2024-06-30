import { Camera, CodeXml, Layers, Library } from 'lucide-react'
import Image from 'next/image'

import { Card } from '@/components/pages/home/components/section-03/card'

import add from '@/assets/images/add.svg'
import triangles from '@/assets/images/triangles.svg'

export function Section03() {
  return (
    <section className="relative mt-16 flex flex-col gap-12 px-6">
      <div className="relative">
        <Image
          src={triangles}
          alt="Triângulos"
          width={65}
          className="absolute -top-20"
        />

        <h2 className="font-poppins text-4xl font-bold leading-snug">
          The Service We Provide For You
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
          icon={CodeXml}
          title="Development"
          description="Create a platform with the best and coolest quality from us."
          iconColor="text-purple-500"
          iconBg="bg-purple-500/20"
        />
        <Card
          icon={Layers}
          title="UI/UX Designer"
          description="We provide UI/UX Design services, and of course with the best quality"
          iconColor="text-red-500"
          iconBg="bg-red-500/20"
        />
        <Card
          icon={Library}
          title="Motion Graphik"
          description="We provide Graphic Design services, with the best designers"
          iconColor="text-yellow-500"
          iconBg="bg-yellow-500/20"
        />
        <Card
          icon={Camera}
          title="Photography"
          description="We provide Photography services, and of course with the best quality"
          iconColor="text-violet-500"
          iconBg="bg-violet-500/20"
        />

        <div className="absolute left-0 top-16 min-h-[668px] min-w-[450px] rotate-45 bg-gradient_purple blur-3xl" />
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
