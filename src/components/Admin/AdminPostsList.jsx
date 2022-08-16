import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAuditionPost,
  listAuditionPosts,
} from '../../store/auditionPost/api.auditionpost';

function AdminPostsList() {
  const dispatch = useDispatch();
  const { auditionPosts } = useSelector((state) => state.auditionPostList);

  useEffect(() => {
    dispatch(listAuditionPosts(''));
  }, []);

  const submitHandler = (id) => {
    dispatch(deleteAuditionPost(id));
  };

  return (
    <div>
      <table>
        <thead className="bg-green-200 w-full">
          <tr>
            <th className="border-r px-3 py-2">id</th>
            <th className="border-r px-3 py-2">title</th>
            <th className="border-r px-3 py-2">application count</th>
            <th className="border-r px-3 py-2">author</th>
            <th className="border-r px-3 py-2">delete</th>
          </tr>
        </thead>
        <tbody className="bg-yellow-100">
          {auditionPosts?.map((auditionPost) => (
            <tr>
              <td className="border-r px-3 py-1 text-size-sm">
                {auditionPost?._id}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {auditionPost?.title}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {auditionPost?.applicationCount}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {auditionPost?.author?.fullName}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                <button
                  className="text-red-500 py-1 text-size-sm px-5"
                  onClick={() => submitHandler(auditionPost?._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPostsList;
