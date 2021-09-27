import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import UsersList from "../components/UsersList";
import { getUsers } from "../store/user/api.user";

function UserSearchPage({location}) {
  const search  = new URLSearchParams(location.search).get('search') ?? "";

  const dispatch = useDispatch();
  const {loading, users, error} = useSelector(state => state.getUsers);

  useEffect(() => {
    dispatch(getUsers(`?search=${search}`))
  },[])

  console.log(users);

  return (
    <div>
      {users?.map(user => (

        <UsersList key={user?._id} user={user}/>
      ))}
    </div>
  )
}

export default UserSearchPage
