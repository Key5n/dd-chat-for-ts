/* eslint-disable jsx-a11y/media-has-caption */
import HisCard from 'components/organisms/HisCard';
import { useEffect, useRef, useState, VFC } from 'react';

import { UserInfo, RemoteAudio } from 'App';

type Props = {
  userInfo: UserInfo;
  audio: RemoteAudio | undefined;
};

const EnhancedHisCard: VFC<Props> = ({ userInfo, audio }) => {
  const [isMute, setIsMute] = useState(false);
  const audioRef = useRef<HTMLMediaElement>(null);

  const onMicImageClick = (): void => {
    setIsMute(!isMute);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = audio?.stream as MediaProvider;
      audioRef.current.play().catch((e) => console.log(e));
    }
  }, [audio]);

  return (
    <>
      <HisCard
        isMute={isMute}
        onMicImageClick={onMicImageClick}
        userInfo={userInfo}
      />
      <audio ref={audioRef} muted={isMute} />
    </>
  );
};

export default EnhancedHisCard;
