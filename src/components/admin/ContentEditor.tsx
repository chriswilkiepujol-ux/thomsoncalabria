"use client";

import { useState, useTransition } from "react";
import { saveContent } from "@/app/admin/actions";
import type { Section } from "@/lib/contentSchemas";
import { ImageField } from "./ImageField";

type Obj = Record<string, unknown>;

export function ContentEditor({ section, initial }: { section: Section; initial: Obj }) {
  const [value, setValue] = useState<Obj>(initial);
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();

  const set = (k: string, v: unknown) => setValue((s) => ({ ...s, [k]: v }));

  function save() {
    start(async () => {
      setMsg("");
      const res = await saveContent(section.key, value);
      setMsg(res.error ? `Error: ${res.error}` : "Saved. Live within a minute.");
    });
  }

  return (
    <div className="space-y-6">
      {section.fields.map((f) => {
        if (f.type === "text")
          return (
            <div key={f.key}>
              <label className="alabel">{f.label}</label>
              <input className="afield" value={(value[f.key] as string) ?? ""} onChange={(e) => set(f.key, e.target.value)} />
              {f.hint && <p className="mt-1 text-xs text-[#8a93a6]">{f.hint}</p>}
            </div>
          );
        if (f.type === "textarea")
          return (
            <div key={f.key}>
              <label className="alabel">{f.label}</label>
              <textarea rows={4} className="afield" value={(value[f.key] as string) ?? ""} onChange={(e) => set(f.key, e.target.value)} />
              {f.hint && <p className="mt-1 text-xs text-[#8a93a6]">{f.hint}</p>}
            </div>
          );
        if (f.type === "select")
          return (
            <div key={f.key}>
              <label className="alabel">{f.label}</label>
              <select className="afield" value={(value[f.key] as string) ?? ""} onChange={(e) => set(f.key, e.target.value)}>
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          );
        if (f.type === "image")
          return <ImageField key={f.key} label={f.label} defaultValue={(value[f.key] as string) ?? ""} onChange={(u) => set(f.key, u)} />;
        if (f.type === "paragraphs") {
          const arr = (value[f.key] as string[]) ?? [];
          return (
            <div key={f.key} className="space-y-3">
              <label className="alabel">{f.label}</label>
              {arr.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea rows={4} className="afield" value={p} onChange={(e) => set(f.key, arr.map((x, j) => (j === i ? e.target.value : x)))} />
                  <button type="button" className="abtn abtn-secondary self-start" onClick={() => set(f.key, arr.filter((_, j) => j !== i))}>×</button>
                </div>
              ))}
              <button type="button" className="abtn abtn-secondary" onClick={() => set(f.key, [...arr, ""])}>+ Add paragraph</button>
            </div>
          );
        }
        if (f.type === "list") {
          const arr = (value[f.key] as Obj[]) ?? [];
          return (
            <div key={f.key} className="space-y-3">
              <label className="alabel">{f.label}</label>
              {arr.map((item, i) => (
                <div key={i} className="rounded-lg border border-[#e6e3da] bg-[#faf9f6] p-4">
                  <div className="grid gap-3">
                    {f.fields.map((sub) => (
                      <div key={sub.key}>
                        <label className="alabel !text-[0.7rem]">{sub.label}</label>
                        {sub.type === "textarea" ? (
                          <textarea rows={3} className="afield" value={(item[sub.key] as string) ?? ""} onChange={(e) => set(f.key, arr.map((x, j) => (j === i ? { ...x, [sub.key]: e.target.value } : x)))} />
                        ) : (
                          <input className="afield" value={(item[sub.key] as string) ?? ""} onChange={(e) => set(f.key, arr.map((x, j) => (j === i ? { ...x, [sub.key]: e.target.value } : x)))} />
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" className="mt-3 text-xs text-red-700 underline" onClick={() => set(f.key, arr.filter((_, j) => j !== i))}>Remove</button>
                </div>
              ))}
              <button type="button" className="abtn abtn-secondary" onClick={() => set(f.key, [...arr, Object.fromEntries(f.fields.map((s) => [s.key, ""]))])}>+ Add item</button>
            </div>
          );
        }
        return null;
      })}
      <div className="flex items-center gap-4">
        <button className="abtn" onClick={save} disabled={pending}>{pending ? "Saving…" : "Save changes"}</button>
        {msg && <span className="text-sm text-[#4a5670]">{msg}</span>}
      </div>
    </div>
  );
}
