import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router"
import { apply } from "../store/application/api.application"

function Apply() {

    const [applicationLetter, setApplicationLetter] = useState('');

    const {id} = useParams()

    const dispatch = useDispatch()
    const history = useHistory()

    const {loading, error} = useSelector(state => state.applicationPost);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(apply({
            applicationLetter,
            auditionPostId: id
        }));
        history.push(`/auditions/${id}`)
    }
    return (
        <div className="flex absolute inset-y-1/3 lg:inset-x-1/3">            
            <form>

                <div className="space-y-3 mx-4">
                    <label
                        htmlFor="applicationLetter"
                        className="block text sm font-medium text-gray-700">Application Letter
                    </label>

                    <p className="text-sm font-light">Introduce yourself and explain why you’re a strong candidate for this role. </p>
                    <div className="mt-2">
                        <textarea
                            className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                            type="text"
                            rows="5"
                            cols="60"
                            name="applicationLetter"
                            id="applicationLetter"
                            required
                        value={applicationLetter}
                        onChange={e => setApplicationLetter(e.target.value)}
                        />
                        {error && !error?.applicationLetter ?
                            <p className="text-sm text-red-600">{error}</p> :
                         <p className="text-sm text-red-600">{error?.applicationLetter}</p>}
                    </div>
                </div>
                <div className="m-5 flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 
                                    border border-transparent rounded-full shadow-sm 
                                    font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    text-md
                                    focus:ring-indigo-500"
                        onClick={e => submitHandler(e)}>{loading ? "...Loading" : "Apply"}
                    </button>
                </div>
            </form>
            
        </div>
    )
}

export default Apply
