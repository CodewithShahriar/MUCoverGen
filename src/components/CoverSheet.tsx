import logoUrl from "@/assets/MU_Logo.svg.webp?url";
import { formatDate, type CoverData, type TemplateId } from "@/lib/cover-data";

function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Metropolitan University logo"
      className={className}
      crossOrigin="anonymous"
    />
  );
}

function Classic({ d }: { d: CoverData }) {
  return (
    <div className="flex h-full flex-col items-center text-center font-serif text-[#111]">
      {d.showLogo && <Logo className="mx-auto w-[112mm]" />}
      <div className="mt-[14mm] text-[20pt] font-bold">{d.assignmentTitle}</div>
      {d.assignmentTopic && (
        <div className="mt-[3mm] text-[13pt] italic">{d.assignmentTopic}</div>
      )}

      <div className="mt-[12mm] space-y-[1.5mm] text-[15pt] leading-[1.5]">
        <p>
          <span className="font-bold">Course Name: </span>
          {d.courseName}
        </p>
        <p>
          <span className="font-bold">Course Code: </span>
          {d.courseCode}
        </p>
      </div>

      <div className="mt-[12mm] text-[15pt] leading-[1.55]">
        <p className="text-[16pt] font-bold">Submitted to:</p>
        <p>{d.toName}</p>
        <p>{d.toDesignation}</p>
        <p>{d.toDepartment}</p>
        <p>{d.toUniversity}</p>
      </div>

      <div className="mt-[11mm] text-[15pt] leading-[1.55]">
        <p className="text-[16pt] font-bold">Submitted by:</p>
        <p>Name: {d.fromName}</p>
        <p>ID: {d.fromId}</p>
        <p>Batch: {d.fromBatch}</p>
          <p>Section: {d.fromSection}</p>
      </div>

      <p className="mt-[10mm] text-[16pt] font-bold">
        Date of submission: {formatDate(d.submissionDate)}
      </p>
    </div>
  );
}

function Minimal({ d }: { d: CoverData }) {
  return (
    <div className="flex h-full flex-col text-left text-[#1b1b1f]">
      <div className="flex items-start justify-between">
        {d.showLogo && <Logo className="w-[70mm]" />}
        <div className="text-right text-[10pt] uppercase tracking-[0.28em] text-[#6b6b74]">
          {d.universityTagline}
        </div>
      </div>

      <div className="mt-[26mm] h-px w-full bg-[#c8c8d0]" />
      <p className="mt-[6mm] text-[10pt] uppercase tracking-[0.34em] text-[#8a1420]">
        {d.courseCode}
      </p>
      <h1 className="mt-[4mm] text-[34pt] font-light leading-[1.05] tracking-tight">
        {d.assignmentTitle}
      </h1>
      {d.assignmentTopic && (
        <p className="mt-[4mm] max-w-[130mm] text-[14pt] text-[#4a4a52]">{d.assignmentTopic}</p>
      )}
      <p className="mt-[6mm] text-[13pt] text-[#4a4a52]">{d.courseName}</p>
      <div className="mt-[8mm] h-px w-[45mm] bg-[#8a1420]" />

      <div className="mt-auto grid grid-cols-2 gap-[12mm] pb-[4mm]">
        <div>
          <p className="text-[9.5pt] uppercase tracking-[0.28em] text-[#8a8a92]">Submitted to</p>
          <div className="mt-[4mm] space-y-[1mm] text-[11.5pt] leading-[1.5]">
            <p className="text-[13pt] font-medium">{d.toName}</p>
            <p className="text-[#4a4a52]">{d.toDesignation}</p>
            <p className="text-[#4a4a52]">{d.toDepartment}</p>
            <p className="text-[#4a4a52]">{d.toUniversity}</p>
          </div>
        </div>
        <div>
          <p className="text-[9.5pt] uppercase tracking-[0.28em] text-[#8a8a92]">Submitted by</p>
          <div className="mt-[4mm] space-y-[1mm] text-[11.5pt] leading-[1.5]">
            <p className="text-[13pt] font-medium">{d.fromName}</p>
            <p className="text-[#4a4a52]">ID: {d.fromId}</p>
            <p className="text-[#4a4a52]">Batch: {d.fromBatch}</p>
            <p className="text-[#4a4a52]">{d.fromDepartment}</p>
            <p className="text-[#4a4a52]">{d.fromUniversity}</p>
          </div>
        </div>
      </div>

      <div className="mt-[8mm] flex items-center justify-between border-t border-[#c8c8d0] pt-[4mm] text-[10.5pt]">
        <span className="uppercase tracking-[0.24em] text-[#8a8a92]">Date of submission</span>
        <span className="font-medium">{formatDate(d.submissionDate)}</span>
      </div>
    </div>
  );
}

