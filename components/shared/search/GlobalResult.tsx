'use client';

import { globalSearch } from '@/lib/actions/general.action';
import { ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalFilters from './GlobalFilters';

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
        const res = await globalSearch({ query: global, type });
        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
    if(global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    return '/';
  }
  return (
    <div className="absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-xl">
      <GlobalFilters />
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50 ">
      </div>
      <div className="space-y-5 ">
        <p className='text-dark400_light900 paragraph-semibold px-5'>
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
                  <Link
                    href={renderLink('type', 'id')}
                    key={item.type + item.id + index}
                    className='flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 rounded-lg hover:bg-light-700/50 dark:bg-dark-500/50'
                  >
                    <Image
                      src='/assets/icons/tag.svg'
                      alt="tags"
                      width={18}
                      height={18}
                      className='invert-colors mt-1 object-contain'
                    ></Image>
                    <div className="flex flex-col">
                      <p className='text-dark200_light800 line-clamp-1 body-medium'>{item.title}</p>
                      <p className='text-light400_light500 small-medium mt-1 font-bold capitalize'>{item.type}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex-center flex-col px-5 py-3">
                <p  className="text-dark-200_light800 bodey-regular px-5 py-2.5">Ops no resukts found</p>
              </div>
            ) }
          </div>
        )
      }
    </div>
  )
}

export default GlobalResult
