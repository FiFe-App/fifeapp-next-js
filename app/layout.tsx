import FirebaseProvider from '../firebase/firebase'
import { Box, Container, Theme } from '@radix-ui/themes'
import MyProvider from '@/lib/myProvider'
import '@/css/layout.css'
import { Header } from '@/components'

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
                </html>
            </FirebaseProvider>
        </MyProvider>
    )
}
