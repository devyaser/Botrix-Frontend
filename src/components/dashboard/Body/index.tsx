import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import Chat from "./Chat";
import User from "./User";
import PinnedChats from "./PinnedChats";
import Leaderboard from "./Leaderboard";
import AllChats from "./AllChats";

import { mock_chats, mock_users } from "../../../mock-data";
import { selectPinnedChats, setPinnedChats } from "../../../reducers/chat/chatSlice";

export default function Body() {
  const dispatch = useAppDispatch();
  const pinnedChats = useAppSelector(selectPinnedChats);
  const router = useRouter();
  const { type, id, username } = router.query;

  const handleFollow = (chat: any) => {
    if (pinnedChats.findIndex((c: any) => c.id === chat.id) !== -1) {
      dispatch(setPinnedChats(pinnedChats.filter((c: any) => c.id !== chat.id)));
    } else {
      dispatch(setPinnedChats([...pinnedChats, chat]));
    }
  };

  switch (type) {
    case "pinned_chats":
      return <PinnedChats />;
    case "leaderboard":
      return <Leaderboard />;
    case "all_chats":
      return <AllChats />;
    case "person":
      const user: any = mock_users.find((user) => user.username === username) ?? mock_users[0];
      const user_chats = mock_chats.filter((chats) => chats.username === username);
      return <User avatar={user.avatar} username={user.username} chats={user_chats} />;
    default:
      const chatId = id ? id : "1";
      const chat: any = mock_chats.find((chat) => chat.id === chatId);
      return (
        <Chat
          title={chat.title}
          chats={chat.chats}
          isFollowed={pinnedChats.findIndex((chat: any) => chat.id === chatId) !== -1}
          handleFollow={() => handleFollow(chat)}
        />
      );
  }
}
