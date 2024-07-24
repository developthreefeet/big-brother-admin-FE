import { AiFillLike, AiFillDislike } from 'react-icons/ai';

function Preference() {
  return (
    <div className="flex items-center space-x-4 pt-3">
      <div className="flex items-center space-x-2 ">
        <AiFillLike size={24} />
        <p>좋아요: 54%</p>
      </div>
      <p>|</p>
      <div className="flex items-center space-x-2">
        <AiFillDislike size={24} />
        <p>싫어요: 46%</p>
      </div>
    </div>
  );
}

export default Preference;
