import { Language, Talent } from '../util/enums';

export type AddAndRemoveTagType = Language | Talent;

function Tag({
  removeTag,
  text,
  addTag,
}: {
  removeTag?: (tag: AddAndRemoveTagType) => void;
  text: AddAndRemoveTagType;
  addTag?: (tag: AddAndRemoveTagType) => void;
}) {
  return (
    <div
      className="mr-2 mt-2 flex  items-center rounded-full
        bg-gray-400 px-3"
    >
      <div className="text-sm text-white">{text}</div>
      {removeTag ? (
        <div
          className="text-md ml-2 cursor-pointer border-l pl-1 text-white"
          onClick={() => removeTag(text)}
        >
          X
        </div>
      ) : (
        <div
          className="text-md ml-2 cursor-pointer border-l pl-1 text-white"
          onClick={() => addTag!(text)}
        >
          {' '}
          <p className="text-xl">+</p>
        </div>
      )}
    </div>
  );
}

export default Tag;
