import { useState, useEffect } from 'react';
// import styles from "./Tabs.module.css";

import { slugify } from '../../util/slugify';
import { useHistory } from 'react-router-dom';

const SideBar = ({ children, initialTab }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  //   const router = useRouter();
  const history = useHistory();

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(slugify(newActiveTab));
  };

  useEffect(() => {
    console.log(initialTab);
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, []);

  useEffect(() => {
    history.push(
      `${history.location.pathname}?tab=${slugify(activeTab)}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [activeTab, history]);

  return (
    <div className="flex">
      <div className="bg-blue-600 w-1/5 flex-none h-screen  text-white">
        <ul className="pt-10 m-0  space-y-10">
          {children.map((tab) => {
            const label = tab.props.label;
            return (
              <li
                className={
                  slugify(label) === activeTab
                    ? 'py-3 px-5 my-0 mx-2 font-bold border-r-2 border-gray-100 relative hover:bg-black hover:text-white'
                    : 'py-3 px-5 my-0 mx-2 cursor-pointer transition duration-200 hover:bg-black hover:text-white'
                }
                onClick={(e) => handleClick(e, label)}
                key={label}
              >
                <p>{label}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="">
        {children.map((one) => {
          if (slugify(one.props.label) === activeTab)
            return (
              <div key={one.props.label} className={'py-2 px-3'}>
                {one.props.children}
              </div>
            );
          return <div></div>;
        })}
      </div>
    </div>
  );
};

export { SideBar };
