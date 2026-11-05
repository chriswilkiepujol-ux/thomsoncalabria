import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PropertyForm } from "@/components/admin/PropertyForm";
import type { Property } from "@/lib/content";

export default async function EditProperty({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  let property: Property | null = null;
  if (id !== "new") {
    const supabase = await createClient();
    const { data } = await supabase.from("properties").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    property = data as Property;
  }
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-medium">{property ? "Edit property" : "New property"}</h1>
      {saved && <div className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">Saved. Changes are live within a minute.</div>}
      <PropertyForm property={property} />
    </div>
  );
}
