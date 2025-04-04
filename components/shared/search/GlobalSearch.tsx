'use client';

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import GlobalResult from './GlobalResult';

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("Test");
  const searchContainerRef = useRef(null);
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if(searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    }
    setIsOpen(false);
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search
        })
        router.push( newUrl, { scroll: false });
      } else {
        if(query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['global', 'type'],
          });
          router.push( newUrl, { scroll: false });
        }
      }
    }, 300);
  return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);
  return (
    <div className="relative w-1/2 max-w-[600] max-lg:hidden" ref={searchContainerRef}>
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src='/assets/icons/search.svg'
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globaly"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if(!isOpen) {
              setIsOpen(true);
            }
            if(e.target.value === "") {
              setIsOpen(false);
            }
          }}
          className="paragraph-regular text-dark400_light700 no-focus placeholder border-none shadow-none outline-none bg-transparent"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  )
}

export default GlobalSearch
