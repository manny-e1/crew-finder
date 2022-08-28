import {
  QueryClient,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { FormEvent, useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import {
  talentsAtom,
  titleAndDescriptionAtom,
} from '../atoms/localStorageAtoms';
import PostSteps from '../components/PostSteps';
import Tag, { AddAndRemoveTagType } from '../components/Tag';
import {
  createAuditionPost,
  IAuditionPost,
  ICreateAuditionPostParams,
} from '../services/auditionPostService';
import { Gender, Language } from '../enums/enums';
import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';

function OthersPage() {
  const [ageRange, setAgeRange] = useState({
    min: 10,
    max: 80,
  });
  const [endorsementCount, setEndorsementCount] = useState(0);
  const [searchedLang, setSearchedLang] = useState('');
  const [addedLanguages, setAddedLanguages] = useState<Language[]>([]);
  const [languages, setLanguages] = useState<Language[]>([
    ...Object.values(Language),
  ]);
  const [gender, setGender] = useState<Gender[]>([]);
  const [region, setRegion] = useState('');
  const [titleAndDescription] = useAtom(titleAndDescriptionAtom);
  const [talents] = useAtom(talentsAtom);
  const navigate = useNavigate();
  const removeLanguage = (language: AddAndRemoveTagType) => {
    setAddedLanguages([
      ...addedLanguages.filter((tobeRemoved) => tobeRemoved !== language),
    ]);
    setLanguages([...languages, language as Language]);
  };

  const addLanguage = (language: AddAndRemoveTagType) => {
    setAddedLanguages([...addedLanguages, language as Language]);
    setLanguages([
      ...languages.filter((tobeRemoved) => tobeRemoved !== language),
    ]);
  };

  const onChangeItem = (id: Gender) => {
    let selected = gender;
    let find = selected.indexOf(id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(id);
    }
    setGender([...selected]);
  };

  // const dispatch = useDispatch();
  // const { titleAndDescription, talents } = useSelector(
  //   (state) => state.postData
  // );

  const filteredLangs = languages.filter((lang) =>
    lang.toLowerCase().includes(searchedLang.toLowerCase())
  );

  const {
    isLoading,
    error,
    mutate,
  }: UseMutationResult<IAuditionPost, Error, ICreateAuditionPostParams> =
    useMutation<IAuditionPost, Error, ICreateAuditionPostParams>(
      createAuditionPost,
      {
        onSuccess: () => {
          const client = new QueryClient();
          client.invalidateQueries(['auditionPosts']);
          navigate('/?tab=recent');
        },
      }
    );

  const submitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const auditionPost = {
      ...titleAndDescription!,
      talents: talents!,
      ageRange,
      endorsementCount,
      languages: addedLanguages,
      gender,
      region,
    };
    mutate(auditionPost);
  };

  return (
    <div>
      <PostSteps step1 step2 step3 />
      <div className="mt-10 px-5 md:mx-auto md:mt-20 md:max-w-4xl md:px-0">
        <form onSubmit={submitHandler}>
          <div className="space-y-2 border-b border-indigo-300 py-3">
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
          <div className="space-y-2 border-b border-indigo-300 py-3">
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
          <div className="space-y-2 border-b border-indigo-300 py-3">
            <label htmlFor="ageRange" className="block font-medium ">
              Languages
            </label>
            <div className="space-y-3">
              <p className="text-sm font-light ">
                What languages should the talent speak?
              </p>
              <input
                type="text"
                className="h-8 w-full rounded-full border-indigo-500 outline-none focus:border-indigo-700"
                value={searchedLang}
                onChange={(e) => setSearchedLang(e.target.value)}
              />
              <div className="mt-1">
                {addedLanguages.length > 0 && (
                  <p className="text-sm text-gray-600">Selected talents</p>
                )}

                <div className="mb-5 flex flex-wrap">
                  {addedLanguages?.map((lang) => (
                    <Tag text={lang} removeTag={removeLanguage} />
                  ))}
                </div>
              </div>
              <div className="mb-5 flex flex-wrap">
                {filteredLangs?.map((lang) => (
                  <Tag text={lang} addTag={addLanguage} />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2 border-b border-indigo-300 py-3">
            <label htmlFor="ageRange" className="block font-medium ">
              Gender
            </label>
            <p className="text-sm font-light">
              Which gender is qualified for this role?
            </p>

            <div className="mt-1 flex lg:inline-block">
              {Object.values(Gender).map((item) => (
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
          <div className="space-y-2 border-b border-indigo-300 py-3">
            <label htmlFor="region" className="block font-medium">
              Region
            </label>
            <p className="text-sm font-light">
              Where should the talent be located?
            </p>

            <div className="relative">
              <RegionDropdown
                disableWhenEmpty={false}
                countryValueType="short"
                classes='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                country="ET"
                value={region}
                onChange={(val) => setRegion(val)}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <button
              type="submit"
              className="text-md w-48 rounded-full 
            
                                    border border-transparent bg-indigo-600 py-2 
                                    px-4 font-medium text-white 
                                    shadow-sm
                                    hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                    focus:ring-offset-2
                                    disabled:opacity-50"
              disabled={
                gender.length <= 0 ||
                region === '' ||
                addedLanguages.length <= 0 ||
                isLoading
              }
            >
              {isLoading ? <BeatLoader size={10} color="white" /> : 'Submit'}
            </button>
          </div>
        </form>
        <div className="text-red-500-text-sm">{error?.message}</div>
      </div>
    </div>
  );
}

export default OthersPage;
