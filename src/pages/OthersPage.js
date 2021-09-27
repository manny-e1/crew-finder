import { useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import PostSteps from '../components/PostSteps';
import Tag from '../components/Tag';
import { langs } from '../constants/languages';
import { postAudition } from '../store/auditionPost/api.auditionpost';
import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';

function OthersPage() {
  const [ageRange, setAgeRange] = useState({
    min: 10,
    max: 80,
  });
  const [endorsementCount, setEndorsementCount] = useState(0);
  const [searchedLang, setSearchedLang] = useState('');
  const [addedLanguages, setAddedLanguages] = useState([]);
  const [languages, setLanguages] = useState([...langs]);
  const [gender, setGender] = useState([]);
  const [region, setRegion] = useState('');

  const removeLanguage = (language) => {
    setAddedLanguages([
      ...addedLanguages.filter((tobeRemoved) => tobeRemoved !== language),
    ]);
    setLanguages([...languages, language]);
  };
  const items = ['MALE', 'FEMALE'];

  const addLanguage = (language) => {
    setAddedLanguages([...addedLanguages, language.toUpperCase()]);
    setLanguages([
      ...languages.filter((tobeRemoved) => tobeRemoved !== language),
    ]);
  };

  const onChangeItem = (id) => {
    let selected = gender;
    let find = selected.indexOf(id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(id);
    }
    setGender([...selected]);
  };

  const dispatch = useDispatch();
  const { titleAndDescription, talents } = useSelector(
    (state) => state.postData
  );

  const filteredLangs = languages.filter((lang) =>
    lang.toLowerCase().includes(searchedLang.toLowerCase())
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      postAudition({
        ...titleAndDescription,
        talents,
        ageRange,
        endorsementCount,
        languages: addedLanguages,
        gender,
        region,
      })
    );
  };

  return (
    <div>
      <PostSteps step1 step2 step3 />
      <div className="px-5 md:px-0 md:max-w-4xl md:mx-auto md:mt-20 mt-10">
        <form action="">
          <div className="py-3 border-b border-indigo-300 space-y-2">
            <label htmlFor="ageRange" className="block font-medium ">
              Age range
            </label>
            <p className="text-sm font-light">How old should the talent be?</p>
            <div className="mt-2 flex items-center space-x-2">
              <p className="text-sm">Min age</p>
              <input
                className="flex-grow"
                type="range"
                name="ageRange"
                id="ageRange"
                min="10"
                max="80"
                list="tickmarks"
                required
                value={ageRange.min}
                onChange={(e) =>
                  setAgeRange({ max: +e.target.value, min: +e.target.value })
                }
              />
              <p className="">{ageRange.min}</p>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <p className="text-sm">Max age</p>
              <input
                className="flex-grow"
                type="range"
                name="ageRange"
                id="ageRange"
                min={ageRange.min}
                max="80"
                list="tickmarks"
                required
                value={ageRange.max}
                onChange={(e) =>
                  setAgeRange({ ...ageRange, max: +e.target.value })
                }
              />
              <p className="">{ageRange.max}</p>
            </div>
          </div>
          <div className="py-3 border-b border-indigo-300 space-y-2">
            <label htmlFor="endorsementCount" className="block font-medium ">
              Endorsement count
            </label>
            <p className="text-sm font-light">
              How many endorsements should the talent have?
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <input
                className="flex-grow"
                type="range"
                name="endorsementCount"
                id="endorsementCount"
                min="0"
                max="20"
                required
                value={endorsementCount}
                onChange={(e) => setEndorsementCount(+e.target.value)}
              />
              <p className="">{endorsementCount}</p>
            </div>
          </div>
          <div className="py-3 border-b border-indigo-300 space-y-2">
            <label htmlFor="ageRange" className="block font-medium ">
              Languages
            </label>
            <div className="space-y-3">
              <p className="text-sm font-light ">
                What languages should the talent speak?
              </p>
              <input
                type="text"
                className="w-full h-8 rounded-full border-indigo-500 outline-none focus:border-indigo-700"
                value={searchedLang}
                onChange={(e) => setSearchedLang(e.target.value)}
              />
              <div className="mt-1">
                {addedLanguages.length > 0 && (
                  <p className="text-sm text-gray-600">Selected talents</p>
                )}

                <div className="flex flex-wrap mb-5">
                  {addedLanguages?.map((lang) => (
                    <Tag
                      text={capitalizeFirstLetter(lang)}
                      removeTag={removeLanguage}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap mb-5">
                {filteredLangs?.map((lang) => (
                  <Tag
                    text={capitalizeFirstLetter(lang)}
                    addTag={addLanguage}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="py-3 border-b border-indigo-300 space-y-2">
            <label htmlFor="ageRange" className="block font-medium ">
              Gender
            </label>
            <p className="text-sm font-light">
              Which gender is qualified for this role?
            </p>

            <div className="mt-1 flex lg:inline-block">
              {items.map((item) => (
                <div key={item}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => onChangeItem(item)}
                    />
                    <p className="mx-2">
                      {item
                        .toLowerCase()
                        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}
                    </p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="py-3 border-b border-indigo-300 space-y-2">
            <label htmlFor="region" className="block font-medium">
              Region
            </label>
            <p className="text-sm font-light">
              Where should the talent be located?
            </p>

            <div className="relative">
              <RegionDropdown
                required
                disableWhenEmpty={false}
                countryValueType="short"
                className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                country="ET"
                value={region}
                onChange={(val) => setRegion(val)}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <button
              type="submit"
              className="w-48 py-2 px-4 
            
                                    border border-transparent rounded-full shadow-sm 
                                    font-medium text-white bg-indigo-600 
                                    disabled:opacity-50
                                    hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    text-md
                                    focus:ring-indigo-500"
              disabled={
                gender.length <= 0 ||
                region === '' ||
                addedLanguages.length <= 0
              }
              onClick={submitHandler}
            >
              Submlit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OthersPage;
