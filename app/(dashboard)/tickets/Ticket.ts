interface Ticket {
    id: string; // used to be string |`number
    title: string;
    body: string;
    priority: "low" | "medium" | "high"; // Adjust based on your priorities
  }

  export default Ticket