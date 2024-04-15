
import type { Metadata } from 'next'
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
                        <Theme scaling='90%' accentColor='amber'>
                          {children}
                        </Theme>
                        </body>
                  </html>
            </FirebaseProvider>
        </MyProvider>
    )
}
