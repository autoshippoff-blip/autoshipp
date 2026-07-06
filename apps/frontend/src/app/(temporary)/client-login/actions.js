"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginTempClient(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const expectedEmail = process.env.TEMP_CLIENT_EMAIL;
  const expectedPassword = process.env.TEMP_CLIENT_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    return { error: "Temporary credentials are not configured on the server." };
  }

  if (email === expectedEmail && password === expectedPassword) {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return { error: "Failed to authenticate with backend." };
      }

      // Extract access_token from Set-Cookie header
      const setCookieHeader = res.headers.get("set-cookie");
      let accessToken = null;
      if (setCookieHeader) {
        const cookiesStr = setCookieHeader.split(";");
        for (const cookieStr of cookiesStr) {
          if (cookieStr.trim().startsWith("access_token=")) {
            accessToken = cookieStr.trim().substring("access_token=".length);
            break;
          }
        }
      }

      const cookieStore = await cookies();

      // Still set the original temporary cookie to appease UI checking
      cookieStore.set("temp_client_session", "authenticated", {
        maxAge: 60 * 60 * 8, // 8 hours
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        httpOnly: true,
        path: "/",
      });

      if (accessToken) {
        cookieStore.set("access_token", accessToken, {
          maxAge: 7 * 24 * 60 * 60, // 7 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          httpOnly: true,
          path: "/",
        });
      }

      redirect("/client-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      return { error: "Backend unreachable." };
    }
  }

  return { error: "Invalid credentials. Please try again." };
}

export async function logoutTempClient() {
  const cookieStore = await cookies();
  cookieStore.delete("temp_client_session");
  cookieStore.delete("access_token");
  redirect("/client-login");
}
