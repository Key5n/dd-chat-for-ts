import { VFC } from 'react';

type Props = {
  roomEnterTrigger: () => void;
  roomLeaveTrigger: () => void;
};

const MoveRoom: VFC<Props> = ({ roomEnterTrigger, roomLeaveTrigger }) => (
  <div className="move-room">
    <input type="text" defaultValue="defalut" />
    <button type="submit" onClick={roomEnterTrigger}>
      Enter
    </button>
    <button type="submit" onClick={roomLeaveTrigger}>
      Leave
    </button>
  </div>
);

export default MoveRoom;
