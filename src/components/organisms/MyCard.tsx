/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { VFC } from 'react';
import icon from 'image/icon.svg';
import mic from 'image/mic.svg';
import micoff from 'image/micoff.svg';
import headphone from 'image/headphone.svg';
import headphoneoff from 'image/headphoneoff.png';

type Props = {
  isMute: boolean;
  setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
  isSpeakerMute: boolean;
  setIsSpeakerMute: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyCard: VFC<Props> = ({
  isMute,
  setIsMute,
  isSpeakerMute,
  setIsSpeakerMute,
}) => (
  <div className="my-card">
    <img src={icon} alt="icon" width="20%" />
    <p className="my-name">My Name</p>
    {isMute ? (
      <img
        src={micoff}
        alt="mic-icon"
        width="5%"
        style={{ marginRight: '2%' }}
        onClick={() => setIsMute(!isMute)}
      />
    ) : (
      <img
        src={mic}
        alt="mic-icon"
        width="5%"
        style={{ marginRight: '2%' }}
        onClick={() => setIsMute(!isMute)}
      />
    )}
    {isSpeakerMute ? (
      <img
        src={headphone}
        alt="speaker"
        width="5%"
        style={{ marginRight: '2%' }}
        onClick={() => setIsSpeakerMute(!isSpeakerMute)}
      />
    ) : (
      <img
        src={headphoneoff}
        alt="speaker"
        width="5%"
        style={{ marginRight: '2%' }}
        onClick={() => setIsSpeakerMute(!isSpeakerMute)}
      />
    )}
  </div>
);

export default MyCard;
