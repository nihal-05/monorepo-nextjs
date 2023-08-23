import dynamic from 'next/dynamic'
import { RecoilRoot } from 'recoil'

const Appbar = dynamic(() => import('@/components/Appbar'), {
  ssr: false,
})

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Appbar />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
