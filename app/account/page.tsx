// app/account/page.tsx
import AccountPanel from "@/components/AccountPanel";

export default function AccountPage() {
  return (
    <main className="bg-neutral-900 min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Mi Cuenta</h1>
      <AccountPanel />
    </main>
  );
}
