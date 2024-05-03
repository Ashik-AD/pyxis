import React, { useState, useEffect, useRef } from 'react';
import DropDown from '../dropdown/DropDown';
import DrpItem from '../dropdown/DrpItem';
import { PersonCreditType } from '../types/Person.type';
import PersonAppeared from './PersonAppeared';

const PersonTab: React.FC<PropTypes> = ({ tv, movie }) => {
  const [movieLists, setMovieLists] = useState(movie);
  const [tvLists, setTvLists] = useState(tv);
  const [activeTab, setActiveTab] = useState('movie');
  const [sortType, setSortType] = useState('');
  const [tabOffsetTop, setTabOffsetTop] = useState(0);

  const handleClickTabBtn = (id: string) => setActiveTab(id);
  const handleSortItemClick = (by: string) => setSortType(by);
  useEffect(() => {
    if (sortType) {
      if (activeTab === 'movie') {
        if (sortType === 'date') {
          const sorted = sortByDate(movieLists, 'release_date');
          setMovieLists([...sorted]);
          return;
        }
        if (sortType === 'popular') {
          const sorted = sortByPopularity(movieLists);
          setMovieLists([...sorted]);
        }
        return;
      }
      if (activeTab === 'tv shows') {
        if (sortType === 'date') {
          const sorted = sortByDate(tvLists, 'first_air_date');
          setTvLists([...sorted]);
          return;
        }
        if (sortType === 'popular') {
          const sorted = sortByPopularity(tvLists);
          setTvLists([...sorted]);
        }
        return;
      }
    }
  }, [sortType, activeTab]);

  useEffect(() => {
    if (tabRef.current) {
      setTabOffsetTop(tabRef.current.offsetTop);
    }
  }, []);

  const tabRef = useRef<HTMLDivElement>(null);
  document.querySelector('.home')?.addEventListener('scroll', (eve: any) => {
    if (tabRef.current) {
      if (eve.target!.scrollTop > tabOffsetTop) {
        tabRef.current?.classList.add('sticky');
      } else {
        tabRef.current.classList.remove('sticky');
      }
    }
  });
  return (
    <div className='flex flex-col bg-secondary py-20'>
      <div
        className='tab_btn flex items-center bg-secondary color-gray sm:px-20 space-between'
        style={{ borderBottom: '3px solid purple' }}
        ref={tabRef}>
        <div className='flex bg-secondary gap-10'>
          <TabButton
            label='Movie'
            active={activeTab}
            handleClick={handleClickTabBtn}
          />
          <TabButton
            label='Tv Shows'
            active={activeTab}
            handleClick={handleClickTabBtn}
          />
        </div>
        <div className='flex drp_container'>
          <div className='sort_ flex sm:gap-10 cursor-pointer'>
            <span className='sort_ font-medium'>Sort By: </span>
            <span
              className='sort_ font-semibold color-white'
              style={{ textTransform: 'capitalize' }}>
              {sortType}
            </span>
          </div>
          <DropDown drpId='sort_' label=''>
            <div className='bg-primary w-150 py-10 rounded-lg shadow-medium'>
              <DrpItem
                text='Popular'
                classes='py-6 px-16 hover-fade-half'
                handleClick={() => handleSortItemClick('popular')}
              />
              <DrpItem
                text='Date'
                classes='py-6 px-16 hover-fade-half'
                handleClick={() => handleSortItemClick('date')}
              />
            </div>
          </DropDown>
        </div>
      </div>
      <div className='flex flex-col sm:gap-20 sm:px-20'>
        {activeTab === 'movie' ? (
          <PersonAppeared items={movieLists} media_type='movie' />
        ) : (
          <PersonAppeared items={tvLists} media_type='tv' />
        )}
      </div>
    </div>
  );
};
const TabButton: React.FC<{
  label: string;
  handleClick: (key: string) => void;
  active: string;
}> = ({ label, handleClick, active }) => (
  <div
    className={`text-sm sm:text-medium relative font-semibold cursor-pointer py-10 ${
      active === label.toLowerCase() ? 'color-purple' : 'hover-fade-half'
    }`}
    style={{ transition: 'all 1s ease' }}
    onClick={() => handleClick(label.toLowerCase())}>
    {label}
    <span
      className={`absolute left-0 rounded-lg bg-purple ${
        active === label.toLocaleLowerCase() ? 'visible' : 'opacity-0'
      }`}
      style={{
        height: 5,
        width: '100%',
        bottom: -3.5,
        transition: 'all .4s ease-in-out',
      }}></span>
  </div>
);

const sortByPopularity = (array: PersonCreditType[]) =>
  array.sort((x: any, y: any) => x.popularity - y.popularity && -1);
const sortByDate = (array: PersonCreditType[], key: string) =>
  array.sort((x: any, y: any): any => x[key] > y[key] && -1);

interface PropTypes {
  tv: any[];
  movie: any[];
}

export default PersonTab;
