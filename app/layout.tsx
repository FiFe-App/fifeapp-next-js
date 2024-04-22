
import MyProvider from '@/lib/myProvider';
import { Theme, Box, Container } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata, Viewport } from 'next';
import { Space_Mono } from 'next/font/google';
import NextHead from 'next/head';
import FirebaseProvider from '../firebase/firebase';
import '@/css/layout.css'
import Footer from '@/components/Footer';
import '@/css/layout.css'
import { Header } from '@/components'

const space_mono = Space_Mono({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-mono',
    display:'swap'
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <MyProvider>
            <FirebaseProvider>
                <html lang="en">
                    <body>
                        <Theme scaling="90%" accentColor="amber">
                            <Box>
                                <Container size="3">
                                    <Header/>
                                </Container>
                            </Box>
                            {children}
                        </Theme>
                    </body>
                    <Footer />
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
                <link rel="icon" href="/favicon.ico" sizes="any" />
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