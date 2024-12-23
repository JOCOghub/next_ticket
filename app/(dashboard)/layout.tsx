// components
import Navbar from "../components/NavBar";
import {ReactNode} from 'react'

interface RootLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}