export const metrics = {
  projects: 8,
  openTasks: 23,
  today: 7,
  people: 18,
  vehicles: 6,
  materialOpen: 12,
  revenue: 186500,
  costs: 74200
};

export const projects = [
  { id: 1, name: "SBT Querschlag QS56", type: "Tunnelbau", location: "Semmering", progress: 64, status: "active", budget: 250000 },
  { id: 2, name: "Industrieanlage Inbetriebnahme", type: "Automation", location: "Oberösterreich", progress: 38, status: "active", budget: 120000 },
  { id: 3, name: "Servicevertrag Kunde Nord", type: "Service", location: "Linz", progress: 82, status: "active", budget: 45000 },
  { id: 4, name: "Interne Organisation", type: "Office", location: "Zentrale", progress: 25, status: "paused", budget: 15000 }
];

export const tasks = [
  { id: 1, title: "Mängelliste QS56 prüfen", project: "SBT Querschlag QS56", person: "Mario", status: "open", priority: "high", due: "Heute" },
  { id: 2, title: "Fotodokumentation Briden ergänzen", project: "SBT Querschlag QS56", person: "Ivan", status: "progress", priority: "normal", due: "Heute" },
  { id: 3, title: "Materialbedarf für nächste Woche prüfen", project: "Industrieanlage Inbetriebnahme", person: "Julian", status: "open", priority: "normal", due: "Morgen" },
  { id: 4, title: "Fahrzeugservice VB-123AB planen", project: "Fuhrpark", person: "Mario", status: "open", priority: "low", due: "Diese Woche" },
  { id: 5, title: "Kundenangebot vorbereiten", project: "Servicevertrag Kunde Nord", person: "Admin", status: "done", priority: "normal", due: "Erledigt" }
];

export const people = [
  { id: 1, name: "Mario Juric", role: "Bauleiter", company: "Intern", phone: "+43 ...", status: "active" },
  { id: 2, name: "Ivan K.", role: "Monteur", company: "Partnerfirma", phone: "+43 ...", status: "active" },
  { id: 3, name: "Julian M.", role: "Prüfung", company: "Intern", phone: "+43 ...", status: "active" },
  { id: 4, name: "Ramona", role: "Entwicklung", company: "Extern", phone: "-", status: "active" }
];

export const vehicles = [
  { id: 1, plate: "VB-123AB", name: "VW Transporter", driver: "Mario", service: "2026-08-15", status: "active" },
  { id: 2, plate: "L-456CD", name: "Mercedes Vito", driver: "Ivan", service: "2026-09-10", status: "active" },
  { id: 3, plate: "W-789EF", name: "Anhänger", driver: "-", service: "2027-01-20", status: "active" }
];

export const material = [
  { id: 1, name: "Briden", amount: 100, unit: "Stk", supplier: "Lieferant A", status: "open" },
  { id: 2, name: "Kabel 240mm²", amount: 80, unit: "m", supplier: "Lieferant B", status: "ordered" },
  { id: 3, name: "Kabelbinder Edelstahl", amount: 500, unit: "Stk", supplier: "Lieferant C", status: "delivered" }
];

export const documents = [
  { id: 1, name: "Prüfprotokoll QS56.pdf", type: "PDF", project: "SBT Querschlag QS56", date: "2026-07-02" },
  { id: 2, name: "Fotodokumentation Briden.zip", type: "ZIP", project: "SBT Querschlag QS56", date: "2026-07-01" },
  { id: 3, name: "Kundenangebot Nord.docx", type: "DOCX", project: "Servicevertrag Kunde Nord", date: "2026-06-30" }
];

export const finance = [
  { id: 1, title: "Teilrechnung SBT", type: "Einnahme", amount: 50000, status: "open" },
  { id: 2, title: "Material Einkauf", type: "Ausgabe", amount: 12000, status: "open" },
  { id: 3, title: "Servicevertrag Nord", type: "Einnahme", amount: 18500, status: "paid" }
];
