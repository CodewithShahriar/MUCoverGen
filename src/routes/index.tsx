import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoverForm } from "@/components/CoverForm";
import { CoverSheet } from "@/components/CoverSheet";
import { SheetScaler } from "@/components/SheetScaler";
import { defaultCover, templates, type CoverData, type TemplateId } from "@/lib/cover-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Assignment Cover Page Generator | Metropolitan University" },
      {
        name: "description",
        content:
          "Create and download a print-perfect A4 university assignment cover page in seconds. Three professional templates, live preview, one-click PDF.",
      },
      { property: "og:title", content: "Assignment Cover Page Generator" },
      {
        property: "og:description",
        content:
          "Build a print-perfect A4 assignment cover page with live preview and one-click PDF download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [data, setData] = useState<CoverData>(defaultCover);
  const [template, setTemplate] = useState<TemplateId>("classic");

  const patch = (p: Partial<CoverData>) => setData((d) => ({ ...d, ...p }));
  const label = useMemo(
    () => templates.find((t) => t.id === template)?.label ?? "",
    [template],
  );

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="no-print sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
                Cover Page Generator
              </h1>
              <p className="truncate text-xs text-muted-foreground">{label} template · A4</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setData(defaultCover)}
              className="hidden sm:inline-flex"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button size="sm" onClick={() => window.print()}>
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
        <div className="no-print order-2 lg:order-1 lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-1">
          <CoverForm
            data={data}
            template={template}
            onChange={patch}
            onTemplate={setTemplate}
          />
        </div>

        <div className="preview-pane order-1 lg:order-2 rounded-2xl border border-border bg-card/50 p-3 shadow-sm sm:p-6">
          <p className="no-print mb-3 text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Live A4 Preview
          </p>
          <SheetScaler>
            <CoverSheet data={data} template={template} />
          </SheetScaler>
        </div>
      </main>
    </div>
  );
}
