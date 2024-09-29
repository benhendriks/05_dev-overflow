'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const global = searchParams.get('global');
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await fetch(`/api/search/global?global=${global}&type=${type}`);
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  }, [global, type]);
  return (
    <div className="absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-xl">
      <p className='text-dark400_light9000 paragraph-semibold px-5'>
        Filters
      </p>
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50 ">
      </div>
      <div className="space-y-5 ">
        <p className='text-dark400_light9000 paragraph-semibold px-5'>
          Top Match
        </p>
      </div>
      {
        isLoading ? (
          <div className="flex-center flex-col px-5 ">
            <ReloadIcon className='my-2 h-10 w-10 text-primary-500 animate-spin' />
            <p className='text-dark200_light800 body-regular '>Browding the entire database</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            { result.length > 0 ? (
              result.map((item: any, index: number) => (
                <div key={index} className="flex gap-3 items-center px-5 py-3 rounded-lg hover:bg-light-700 dark:hover:bg-dark-500/50">
                  <p className='text-dark400_light9000 body-regular'>{item.title}</p>
                </div>
              ))
            ) : null }
          </div>
        )
      }
    </div>
  )
}

export default GlobalResult
