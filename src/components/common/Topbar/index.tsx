import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";
import { useWindowSize } from "usehooks-ts";
import { useRouter } from "next/router";

export default function Topbar() {
  const [session] = useSession();
  const { width } = useWindowSize();
  const router = useRouter();

  const handleSignout = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  const showProfile = () => {
    router.push("/profile");
  };

  if (width < 992) {
    return (
      <div className="absolute top-0 navbar border-b border-custom-border flex justify-between items-center min-h-fit py-[10px] px-3">
        <div>
          <Link href="/" className="btn btn-ghost h-auto normal-case text-xl">
            <Image src="/images/logo-mobile.png" width={30} height={30} alt="Logo" />
          </Link>
        </div>
        {session && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost w-auto h-auto min-h-fit btn-circle avatar">
              <Image src="/icons/hamburger.svg" width={24} height={24} alt="Logo" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-custom-lightgraytwo text-white rounded-box w-40 z-10"
            >
              <li>
                <a onClick={showProfile}>Profile</a>
              </li>
              <li>
                <a>Notifications</a>
              </li>
              <li>
                <a>Friend requests</a>
              </li>
              <li>
                <a onClick={handleSignout}>Sign out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="absolute top-0 navbar border-b border-custom-border min-h-fit py-3 px-5">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost h-auto normal-case text-xl">
          <Image src="/images/logo.png" width={255} height={72} alt="Logo" />
        </Link>
      </div>
      {session && (
        <div className="space-x-3">
          <div className="btn btn-ghost border-none p-0 w-[63px] h-[63px]">
            <Link href="?type=person&username=torem">
              <Image src="/images/chat.png" width={63} height={63} alt="Chat" />
            </Link>
          </div>
          <div className="btn btn-ghost border-none p-0 w-[63px] h-[63px]">
            <Image src="/images/notification.png" width={63} height={63} alt="Notification" />
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="border-none pt-1 btn btn-ghost p-0 avatar w-[63px] h-[63px]"
            >
              <Image src="/images/bot-icon.png" width={63} height={63} alt="Logo" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
            >
              <li>
                <a onClick={showProfile}>Profile</a>
              </li>
              <li>
                <a onClick={handleSignout}>Sign out</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
