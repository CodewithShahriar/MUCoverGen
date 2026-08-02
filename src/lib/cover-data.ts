export type TemplateId = "classic" | "minimal" | "tech";

export type CoverData = {
  universityName: string;
  universityTagline: string;
  showLogo: boolean;
  assignmentTitle: string;
  assignmentTopic: string;
  courseName: string;
  courseCode: string;
  toName: string;
  toDesignation: string;
  toDepartment: string;
  toUniversity: string;
  fromName: string;
  fromId: string;
  fromBatch: string;
  fromSection: string;
  fromDepartment: string;
  fromUniversity: string;
  submissionDate: string;
};

export const todayISO = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

export const formatDate = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y.slice(2)}`;
};

export const defaultCover: CoverData = {
  universityName: "Metropolitan University",
  universityTagline: "Sylhet, Bangladesh",
  showLogo: true,
  assignmentTitle: "Assignment",
  assignmentTopic: "",
  courseName: "Object Oriented Programming",
  courseCode: "CSE221",
  toName: "Ishrar Nazah Chowdhury",
  toDesignation: "Lecturer",
  toDepartment: "Department of Computer Science & Engineering",
  toUniversity: "Metropolitan University, Sylhet.",
  fromName: "Abid Shahriiar",
  fromId: "232-115-022",
  fromBatch: "59th (Retake with 62 - D)",
  fromSection: "D",
  fromDepartment: "Department of Computer Science & Engineering",
  fromUniversity: "Metropolitan University, Sylhet.",
  submissionDate: todayISO(),
};

export const templates: { id: TemplateId; label: string; hint: string }[] = [
  { id: "classic", label: "Classic Metropolitan", hint: "Centered, serif, university standard" },
  { id: "minimal", label: "Modern Minimalist", hint: "Left aligned, thin accent rules" },
  { id: "tech", label: "Tech / Engineering", hint: "Geometric accent bar, modern scale" },
];
