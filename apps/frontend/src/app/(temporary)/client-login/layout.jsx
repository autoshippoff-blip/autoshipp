import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClientLoginLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("temp_client_session");

  if (session?.value === "authenticated") {
    redirect("/client-dashboard/whatsapp");
  }

  return <>{children}</>;
}
