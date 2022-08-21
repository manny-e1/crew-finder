import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';

function CatagoryButton({ text }: { text: string }) {
  return (
    <span
      className="mr-2 mb-2 rounded-full 
        bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-500"
    >
      {capitalizeFirstLetter(text)}{' '}
    </span>
  );
}

export default CatagoryButton;
