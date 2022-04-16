import { FC, useRef, useState, useEffect, createContext } from 'react';
import Peer, { MeshRoom } from 'skyway-js';
import './App.css';
import MoveRoom from 'components/organisms/MoveRoom';
import MyCard from 'containers/organisms/MyCard';
import RoomInfo from 'containers/organisms/RoomInfo';
import Header from './components/organisms/Header';

type PeerSettings = {
  key: string;
  debug: 0 | 1 | 2 | 3;
};
type Constraints = {
  audio: boolean;
  video: boolean;
};
export type UserInfo = {
  id: string;
};
export type RemoteAudio = {
  stream: MediaStream;
  peerId: string;
};

export const UserInfoContext = createContext<UserInfo[]>([]);
export const RoomContext = createContext<MeshRoom | undefined>(undefined);
export const PeerContext = createContext<Peer | undefined>(undefined);

const App: FC = () => {
  const peerSettings: PeerSettings = {
    key: '6471d28c-8a60-4ed5-a59a-1c5aab458fee',
    debug: 3,
  };
  const constraints: Constraints = {
    audio: true,
    video: false,
  };
  const peerRef = useRef(new Peer(peerSettings));
  const [room, setRoom] = useState<MeshRoom>();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const localAudioRef = useRef<HTMLVideoElement>();
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [remoteAudio, setRemoteAudio] = useState<RemoteAudio[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const roomNameRef = useRef<HTMLElement>();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setLocalStream(stream);
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream;
          localAudioRef.current.muted = true;
          localAudioRef.current.play().catch((e) => console.log(e));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const roomEnterTrigger = (): void => {
    if (!peerRef.current.open) {
      return;
    }
    console.log('Peer Connection succeeded');
    console.log(`Your Peer ID is [${peerRef.current.id}]`);

    if (!room) {
      const currentRoom: MeshRoom = peerRef.current.joinRoom('Room Name', {
        mode: 'mesh',
        stream: localStream,
      });
      setUserInfo((prev) => [
        ...prev,
        { id: peerRef.current.id, name: peerRef.current.id },
      ]);

      currentRoom.on('peerJoin', (peerId) => {
        setUserInfo((prev) => [...prev, { id: peerId, name: peerId }]);

        setUserInfo((prev) => {
          currentRoom.send({
            type: 3,
            body: prev,
          });

          return prev;
        });
      });
      currentRoom.on('stream', (stream) => {
        setRemoteAudio((prev) => [...prev, { stream, peerId: stream.peerId }]);
      });

      currentRoom.on('data', ({ data }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        switch (data.type) {
          case 1:
            break;
          /*
          case 2:
            setUserInfo((prev) =>
              prev.map((user) => {
                if (user.id === src) {
                  break;
                }
              })
            );
            */
          case 3:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            console.log(`----${data.type as string}----`);
            break;
          case 4:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            console.log(`----${data.type as string}----`);
            break;
          default:
            break;
        }
      });

      currentRoom.on('peerLeave', (peerId) => {
        setUserInfo((prev) => prev.filter((user) => user.id !== peerId));

        setRemoteAudio(
          remoteAudio.filter((audio) => {
            if (audio.peerId === peerId) {
              audio.stream.getTracks().forEach((track) => track.stop());
            }

            return audio.peerId !== peerId;
          })
        );
      });
      peerRef.current.on('error', (error) => {
        console.log(error);
      });
      setRoom(currentRoom);
    }
  };
  const roomLeaveTrigger = (): void => {
    if (room) {
      room.close();
      setUserInfo([]);
      setRoom(undefined);

      setRemoteAudio((prev) =>
        prev.filter((audio) => {
          audio.stream.getTracks().forEach((track) => track.stop());

          return false;
        })
      );
    }
  };

  return (
    <>
      <Header />
      <UserInfoContext.Provider value={userInfo}>
        <RoomContext.Provider value={room}>
          <PeerContext.Provider value={peerRef.current}>
            <MoveRoom
              roomEnterTrigger={roomEnterTrigger}
              roomLeaveTrigger={roomLeaveTrigger}
            />
            <MyCard />
            <RoomInfo remoteAudio={remoteAudio} />
          </PeerContext.Provider>
        </RoomContext.Provider>
      </UserInfoContext.Provider>
    </>
  );
};

export default App;
