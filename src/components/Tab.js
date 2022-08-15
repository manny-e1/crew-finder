import { useState, useEffect } from 'react';
// import styles from "./Tabs.module.css";

import { slugify } from '../util/slugify';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ children, initialTab }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  //   const router = useRouter();
  const history = useNavigate();

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
    <div>
      <ul className="p-0 m-0 flex justify-center">
        {children.map((tab) => {
          const label = tab.props.label;
          return (
            <li
              className={
                slugify(label) === activeTab
                  ? 'py-1/5 px-5 my-0 mx-2 font-bold border-b-2 border-blue-900 relative'
                  : 'py-1/5 px-5 my-0 mx-2 cursor-pointer transition duration-200'
              }
              key={label}
            >
              <p onClick={(e) => handleClick(e, label)}>{label}</p>
            </li>
          );
        })}
      </ul>
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
  );
};

export { Tabs };
