function Tag({
  removeTag,
  text,
  addTag,
}: {
  removeTag?: (tag: string) => void;
  text: string;
  addTag?: (tag: string) => void;
}) {
  return (
    <div
      className="flex bg-gray-400 px-3  mr-2 mt-2
        rounded-full items-center"
    >
      <div className="text-white text-sm">{text}</div>
      {removeTag ? (
        <div
          className="ml-2 pl-1 border-l text-md text-white cursor-pointer"
          onClick={() => removeTag(text)}
        >
          X
        </div>
      ) : (
        <div
          className="ml-2 text-md text-white pl-1 border-l cursor-pointer"
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
