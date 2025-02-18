import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mb-12 mt-11 flex flex-wrap item-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="felx flex-col gap-6">
        {[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map((item) => (
          <Skeleton key={item} className="h-60 w-full rounded-2xl sm:w-[260px]" />
        ))}
      </div>
    </section>
  )
}

export default Loading
