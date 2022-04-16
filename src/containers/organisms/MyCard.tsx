import MyCard from 'components/organisms/MyCard';
import { useState, VFC } from 'react';

const EnhancedMyCard: VFC = () => {
  const [isMute, setIsMute] = useState(true);
  const [isSpeakerMute, setIsSpeakerMute] = useState(true);

  return (
    <MyCard
      isMute={isMute}
      setIsMute={setIsMute}
      isSpeakerMute={isSpeakerMute}
      setIsSpeakerMute={setIsSpeakerMute}
    />
  );
};

export default EnhancedMyCard;
