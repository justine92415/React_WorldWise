import { memo } from "react";

function ToggleSounds({ allowSound, setAllowSound }: any) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow: boolean) => !allow)}
    >
      {allowSound ? '🔈' : '🔇'}
    </button>
  );
}

export default memo(ToggleSounds);
