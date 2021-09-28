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
      <table>
        <thead className="bg-green-200 w-full">
          <tr className=" ">
            <th className="border-r px-3 py-2">id</th>
            <th className="border-r px-3 py-2">applicant</th>
            <th className="border-r px-3 py-2">audition title</th>
            <th className="border-r px-3 py-2">audition author</th>
            <th className="border-r px-3 py-2">status</th>
            <th className="border-r px-3 py-2">delete</th>
          </tr>
        </thead>
        <tbody className="bg-yellow-100">
          {applications?.map((application) => (
            <tr>
              <td className="border-r px-3 py-1 text-size-sm">
                {application?._id}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {application?.applicantId?.fullName}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {application?.auditionPostId?.title}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {application?.auditionPostId?.author?.fullName}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {capitalizeFirstLetter(application?.applicationStatus)}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                <button
                  className="text-red-500 py-1 text-size-sm px-5"
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
