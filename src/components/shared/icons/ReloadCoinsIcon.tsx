import { ComponentProps } from 'react'

type ReloadCoinsIconProps = ComponentProps<'svg'>

export function ReloadCoinsIcon({ ...props }: ReloadCoinsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <g fill="#fff" clipPath="url(#a)">
        <path d="M14.667 6.37v7.556H5.589v-2.22h1.385v.86h6.308V7.73H6.974v1.092l.51-.501.618.607-1.828 1.797-1.83-1.797.619-.607.526.517V6.371h9.078Z" />
        <path
          fillRule="evenodd"
          d="M10 1.324a8.824 8.824 0 1 0 0 17.647 8.824 8.824 0 0 0 0-17.647ZM0 10.148c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
