'use client'

import { HomePageFilters } from '@/constants/filters'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive ] = useState('');
  const router = useRouter();

  const handleTypeClick = (item: string) => {
    if(active == item) {
      setActive('');

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null
      })
      router.push( newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase()
      })
      router.push( newUrl, { scroll: false });
    }
  }

  return (
    <div className="flex-wrap hidden gap-3 mt-10 md:flex">
      {HomePageFilters.map((item:any) => (
        <Button
          key={item.value}
          onClick={() =>{}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value
          ? 'bg-primary100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark400'
          : 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300'}`}
          onClickCapture={() => handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilters
