import {
  useState,
  useEffect,
  ReactNode,
  ComponentProps,
  MouseEvent,
} from 'react';
import { slugify } from '../util/slugify';
import { useLocation, useNavigate } from 'react-router-dom';

function Tabs({
  children,
  initialTab,
}: {
  children: JSX.Element[];
  initialTab: string | null;
}) {
  const [activeTab, setActiveTab] = useState<string>(children[0].props.label);
  const naviagte = useNavigate();
  const location = useLocation();

  const handleClick = (e: MouseEvent<HTMLLIElement>, newActiveTab: string) => {
    e.preventDefault();
    setActiveTab(slugify(newActiveTab));
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, []);

  useEffect(() => {
    naviagte(`${location.pathname}?tab=${slugify(activeTab)}`);
  }, [activeTab, location.pathname]);

  return (
    <>
      <ul className="m-0 flex justify-center p-0">
        {children.map((tab) => {
          const label = tab.props.label;
          return (
            <li
              onClick={(e) => handleClick(e, label)}
              className={`py-1/5 my-0 mx-2 px-5 hover:bg-slate-200 ${
                slugify(label) === activeTab
                  ? ' relative border-b-2 border-blue-900 font-bold'
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
}

export { Tabs };
