import { ChangeEvent, ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import PostCard from '../components/PostCard';
// import Tag from "../components/Tag";
import { RegionDropdown } from 'react-country-region-selector';
import { Tabs } from '../components/Tab';
import { useQuery } from '@tanstack/react-query';
import {
  getAuditionPosts,
  IAuditionPost,
} from '../services/auditionPostService';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../atoms/localStorageAtoms';

function Homepage() {
  const location = useLocation();
  const search = location.search;
  const tab = new URLSearchParams(search);

  let [query, setQuery] = useState('');
  const [applicationCount, setApplicationCount] = useState('');
  const [region, setRegion] = useState('');
  // const [talents, setTalents] = useState(location.search && location.search.split("=")[1].split(',').map(talent => talent));
  // const auditionPostList = useSelector((state) => state.auditionPostList);
  const [currentUser] = useAtom(currentUserAtom);
  // const { loading, error, auditionPosts } = auditionPostList;
  // const removeTag = (tag) => {
  //     setTalents([...talents.filter(tobeRemoved => tobeRemoved !== tag.replace(" ", "%20").toLowerCase())])
  //     location.search = location.search.replace(tag.replace(" ", "%20").toLowerCase(), "")
  // }
  // console.log(auditionPosts);

  const [d, setDD] = useState<string[]>([]);
  const options = [
    { value: 'Actor', label: 'Actor' },
    { value: 'Make-up Artist', label: 'Make-up Artist' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'va', label: 'Va' },
  ];

  type Options = typeof options[0];

  const items = ['male', 'female'];
  const [gender, setGender] = useState<string[]>([]);
  if (gender.length > 0) {
    gender.forEach((gen: string) => {
      query =
        query !== ''
          ? query + `&gender[in]=${gen.toUpperCase()}`
          : `?gender[in]=${gen.toUpperCase()}`;
    });
  }
  const onChangeItem = (id: string) => {
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
  const [hidden, setHidden] = useState('hidden');

  const { isLoading, error, isSuccess, data } = useQuery<
    IAuditionPost[],
    Error
  >(['auditionPosts'], () => getAuditionPosts(query));
  const filteredAuditionPosts = data?.filter((auditionPost) =>
    auditionPost?.talents?.includes(currentUser!.talent)
  );
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
      <main className="mx-auto h-screen max-w-7xl">
        <section
          className="cursor-pointer text-center text-xl lg:hidden"
          onClick={(e) =>
            hidden === 'hidden' ? setHidden('flex') : setHidden('hidden')
          }
        >
          Filters
        </section>
        <div className="mt-8 flex flex-wrap lg:space-x-6">
          <section
            className={
              'mb-5 h-full w-full pt-5 md:rounded-2xl lg:w-2/6 ' +
              hidden +
              ' bg-white px-5 lg:inline-block lg:justify-end '
            }
          >
            <h2 className="hidden justify-center text-3xl lg:flex">Filters</h2>
            <form className="flex w-full justify-center">
              <div className="space-y-6 py-10">
                <div>
                  <label
                    htmlFor="catagory"
                    className="text sm block font-medium text-gray-700"
                  >
                    Catagory
                  </label>
                  <div className="mt-1">
                    <Select
                      options={options}
                      className="w-full lg:w-64"
                      isMulti
                      onChange={(e) =>
                        Array.isArray(e)
                          ? setDD(e.map((x: Options) => x.value.toUpperCase()))
                          : setDD([])
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="text sm block font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="mt-1">
                    <RegionDropdown
                      disableWhenEmpty={false}
                      countryValueType="short"
                      classes='block appearance-none lg:w-64 w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                      country="ET"
                      value={region}
                      onChange={(val) => setRegion(val)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="application-count"
                    className="text sm block font-medium text-gray-700"
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
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setApplicationCount(e.target.value)
                          }
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
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setApplicationCount(e.target.value)
                          }
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
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setApplicationCount(e.target.value)
                          }
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
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setApplicationCount(e.target.value)
                          }
                        />
                        <p className="mx-2">30+</p>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="text sm block font-medium text-gray-700"
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
          <section className="w-full bg-white pt-5 md:mx-2  md:rounded-2xl lg:w-3/6">
            {/* <div className="flex flex-wrap">
                            {query && talents?.map(talent => (
                                <Tag text={talent.replace(/%20/g, " ").toUpperCase()} removeTag={removeTag} />
                            ))}
                        </div> */}
            {isLoading ? (
              <h1>Loading...</h1>
            ) : error && error.message.includes('Not Authenticated') ? (
              <div>{error.message}</div>
            ) : (
              <Tabs initialTab={tab.get('tab')}>
                <Label label="Recent">
                  {data?.map((auditionPost) => (
                    <PostCard
                      key={auditionPost._id}
                      auditionPost={auditionPost}
                    />
                  ))}
                </Label>
                <Label label="For You">
                  {filteredAuditionPosts?.map((auditionPost) => (
                    <PostCard
                      key={auditionPost._id}
                      auditionPost={auditionPost}
                    />
                  ))}
                </Label>
              </Tabs>
            )}
          </section>
          <section className="hidden w-1/6 lg:flex "></section>
        </div>
      </main>
    </div>
  );
}

export default Homepage;

function Label({ label, children }: { label: string; children: ReactNode }) {
  return <>{children}</>;
}
