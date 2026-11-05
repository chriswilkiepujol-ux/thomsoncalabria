import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-less client for public, cacheable reads (static pages, sitemap).
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
