import LoginForm from "@/components/ui/forms/login"

export const metadata = {
  title: 'Login'
}

export default function loginPage() {

    return (
        <main className="login">
          <LoginForm />
        </main>
    )
}