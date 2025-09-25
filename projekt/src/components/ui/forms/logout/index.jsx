import { useActionState } from "react"
import logoutFormAction from "./logout-form-action"
import '../_form.scss';
import '../_modal.scss';
import styles from '../../../../app/page.module.scss'

export default function LogoutForm() {

    const [formState, formAction, pending] = useActionState(logoutFormAction);

    return (
        <form action={formAction}>
            {pending ?
                <button disabled type="submit" className={`${styles.common_font} modal__button modal__button--dark modal__button--disabled small-font`}>...</button>
            :
                <button type="submit" className={`${styles.common_font} modal__button modal__button--dark small-font`}>Sign out</button>
            }
        </form>
    )
}