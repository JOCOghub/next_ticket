"use client"

import AuthForm from "../Authform"

export default function Login() {

   const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>, // Typing for e
      email: string,
      password: string
    ) => {
      e.preventDefault();
  
      console.log(email, password, "login");
    };

  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit} />
    </main>
  )
}