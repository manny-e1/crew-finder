import { useAtom } from 'jotai';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { titleAndDescriptionAtom } from '../atoms/localStorageAtoms';
import PostSteps from '../components/PostSteps';
import { saveTitleAndDescription } from '../store/post_data_local/actions.post_data';

function TitleAndDescriptionPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [_, setTitleAndDescription] = useAtom(titleAndDescriptionAtom);
  const submitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setTitleAndDescription({ title, text: description });
    // dispatch(
    //   saveTitleAndDescription({
    //     title,
    //     text: description,
    //   })
    // );

    navigate('/post/talents');
  };

  return (
    <div>
      <PostSteps step1={true} />
      <form
        className="px-5 md:max-w-4xl md:mx-auto md:mt-20 mt-10"
        onSubmit={submitHandler}
      >
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block text sm font-medium text-gray-700"
          >
            Write a title for your job post
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
          {title.length <= 0 && (
            <div className="text-sm py-3 space-y-2">
              <p className="font-medium">Example titles </p>
              <ul className="list-disc list-inside font-light">
                <li className="pl-3 ">
                  UX/UI designer to bring website mockup and prototype to life
                </li>
                <li className="pl-3">
                  Video editor needed to create whiteboard explainer video
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="mb-3 space-y-2">
          <label
            htmlFor="text"
            className="block text sm font-medium text-gray-700"
          >
            Description
          </label>
          <p className="text-sm font-light">
            This is how talent figures out what you need and why you’re great to
            work with! Include your expectations about the task or deliverable,
            what you’re looking for in a work relationship, and anything unique
            about your project, team, or company.
          </p>
          <div className="mt-2">
            <textarea
              className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
              name="text"
              id="description"
              rows={10}
              autoComplete="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end">
          <button
            type="submit"
            className="w-48 py-2 px-4 
            
                                    border border-transparent rounded-full shadow-sm 
                                    font-medium text-white 
                                    bg-indigo-500
                                    disabled:opacity-50
                                    text-md"
            disabled={title.length <= 10 || description.length <= 20}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default TitleAndDescriptionPage;
