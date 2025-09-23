'use server';

import z, { success } from "zod";

export default async function newsletterFormAction(prevState, formData) {

    const email = formData.get('email');

    const filledSchema = z.object({
        email: z.string().min(1, {message: 'Email field has to be filled'})
    });

    const filledValidated = filledSchema.safeParse({
        email
    });

    if (!filledValidated.success) return {
        ...filledValidated,
        ...z.treeifyError(filledValidated.error)
    }

    const emailRegexSchema = z.object({
        email: z.email('Invalid email')
    });

    const emailRegexValidated = emailRegexSchema.safeParse({
        email
    })

    if (!emailRegexValidated.success) return {
        ...emailRegexValidated,
        ...z.treeifyError(emailRegexValidated.error),
        data: {
            email
        }
    }

    // post request

    const response = await fetch('http://localhost:4000/api/v1/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailRegexValidated.data.email
        })
    });

    if (response.status === 204) return {
        success: true
    }
}