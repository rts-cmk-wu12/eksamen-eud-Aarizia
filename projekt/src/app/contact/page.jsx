//import NewsletterForm from "@/components/ui/forms/newsletter"

import NewsletterForm from "@/components/ui/forms/newsletter"

export const metadata = {
  title: 'Contact'
}

export default function contactPage() {

    return (
        <main className="contact-page">
            <NewsletterForm />
        </main>
    )
}