import FirebaseProvider from '../firebase/firebase'
import { Theme } from '@radix-ui/themes'
import MyProvider from '@/lib/myProvider'
import '@/css/layout.css'

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
                            {children}
                        </Theme>
                    </body>
                </html>
            </FirebaseProvider>
        </MyProvider>
    )
}
