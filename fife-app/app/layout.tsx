"use client"

import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import BasePage from "@/components/BasePage";
import Error from "next/error";
import ErrorBoundary from "@/components/ErrorHandling";
import { Provider } from "react-redux";
import { persistor, store } from '../lib/store';
import FirebaseProvider, { FirebaseContext } from '../firebase/firebase';

const space_mono = Space_Mono({ subsets: ["latin"], weight: '400' });


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const ErrorPage = () => {
    return (
        <BasePage>
          <Error/>
        </BasePage>
    )
  }

  return (
          <Provider store={store}>
              <FirebaseProvider>
                
                <html lang="en">
                  <body className={space_mono.className}>{children}</body>
                </html>
              </FirebaseProvider>
          </Provider>
  );
}
