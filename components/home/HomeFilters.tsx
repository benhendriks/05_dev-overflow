'use client'

import React from 'react'
import { Button } from '../ui/button'
import { HomePageFilters } from '@/constants/filters'

const HomeFilters = () => {
  const active = 'newest';
  return (
    <div className="flex-wrap hidden gap-3 mt-10 md:flex">
      {HomePageFilters.map((item:any) => (
        <Button
          key={item.value}
          onClick={() =>{}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value
          ? 'bg-primary-100 text-primary-500'
          : 'bg-light-800 dark:text-light-500'}`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilters
