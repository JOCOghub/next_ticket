// components
import Navbar from "../components/NavBar";
import {ReactNode} from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface RootLayoutProps {
  children: ReactNode;
}
export default async function DashboardLayout({ children: children }: RootLayoutProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    redirect('/login')
  }

  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  )
}