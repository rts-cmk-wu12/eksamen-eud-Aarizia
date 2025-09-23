import ProfileForm from "@/components/ui/forms/change-profile"
import { getSingleUser } from "@/utilities/get-data";
import { cookies } from "next/headers"
import { notFound } from "next/navigation";

export const metadata = {
  title: 'Profile'
}

export default async function profilePage() {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('swaphub_access_token');
    const userId = cookieStore.get('swaphub_user_id');
    let userData = null;
    //console.log(userData);

    if (!userId || !accessToken) {
        notFound();
    }

    if (userId && accessToken) userData = await getSingleUser(userId.value, accessToken.value);

    return (
        <main className="profile-page">
            <ProfileForm userData={userData} />
        </main>
    )
}