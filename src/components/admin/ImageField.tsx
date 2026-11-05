"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ImageField({
  name,
  label,
  defaultValue,
  onChange,
}: {
  name?: string;
  label: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setErr("");
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
      onChange?.(data.publicUrl);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="alabel">{label}</label>
      <div className="flex gap-4">
        <div className="h-24 w-36 shrink-0 overflow-hidden rounded-lg border border-[#d9d6cc] bg-[#f0eee8]">
          {url && <img src={url} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="flex-1 space-y-2">
          <input
            className="afield"
            placeholder="Image URL, or upload a file →"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              onChange?.(e.target.value);
            }}
          />
          <input type="file" accept="image/*" className="text-xs" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          {busy && <p className="text-xs text-[#6a7490]">Uploading…</p>}
          {err && <p className="text-xs text-red-700">{err}</p>}
        </div>
      </div>
      {name && <input type="hidden" name={name} value={url} />}
    </div>
  );
}
