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
  onMicImageClick: () => void;
  isSpeakerMute: boolean;
  onSpeakerImageClick: () => void;
};

const MyCard: VFC<Props> = ({
  isMute,
  onMicImageClick,
  isSpeakerMute,
  onSpeakerImageClick,
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
        onClick={onMicImageClick}
      />
    ) : (
      <img
        src={mic}
        alt="mic-icon"
        width="5%"
        style={{ marginRight: '2%' }}
        onClick={onMicImageClick}
      />
    )}
    {isSpeakerMute ? (
      <img
        src={headphone}
        alt="speaker"
        width="5%"
        style={{ marginRight: '2%' }}
        onClick={onSpeakerImageClick}
      />
    ) : (
      <img
        src={headphoneoff}
        alt="speaker"
        width="5%"
        style={{ marginRight: '2%' }}
        onClick={onSpeakerImageClick}
      />
    )}
  </div>
);

export default MyCard;
