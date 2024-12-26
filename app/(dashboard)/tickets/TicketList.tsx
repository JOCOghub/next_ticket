import Link from "next/link"
import Ticket from "./Ticket"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import DeleteButton from "./[id]/DeleteButton"

async function getTickets() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('Tickets')
    .select()

  if (error) {
    console.log(error.message)
  }

  return data
}

export default async function TicketList() {
  const tickets = await getTickets()

  return (
    <>
      {tickets.map((ticket: Ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
          <DeleteButton id={ticket.id} />
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  )
}