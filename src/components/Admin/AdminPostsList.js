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
      <table id="users" class="display">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>application count</th>
            <th>author</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {auditionPosts?.map((auditionPost) => (
            <tr>
              <td>{auditionPost?._id}</td>
              <td>{auditionPost?.title}</td>
              <td>{auditionPost?.applicationCount}</td>
              <td>{auditionPost?.author?.fullName}</td>
              <td>
                <button
                  className="text-red-500 py-1 px-5"
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
