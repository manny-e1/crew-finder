import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import PostSteps from '../components/PostSteps';
import Tag from '../components/Tag';
import { applicant, pro_director } from '../constants/talents';
import { saveTalents } from '../store/post_data_local/actions.post_data';

function TalentsPage() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [tags, setTags] = useState([]);
  const [catagories, setCatagories] = useState([...pro_director, ...applicant]);

  const removeTag = (tag) => {
    setTags([...tags.filter((tobeRemoved) => tobeRemoved !== tag)]);
    setCatagories([...catagories, tag]);
  };

  const addTag = (tag) => {
    setTags([...tags, tag.toUpperCase()]);
    setCatagories([...catagories.filter((tobeRemoved) => tobeRemoved !== tag)]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveTalents(tags));
    history.push('/post/others');
  };

  return (
    <div>
      <PostSteps step1 step2 />
      <div className="px-5 md:max-w-4xl md:mx-auto md:mt-20 mt-10">
        <div className="mb-3">
          <label htmlFor="text" className="block font-medium text-lg">
            What type of talents does this job requires?
          </label>
          <div className="mt-1">
            {tags.length > 0 && (
              <p className="text-size-sm text-gray-600 pt-2">
                Selected talents
              </p>
            )}
            <div className="flex flex-wrap mb-5">
              {tags?.map((tag) => (
                <Tag text={tag} removeTag={removeTag} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mb-5">
          {catagories?.map((catagory) => (
            <Tag text={catagory} addTag={addTag} />
          ))}
        </div>

        <div className="mt-2 flex items-center justify-end">
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
