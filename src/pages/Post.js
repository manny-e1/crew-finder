import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Tag from '../components/Tag';
import { applicant, pro_director } from '../constants/talents';
import { postAudition } from '../store/auditionPost/api.auditionpost';

function Post() {
  const [hidden, setHidden] = useState('hidden');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [catagories, setCatagories] = useState([...pro_director, ...applicant]);

  const removeTag = (tag) => {
    setTags([...tags.filter((tobeRemoved) => tobeRemoved !== tag)]);
    setCatagories([...catagories, tag]);
  };

  const dispatch = useDispatch();

  const addTag = (tag) => {
    setTags([...tags, tag.toUpperCase()]);
    setCatagories([...catagories.filter((tobeRemoved) => tobeRemoved !== tag)]);
  };

  const submitHandler = () => {
    dispatch(postAudition({ title, text, talents: tags }));
    return <Redirect to="/" />;
  };

  const items = ['male', 'female'];
  const [applicationCount, setApplicationCount] = useState([]);
  let query = '';
  if (applicationCount.length > 0) {
    applicationCount.forEach((applicationCoun) => {
      query =
        query !== ''
          ? query + `&gender[in]=${applicationCoun}`
          : `?gender[in]=${applicationCoun}`;
    });
  }
  console.log(applicationCount);
  const onChangeItem = (id) => {
    let selected = applicationCount;
    let find = selected.indexOf(id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(id);
    }
    setApplicationCount([...selected]);
  };

  return (
    <div className="">
      <button
        className="flex w-full justify-center"
        onClick={(e) =>
          hidden === 'hidden' ? setHidden('flex') : setHidden('hidden')
        }
      >
        {' '}
        <h1 className="text-5xl">+</h1>{' '}
      </button>
      <h1 className="absolute inset-1/3 w-full text-5xl">Author's own posts</h1>
      <div
        className={
          'bg-transparent inline:block items-center justify-center ' +
          hidden +
          ' absolute inset-x-0'
        }
      >
        <div
          onClick={(e) => setHidden('hidden')}
          className="absolute right-10 text-black text-5xl inset-y-10 cursor-pointer"
        >
          x
        </div>
        <form
          method=""
          className="w-full lg:w-1/2  bg-gray-100 p-28 rounded-xl"
        >
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block text sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="text"
              className="block text sm font-medium text-gray-700"
            >
              Text
            </label>
            <div className="mt-2">
              <textarea
                className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                name="text"
                id="text"
                autoComplete="text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="">
              <label htmlFor="min">Min</label>
              <div className="mt-1">
                <input type="number" name="min" id="min" />
              </div>
            </div>
            <div className="">
              <label htmlFor="max">Max</label>
              <div className="mt-1">
                <input type="number" name="max" id="max" />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="text"
              className="block text sm font-medium text-gray-700"
            >
              Talents
            </label>
            <div className="mt-1">
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
          <div className="mt-1 flex lg:inline-block">
            {items.map((item) => (
              <div key={item}>
                <label className="inline-flex items-center">
                  <input type="checkbox" onChange={() => onChangeItem(item)} />
                  <p className="mx-2">{item}</p>
                </label>
              </div>
            ))}
          </div>
          <div className="mt-20 flex items-center justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 
                                    border border-transparent rounded-md shadow-sm 
                                    font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    text-md
                                    focus:ring-indigo-500"
              onClick={submitHandler}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
