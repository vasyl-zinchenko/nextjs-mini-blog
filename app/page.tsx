import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

	if (!session) {
		redirect('/login')
	}

  return (
    <div>
      {JSON.stringify(session)}
      <div className='flex items-center gap-4'>
        Hey!
        <LogoutButton />
      </div>
      <Link
        href='/login'
        className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
      >
        Login
      </Link>
    </div>
  );
}
