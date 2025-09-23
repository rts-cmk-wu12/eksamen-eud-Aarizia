import RegisterUserForm from "@/components/ui/forms/register-user"

export const metadata = {
  title: 'Register'
}

export default function registerUserPage() {

    return (
        <main className="register-user">
            <RegisterUserForm />
        </main>
    )
}