function Tech({ d }: { d: CoverData }) {
  return (
    <div className="flex h-full flex-col text-[#12162b]">
      <div className="flex gap-[2mm]">
        <span className="h-[3mm] flex-1 bg-[#1e2358]" />
        <span className="h-[3mm] w-[24mm] bg-[#e2231a]" />
        <span className="h-[3mm] w-[12mm] bg-[#7b8194]" />
      </div>

      <div className="mt-[14mm] flex items-center gap-[8mm]">
        {d.showLogo && <Logo className="w-[78mm]" />}
      </div>

      <div className="mt-[16mm] border-l-[1.5mm] border-[#e2231a] pl-[7mm]">
        <p className="text-[10pt] font-semibold uppercase tracking-[0.3em] text-[#7b8194]">
          {d.fromDepartment}
        </p>
        <h1 className="mt-[3mm] text-[30pt] font-bold uppercase leading-[1.05] tracking-tight text-[#1e2358]">
          {d.assignmentTitle}
        </h1>
        {d.assignmentTopic && (
          <p className="mt-[3mm] text-[13pt] text-[#3d425c]">{d.assignmentTopic}</p>
        )}
      </div>

      <div className="mt-[12mm] grid grid-cols-2 gap-[4mm]">
        <div className="rounded-[2mm] bg-[#f1f3f9] p-[6mm]">
          <p className="text-[9pt] uppercase tracking-[0.26em] text-[#7b8194]">Course Name</p>
          <p className="mt-[2mm] text-[13pt] font-semibold">{d.courseName}</p>
        </div>
        <div className="rounded-[2mm] bg-[#f1f3f9] p-[6mm]">
          <p className="text-[9pt] uppercase tracking-[0.26em] text-[#7b8194]">Course Code</p>
          <p className="mt-[2mm] text-[13pt] font-semibold">{d.courseCode}</p>
        </div>
      </div>

      <div className="mt-[10mm] grid grid-cols-2 gap-[10mm]">
        <div className="border-t-[0.6mm] border-[#1e2358] pt-[4mm]">
          <p className="text-[9.5pt] font-semibold uppercase tracking-[0.26em] text-[#e2231a]">
            Submitted To
          </p>
          <div className="mt-[3mm] space-y-[1mm] text-[11.5pt] leading-[1.5]">
            <p className="text-[13pt] font-semibold">{d.toName}</p>
            <p className="text-[#3d425c]">{d.toDesignation}</p>
            <p className="text-[#3d425c]">{d.toDepartment}</p>
            <p className="text-[#3d425c]">{d.toUniversity}</p>
          </div>
        </div>
        <div className="border-t-[0.6mm] border-[#1e2358] pt-[4mm]">
          <p className="text-[9.5pt] font-semibold uppercase tracking-[0.26em] text-[#e2231a]">
            Submitted By
          </p>
          <div className="mt-[3mm] space-y-[1mm] text-[11.5pt] leading-[1.5]">
            <p className="text-[13pt] font-semibold">{d.fromName}</p>
            <p className="text-[#3d425c]">ID: {d.fromId}</p>
            <p className="text-[#3d425c]">Batch: {d.fromBatch}</p>
            <p className="text-[#3d425c]">Section: {d.fromSection}</p>
            <p className="text-[#3d425c]">{d.fromUniversity}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="text-[9pt] uppercase tracking-[0.26em] text-[#7b8194]">Date of Submission</p>
          <p className="mt-[1mm] text-[14pt] font-semibold">{formatDate(d.submissionDate)}</p>
        </div>
        <p className="text-[10pt] uppercase tracking-[0.24em] text-[#7b8194]">
          {d.universityName}
        </p>
      </div>
    </div>
  );
}

export function CoverSheet({ data, template }: { data: CoverData; template: TemplateId }) {
  const bg =
    template === "minimal" ? "bg-[#fbfaf7]" : template === "tech" ? "bg-white" : "bg-white";
  return (
    <div id="cover-sheet" className={`cover-sheet ${bg}`}>
      {template === "classic" && <Classic d={data} />}
      {template === "minimal" && <Minimal d={data} />}
      {template === "tech" && <Tech d={data} />}
    </div>
  );
}
