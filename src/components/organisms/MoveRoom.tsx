import { forwardRef } from 'react';

type Props = {
  roomEnterTrigger: () => void;
  roomLeaveTrigger: () => void;
};

const MoveRoom = forwardRef<HTMLInputElement, Props>(
  ({ roomEnterTrigger, roomLeaveTrigger }, ref) => (
    <div className="move-room">
      <input type="text" defaultValue="defalut" ref={ref} />
      <button type="submit" onClick={roomEnterTrigger}>
        Enter
      </button>
      <button type="submit" onClick={roomLeaveTrigger}>
        Leave
      </button>
    </div>
  )
);

export default MoveRoom;
