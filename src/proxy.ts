import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

async function adminGuard(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isLogin = path === "/admin/login";

  if (!isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }
  return response;
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin" || path.startsWith("/admin/")) return adminGuard(request);

  // Spanish lives under /es — served by the [lang] segment directly.
  if (path === "/es" || path.startsWith("/es/")) return NextResponse.next();

  // English has no prefix publicly; send any /en URL to its clean form.
  if (path === "/en" || path.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = path.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Everything else is English: rewrite internally to the [lang]=en pages.
  const url = request.nextUrl.clone();
  url.pathname = `/en${path === "/" ? "" : path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (sitemap.xml, robots.txt, icon.svg, images).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
