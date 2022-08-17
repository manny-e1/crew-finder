import { useState, useEffect } from 'react';
import { slugify } from '../util/slugify';
import { useLocation, useNavigate } from 'react-router-dom';

const Tabs = ({ children, initialTab }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const naviagte = useNavigate();
  const location = useLocation();

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
    naviagte(`${location.pathname}?tab=${slugify(activeTab)}`);
  }, [activeTab, location.pathname]);

  return (
    <>
      <ul className="p-0 m-0 flex justify-center">
        {children.map((tab) => {
          const label = tab.props.label;
          return (
            <li
              onClick={(e) => handleClick(e, label)}
              className={`hover:bg-slate-200 py-1/5 px-5 my-0 mx-2 ${
                slugify(label) === activeTab
                  ? ' font-bold border-b-2 border-blue-900 relative'
                  : 'cursor-pointer transition duration-200'
              }`}
              key={label}
            >
              <a>{label}</a>
            </li>
          );
        })}
      </ul>
      {children.map((one, index) => {
        if (slugify(one.props.label) === activeTab)
          return (
            <div key={index} className={'py-2 px-3'}>
              {one.props.children}
            </div>
          );
        return null;
      })}
    </>
  );
};

export { Tabs };
