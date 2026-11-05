import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata = { title: "Admin — Thomson & Calabria", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div className="admin">{children}</div>;

  const nav = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/properties", label: "Properties" },
    { href: "/admin/content", label: "Pages & copy" },
    { href: "/admin/enquiries", label: "Enquiries" },
  ];

  return (
    <div className="admin">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-[#e6e3da] bg-white p-6 md:flex">
          <Link href="/admin" className="font-display text-xl font-medium tracking-wide text-[#0a1730]">
            Thomson &amp; Calabria
          </Link>
          <div className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-[#8a93a6]">Site admin</div>
          <nav className="mt-10 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm font-medium text-[#2a3650] hover:bg-[#f0eee8]">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3 text-xs text-[#8a93a6]">
            <Link href="/" target="_blank" className="block hover:text-[#0a1730]">View live site ↗</Link>
            <div className="truncate">{user.email}</div>
            <form action={signOut}>
              <button className="abtn abtn-secondary !px-3 !py-1.5 text-xs">Sign out</button>
            </form>
          </div>
        </aside>
        <div className="flex-1">
          <div className="flex items-center gap-4 overflow-x-auto border-b border-[#e6e3da] bg-white px-4 py-3 md:hidden">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap text-sm font-medium">{n.label}</Link>
            ))}
          </div>
          <main className="mx-auto max-w-5xl p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
