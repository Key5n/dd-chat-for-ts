/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { VFC } from 'react';
import icon from 'image/icon.svg';
import mic from 'image/mic.svg';
import micoff from 'image/micoff.svg';
import { UserInfo } from 'App';

type Props = {
  isMute: boolean;
  onMicImageClick: () => void;
  userInfo: UserInfo;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HisCard: VFC<Props> = ({ isMute, onMicImageClick, userInfo }) => (
  <div className="his-card">
    <img src={icon} alt="icon" width="15%" />
    <p className="his-name">{userInfo.id}</p>
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
  </div>
);

export default HisCard;
