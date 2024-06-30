import { Button, DropdownMenu } from '@radix-ui/themes'
import { BarChart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.svg'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6">
      <Link className="flex items-center gap-1" href="/">
        <Image src={logo} alt="Logo" width={30} height={30} />

        <h1 className="font-montserrat text-3xl font-bold text-white">Enver</h1>
      </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost" className="cursor-pointer text-white">
            <BarChart className="-rotate-90" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-zinc-700 font-semibold">
          <DropdownMenu.Item shortcut="⌘" className="text-white">
            Início
          </DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘" className="text-white">
            Por que nos escolher?
          </DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘" className="text-white">
            Nossos serviços
          </DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘" className="text-white">
            Nosso portfólio
          </DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘" className="text-white">
            Entre em contato
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
  )
}
