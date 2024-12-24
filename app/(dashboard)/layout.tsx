// components
import Navbar from "../components/NavBar";
import {ReactNode} from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

interface RootLayoutProps {
  children: ReactNode;
}
export default async function DashboardLayout({ children: children }: RootLayoutProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  )
}