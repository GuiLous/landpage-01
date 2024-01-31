const baseURL = process.env.NEXT_PUBLIC_REACT_APP_URL

export async function dynamicBlurDataUrl(url: string) {
  const base64str = await fetch(
    `${baseURL}/_next/image?url=${url}&w=16&q=75`
  ).then(async (res) => Buffer.from(await res.arrayBuffer()).toString('base64'))

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1'/>
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' href='data:image/webp;base64,${base64str}'/>
    </svg>
  `
  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`
}

export function staticBlurDataUrl() {
  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1'/>
      </filter>

      <rect preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' stroke-width="3" stroke="#B7B7B7" fill="#c8c5c5" />
    </svg>
  `
  // avif, webp
  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`
}
