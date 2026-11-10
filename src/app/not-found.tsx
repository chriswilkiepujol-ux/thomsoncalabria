import Link from "next/link";
import { dict } from "@/lib/i18n";

export default function NotFound() {
  const en = dict("en").notFound;
  const es = dict("es").notFound;
  return (
    <main className="light flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="kicker">404</div>
      <h1 className="display-lg mt-3">{en.title}</h1>
      <p className="lede mt-4 max-w-md">{en.body}</p>
      <p className="mt-2 max-w-md text-sm text-mist" lang="es">
        {es.title} {es.body}
      </p>
      <div className="mt-10 flex gap-3">
        <Link href="/" className="btn btn-solid">{en.home}</Link>
        <Link href="/es" className="btn btn-ghost">{es.home}</Link>
      </div>
    </main>
  );
}
