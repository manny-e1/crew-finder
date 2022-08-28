import { useAtom } from 'jotai';
import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { talentsAtom } from '../atoms/localStorageAtoms';
import PostSteps from '../components/PostSteps';
import Tag from '../components/Tag';
import { applicant, pro_director } from '../constants/talents';
import { saveTalents } from '../store/post_data_local/actions.post_data';
import { Talent } from '../enums/enums';

function TalentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tags, setTags] = useState<Talent[]>([]);
  const [catagories, setCatagories] = useState([...Object.values(Talent)]);
  const [_, setTalents] = useAtom(talentsAtom);

  const removeTag = (tag: string | Talent) => {
    setTags([...tags.filter((tobeRemoved) => tobeRemoved !== tag)]);
    setCatagories([...catagories, tag as Talent]);
  };

  const addTag = (tag: string | Talent) => {
    setTags([...tags, tag as Talent]);
    setCatagories([...catagories.filter((tobeRemoved) => tobeRemoved !== tag)]);
  };

  const submitHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // dispatch(saveTalents(tags));
    setTalents(tags);
    navigate('/post/others');
  };

  return (
    <div>
      <PostSteps step1={true} step2={true} />
      <div className="mt-10 px-5 md:mx-auto md:mt-20 md:max-w-4xl">
        <div className="mb-3">
          <label htmlFor="text" className="block text-lg font-medium">
            What type of talents does this job requires?
          </label>
          <div className="mt-1">
            {tags.length > 0 && (
              <p className="text-size-sm pt-2 text-gray-600">
                Selected talents
              </p>
            )}
            <div className="mb-5 flex flex-wrap">
              {tags?.map((tag) => (
                <Tag text={tag} removeTag={removeTag} />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap">
          {catagories?.map((catagory) => (
            <Tag text={catagory} addTag={addTag} />
          ))}
        </div>

        <div className="mt-2 flex items-center justify-end">
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
            disabled={tags.length <= 0}
            onClick={submitHandler}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default TalentsPage;
