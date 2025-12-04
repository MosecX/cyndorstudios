// app/login/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    // Ya hay sesión iniciada
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-white">
      <LoginForm />
    </div>
  );
}
