import { ComponentProps } from 'react'

type BagPackIconProps = ComponentProps<'path'>
export function BagPackIcon({ ...props }: BagPackIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
      <g clipPath="url(#a)">
        <path
          fill="#999"
          d="M14.77 10.461h-.616V9.114a2.252 2.252 0 0 0-2.252-2.252H4.098a2.252 2.252 0 0 0-2.252 2.252v1.347h-.615A1.23 1.23 0 0 0 0 11.692v2.462a1.23 1.23 0 0 0 1.23 1.23h.616a.616.616 0 0 0 .616.616h11.077a.615.615 0 0 0 .615-.615h.615A1.23 1.23 0 0 0 16 14.154v-2.462a1.23 1.23 0 0 0-1.23-1.23ZM1.23 14.154v-2.462h.616v2.462h-.615Zm9.847-4.308H4.923a.615.615 0 1 1 0-1.23h6.154a.616.616 0 1 1 0 1.23Zm3.692 4.308h-.615v-2.462h.615v2.462ZM11.902 5.63c.825 0 1.624.294 2.252.83v-.43a4.19 4.19 0 0 0-4.185-4.185h-.123a1.846 1.846 0 1 0-3.692 0H6.03a4.19 4.19 0 0 0-4.185 4.185v.43a3.465 3.465 0 0 1 2.252-.83h7.804ZM8 1.23a.615.615 0 0 1 .615.615h-1.23A.615.615 0 0 1 8 1.231Z"
          {...props}
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
