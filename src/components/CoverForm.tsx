import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templates, type CoverData, type TemplateId } from "@/lib/cover-data";

type Props = {
  data: CoverData;
  template: TemplateId;
  onChange: (patch: Partial<CoverData>) => void;
  onTemplate: (t: TemplateId) => void;
};

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 bg-card"
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card/60 p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function CoverForm({ data, template, onChange, onTemplate }: Props) {
  return (
    <div className="space-y-4">
      <Section title="Template">
        <Select value={template} onValueChange={(v) => onTemplate(v as TemplateId)}>
          <SelectTrigger className="bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {templates.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.label} — {t.hint}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Section>

      <Section title="University">
        <Field
          label="University Name"
          value={data.universityName}
          onChange={(v) => onChange({ universityName: v })}
        />
        <Field
          label="Location / Tagline"
          value={data.universityTagline}
          onChange={(v) => onChange({ universityTagline: v })}
        />
        <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <span className="text-sm text-muted-foreground">Show university logo</span>
          <Switch
            checked={data.showLogo}
            onCheckedChange={(v) => onChange({ showLogo: v })}
          />
        </div>
      </Section>

      <Section title="Assignment">
        <Field
          label="Title"
          value={data.assignmentTitle}
          onChange={(v) => onChange({ assignmentTitle: v })}
          placeholder="Assignment / Lab Report / Project Documentation"
        />
        <Field
          label="Topic (optional)"
          value={data.assignmentTopic}
          onChange={(v) => onChange({ assignmentTopic: v })}
          placeholder="Inheritance & Polymorphism"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Course Name"
            value={data.courseName}
            onChange={(v) => onChange({ courseName: v })}
          />
          <Field
            label="Course Code"
            value={data.courseCode}
            onChange={(v) => onChange({ courseCode: v })}
          />
        </div>
      </Section>

      <Section title="Submitted To">
        <Field label="Name" value={data.toName} onChange={(v) => onChange({ toName: v })} />
        <Field
          label="Designation"
          value={data.toDesignation}
          onChange={(v) => onChange({ toDesignation: v })}
        />
        <Field
          label="Department"
          value={data.toDepartment}
          onChange={(v) => onChange({ toDepartment: v })}
        />
        <Field
          label="University"
          value={data.toUniversity}
          onChange={(v) => onChange({ toUniversity: v })}
        />
      </Section>

      <Section title="Submitted By">
        <Field label="Name" value={data.fromName} onChange={(v) => onChange({ fromName: v })} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Student ID"
            value={data.fromId}
            onChange={(v) => onChange({ fromId: v })}
          />
          <Field label="Batch" value={data.fromBatch} onChange={(v) => onChange({ fromBatch: v })} />
        </div>
        <Field
          label="Section"
          value={data.fromSection}
          onChange={(v) => onChange({ fromSection: v })}
        />
        <Field
          label="Department"
          value={data.fromDepartment}
          onChange={(v) => onChange({ fromDepartment: v })}
        />
        <Field
          label="University"
          value={data.fromUniversity}
          onChange={(v) => onChange({ fromUniversity: v })}
        />
      </Section>

      <Section title="Submission">
        <Field
          label="Date of Submission"
          type="date"
          value={data.submissionDate}
          onChange={(v) => onChange({ submissionDate: v })}
        />
      </Section>
    </div>
  );
}
