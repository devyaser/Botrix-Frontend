import Image from "next/image";
import ClickableCard from "../common/ClickableCard";
import { useRouter } from "next/router";

export default function MyChats() {
  const router = useRouter();

  const handleClick = () => {
    router.push("?type=person&username=torem");
  };

  return <ClickableCard title={"My Chats"} handleClick={handleClick} />;
}
