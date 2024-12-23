import Link from "next/link"
import {ReactNode} from 'react'


interface RootLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  )
}