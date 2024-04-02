
import type { Metadata, Viewport } from 'next'
import NextHead from 'next/head';
import { Space_Mono } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
import BasePage from '@/components/BasePage'
import Error from 'next/error'
import { persistor, store } from '../lib/store'
import FirebaseProvider, { FirebaseContext } from '../firebase/firebase'
import { Theme, ThemePanel } from '@radix-ui/themes'
import MyProvider from '@/lib/myProvider'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { useWindowSize } from '@/lib/functions';

const space_mono = Space_Mono({ subsets: ['latin'], weight: '400' })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <MyProvider>
            <FirebaseProvider>
                  <html lang="en">
                      <body className={space_mono.className}>
                      <Head />

                        <Theme scaling='90%' accentColor='amber'>
                          {children}
                        </Theme>
                        </body>
                  </html>
            </FirebaseProvider>
        </MyProvider>
    )
}

const Head = () => {
    return <head>
        <NextHead>
            <meta
                name="viewport"
                content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            <title>FiFe App</title>
        </NextHead>
    </head>
}

 
export const metadata: Metadata = {
  title: 'FiFe App',
}

export const viewport: Viewport = {
    viewportFit:'cover',
    width:'device-width', 
    initialScale:1,
    minimumScale:1,
    maximumScale:1,
    userScalable:false
    // Also supported by less commonly used
    // interactiveWidget: 'resizes-visual',
  }