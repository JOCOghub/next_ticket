// import { notFound } from "next/navigation"
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers'
// import DeleteButton from "./DeleteButton";

// export const dynamicParams = true // default val = true

// export async function generateMetadata({ params }: { params: { id: string };}) {
//   const supabase = createServerComponentClient({ cookies })

//   const { data: ticket } = await supabase.from('Tickets')
//     .select()
//     .eq('id', params.id)
//     .single()
 
//   return {
//     title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not Found'}`
//   }
// }



// async function getTicket(id: string) {
//   const supabase = createServerComponentClient({ cookies })

//   const { data } = await supabase.from('Tickets')
//     .select()
//     .eq('id', id)
//     .single()

//     if (!data) {
//       notFound()
//     }
  
//     return data
// }
  
//   export default async function TicketDetails({ params, }: { params: { id: string };}) { // const id = params.id
//     const ticket = await getTicket(params.id)

//     const supabase = createServerComponentClient({ cookies })
//     const { data } = await supabase.auth.getSession()
  
//     return (
//       <main>
//         <nav>
//           <h2>Ticket Details</h2>
//           <div className="ml-auto">
//             {data.session.user.email === ticket.user_email && (
//               <DeleteButton id={ticket.id} />
//             )}
//           </div>
//         </nav>
//         <div className="card">
//           <h3>{ticket.title}</h3>
//           <small>Created by {ticket.user_email}</small>
//           <p>{ticket.body}</p>
//           <div className={`pill ${ticket.priority}`}>
//             {ticket.priority} priority
//           </div>
//         </div>
//       </main>
//     )
//   }


"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTicketPage() {
  const { id } = useParams(); // Get the ticket ID from the route params
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch ticket data from an API using the ticket ID
    if (!id) return;

    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/tickets/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch ticket");
        }
        const data = await res.json();
        setTitle(data.title);
        setBody(data.body);
        setPriority(data.priority || "low");
      } catch (err) {
        console.error(err);
      }
    };

    fetchTicket();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, priority }),
      });

      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }

      router.push("/tickets"); // Redirect to tickets page
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h2>Edit Ticket</h2>
      <form onSubmit={handleSubmit} className="w-1/2">
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Description:</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Priority:</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </label>
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Updating..." : "Update Ticket"}
        </button>
      </form>
    </main>
  );
}
