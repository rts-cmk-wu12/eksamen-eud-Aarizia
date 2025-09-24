import { useActionState } from "react"
import logoutFormAction from "./logout-form-action"
import '../_form.scss';
import styles from '../../../../app/page.module.scss'

export default function LogoutForm() {

    const [formState, formAction, pending] = useActionState(logoutFormAction);

    return (
        <form action={formAction}>
            {pending && <button className={`${styles.common_font} form__button--medium-color form__button--disabled`} type="submit" disabled>Sign out</button>}
            {!pending && <button className={`${styles.common_font} form__button--medium-color`} type="submit">Sign out</button>}
        </form>
    )
}