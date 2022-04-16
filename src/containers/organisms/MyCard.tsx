import MyCard from 'components/organisms/MyCard';
import { useState, VFC } from 'react';

const EnhancedMyCard: VFC = () => {
  const [isMute, setIsMute] = useState(true);
  const [isSpeakerMute, setIsSpeakerMute] = useState(true);

  const onMicImageClick = (): void => {
    setIsMute(!isMute);
  };

  const onSpeakerImageClick = (): void => {
    setIsSpeakerMute(!isSpeakerMute);
  };

  return (
    <MyCard
      isMute={isMute}
      onMicImageClick={onMicImageClick}
      isSpeakerMute={isSpeakerMute}
      onSpeakerImageClick={onSpeakerImageClick}
    />
  );
};

export default EnhancedMyCard;
