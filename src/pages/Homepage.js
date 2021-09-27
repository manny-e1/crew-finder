import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
// import Tag from "../components/Tag";
import { listAuditionPosts } from '../store/auditionPost/api.auditionpost';
import { RegionDropdown } from 'react-country-region-selector';
import { logout } from '../store/user/api.user';

function Homepage() {
  const location = useLocation();
  const dispatch = useDispatch();

  let [query, setQuery] = useState('');
  const [applicationCount, setApplicationCount] = useState('');
  const [region, setRegion] = useState('');

  // const [talents, setTalents] = useState(location.search && location.search.split("=")[1].split(',').map(talent => talent));
  const auditionPostList = useSelector((state) => state.auditionPostList);
  const { loading, error, auditionPosts } = auditionPostList;
  // const removeTag = (tag) => {
  //     setTalents([...talents.filter(tobeRemoved => tobeRemoved !== tag.replace(" ", "%20").toLowerCase())])
  //     location.search = location.search.replace(tag.replace(" ", "%20").toLowerCase(), "")
  // }

  const [d, setdd] = useState([]);
  const options = [
    { value: 'Actor', label: 'Actor' },
    { value: 'Make-up Artist', label: 'Make-up Artist' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'va', label: 'Va' },
  ];

  const items = ['male', 'female'];
  const [gender, setGender] = useState([]);
  if (gender.length > 0) {
    gender.forEach((gen) => {
      query =
        query !== ''
          ? query + `&gender[in]=${gen.toUpperCase()}`
          : `?gender[in]=${gen.toUpperCase()}`;
    });
  }
  const onChangeItem = (id) => {
    let selected = gender;
    let find = selected.indexOf(id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(id);
    }
    setGender([...selected]);
  };

  if (applicationCount === '30+')
    query =
      query !== ''
        ? query + `&applicationCount[gte]=${30}`
        : `?applicationCount[gte]=${30}`;
  else if (applicationCount !== '') {
    const count = applicationCount.split('-').map((num) => +num);
    query =
      query !== ''
        ? query +
          `&applicationCount[gte]=${count[0]}&applicationCount[lte]=${count[1]}`
        : `?applicationCount[gte]=${count[0]}&applicationCount[lte]=${count[1]}`;
    console.log(query);
  }
  if (region !== '')
    query = query !== '' ? query + `&region=${region}` : `?region=${region}`;

  if (d.length > 0) {
    const len = d.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      if (i === len - 1) {
        str += d[i];
        break;
      }
      str += `${d[i]},`;
    }
    query =
      query !== '' ? query + `&talents[in]=${str}` : `?talents[in]=${str}`;
  }
  console.log(query);
  const [hidden, setHidden] = useState('hidden');
  useEffect(() => {
    location?.search && setQuery(location.search);
    dispatch(listAuditionPosts(query !== '' ? query : ''));
  }, [dispatch, location.search, query]);

  // const ClearIndicator = props => {
  //     const {
  //         children = <CustomClearText />,
  //         getStyles,
  //         innerProps: { ref, ...restInnerProps },
  //     } = props;
  //     return (
  //         <div
  //             {...restInnerProps}
  //             ref={ref}
  //             style={getStyles('clearIndicator', props)}
  //         >
  //             <div style={{ padding: '0px 5px' }}>{children}</div>
  //         </div>
  //     );
  // };
  // const ClearIndicatorStyles = (base, state) => ({
  //     ...base,
  //     cursor: 'pointer',
  //     color: state.isFocused ? 'blue' : 'black',
  // });

  return (
    <div>
      <Header />

      <main className="max-w-7xl h-screen mx-auto">
        <section
          className="text-xl lg:hidden text-center cursor-pointer"
          onClick={(e) =>
            hidden === 'hidden' ? setHidden('flex') : setHidden('hidden')
          }
        >
          Filters
        </section>
        <div className="flex flex-wrap lg:space-x-6 mt-8">
          <section
            className={
              'w-full pt-5 h-full md:rounded-2xl lg:w-2/6 mb-5 ' +
              hidden +
              ' px-5 lg:inline-block lg:justify-end bg-white '
            }
          >
            <h2 className="text-3xl lg:flex hidden justify-center">Filters</h2>
            <form action="" className="w-full flex justify-center">
              <div className="py-10 space-y-6">
                <div>
                  <label
                    htmlFor="catagory"
                    className="block text sm font-medium text-gray-700"
                  >
                    Catagory
                  </label>
                  <div className="mt-1">
                    <Select
                      options={options}
                      className="lg:w-64 w-full"
                      isMulti
                      onChange={(e) =>
                        setdd(
                          Array.isArray(e)
                            ? e.map((x) => x.value.toUpperCase())
                            : []
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="mt-1">
                    <RegionDropdown
                      required
                      disableWhenEmpty={false}
                      countryValueType="short"
                      className='block appearance-none lg:w-64 w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                      country="ET"
                      value={region}
                      onChange={(val) => setRegion(val)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="application-count"
                    className="block text sm font-medium text-gray-700"
                  >
                    Application Count
                  </label>
                  <div className="mt-1 flex lg:inline-block">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value="0-10"
                          onClick={(e) => setApplicationCount(e.target.value)}
                        />
                        <p className="mx-2">0 - 10</p>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value="10-20"
                          onClick={(e) => setApplicationCount(e.target.value)}
                        />
                        <p className="mx-2">10 - 20</p>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value="20-30"
                          onClick={(e) => setApplicationCount(e.target.value)}
                        />
                        <p className="mx-2">20 - 30</p>
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value="30+"
                          onClick={(e) => setApplicationCount(e.target.value)}
                        />
                        <p className="mx-2">30+</p>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <div className="mt-1 flex lg:inline-block">
                    {items.map((item) => (
                      <div key={item}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            onChange={() => onChangeItem(item)}
                          />
                          <p className="mx-2">{item}</p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </section>
          <section className="w-full pt-5 md:mx-2 md:rounded-2xl  lg:w-3/6 bg-white">
            <h4 className="text-2xl font-semibold pb-5 pl-8 ">Recent Posts</h4>
            {/* <div className="flex flex-wrap">
                            {query && talents?.map(talent => (
                                <Tag text={talent.replace(/%20/g, " ").toUpperCase()} removeTag={removeTag} />
                            ))}
                        </div> */}
            {loading ? (
              <h1>Loading...</h1>
            ) : error && error === 'Not Authenticated' ? (
              dispatch(logout())
            ) : error && error !== 'Not Authenticated' ? (
              <div>{error}</div>
            ) : (
              <div>
                {auditionPosts?.map((auditionPost) => (
                  <PostCard
                    key={auditionPost._id}
                    auditionPost={auditionPost}
                  />
                ))}
              </div>
            )}
          </section>
          <section className="w-1/6 hidden lg:flex "></section>
        </div>
      </main>
    </div>
  );
}

export default Homepage;

// const CustomClearText = () => 'clear all';

//   hidden + " left:30 justify-center lg:justify-end lg:flex bg-blue-300 mr-5
