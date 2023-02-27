"use client"
import { useEffect } from 'react';
import './globals.css'
import NavBar from './navBar';
import { LanguageProvider } from '../context/context';


export default function RootLayout({ children }) {
  
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);
  return (
    <>
    <LanguageProvider>
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body >
        <NavBar/>
        {children}
      </body>
    </html>
    </LanguageProvider>
    </>
  )
}
