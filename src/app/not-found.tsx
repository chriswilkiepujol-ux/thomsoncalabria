import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="kicker">404</div>
      <h1 className="display-lg mt-5">This page is off-market too.</h1>
      <p className="lede mt-6 max-w-md">The page you are looking for does not exist or has moved. Our portfolio and locations are a click away.</p>
      <Link href="/" className="btn btn-solid mt-10"><span>Return home</span></Link>
    </main>
  );
}
