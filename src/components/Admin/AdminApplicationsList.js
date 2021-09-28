import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteApplication,
  listAllApplications,
} from '../../store/application/api.application';
import { capitalizeFirstLetter } from '../../util/firstLetterCapitalizer';

function AdminApplicationsList() {
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.allApplications);

  useEffect(() => {
    dispatch(listAllApplications());
  }, []);

  const submitHandler = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <div>
      <table id="users" class="display">
        <thead>
          <tr>
            <th>id</th>
            <th>applicant</th>
            <th>audition title</th>
            <th>audition author</th>
            <th>status</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {applications?.map((application) => (
            <tr>
              <td>{application?._id}</td>
              <td>{application?.applicantId?.fullName}</td>
              <td>{application?.auditionPostId?.title}</td>
              <td>{application?.auditionPostId?.author?.fullName}</td>
              <td>{capitalizeFirstLetter(application?.applicationStatus)}</td>
              <td>
                <button
                  className="text-red-500 py-1 px-5"
                  onClick={() => submitHandler(application?._id)}
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

export default AdminApplicationsList;
