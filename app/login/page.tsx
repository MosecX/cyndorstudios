// app/login/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    // Ya hay sesión iniciada
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-white">
      {/* Aquí tu <LoginForm /> */}
        <LoginForm />
    </div>
  );
}
