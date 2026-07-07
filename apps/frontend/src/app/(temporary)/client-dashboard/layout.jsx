import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutTempClient } from "../client-login/actions";
import { LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";

export default async function TemporaryDashboardLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("temp_client_session");

  if (!session || session.value !== "authenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-5xl items-center justify-between mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-background" />
            </div>
            <span className="font-bold tracking-tight text-foreground">
              Momzcradle
            </span>
            <span className="ml-2 text-[10px] font-bold bg-brand-orange/15 text-brand-orange px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
              Temporary Access
            </span>
          </div>

          <form action={logoutTempClient}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline-block">Secure Logout</span>
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
