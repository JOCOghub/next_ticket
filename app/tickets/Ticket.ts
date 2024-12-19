interface Ticket {
    id: string | number; // The type depends on your data structure
    title: string;
    body: string;
    priority: "low" | "medium" | "high"; // Adjust based on your priorities
  }

  export default Ticket