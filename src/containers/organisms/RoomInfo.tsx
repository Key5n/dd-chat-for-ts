import HisCard from 'containers/organisms/HisCard';
import { VFC, useContext } from 'react';
import Peer, { MeshRoom } from 'skyway-js';
import {
  PeerContext,
  UserInfoContext,
  RoomContext,
  UserInfo,
  RemoteAudio,
} from 'App';

type Props = {
  remoteAudio: RemoteAudio[];
};

const EnhancedRoomInfo: VFC<Props> = ({ remoteAudio }) => {
  const room: MeshRoom | undefined = useContext(RoomContext);
  const peer: Peer | undefined = useContext(PeerContext);
  const userInfo: UserInfo[] | undefined = useContext(UserInfoContext);

  const userInfoExceptYou: UserInfo[] = userInfo.filter(
    (user) => peer && user.id !== peer.id
  );

  const getMediaObject = (id: string): RemoteAudio | undefined => {
    const hoge: RemoteAudio | undefined = remoteAudio.find(
      (audio) => audio.peerId === id
    );

    return hoge;
  };

  const userList = userInfoExceptYou.map((user) => (
    <li key={user.id}>
      <HisCard userInfo={user} audio={getMediaObject(user.id)} />
    </li>
  ));

  return (
    <>
      <h2 className="room-name">Room {room && `: default`}</h2>;
      <ul>{userList}</ul>
    </>
  );
};
export default EnhancedRoomInfo;
