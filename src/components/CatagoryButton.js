function CatagoryButton({ keyy, text }) {
  return (
    <span
      className="bg-gray-200 rounded-full px-3 
        py-1 text-xs font-semibold text-gray-500 mr-2 mb-2"
      key={keyy}
    >
      {text}{' '}
    </span>
  );
}

export default CatagoryButton;
