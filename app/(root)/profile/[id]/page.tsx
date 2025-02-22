import AnswersTab from '@/components/shared/AnswersTab'
import ProfileLink from '@/components/shared/ProfileLink'
import QuestionsTap from '@/components/shared/QuestionsTap'
import Stats from '@/components/shared/Stats'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserInfo } from '@/lib/actions/user.action'
import { getJoinedDate } from '@/lib/utils'
import { URLProps } from '@/types'
import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'


const Page = async ({params, searchParams}: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({userId: params.id});
  return (
    <>
      <div className="flex flex-col-reverse item-start justify-between sm:flex-row">
        <div className="flex flex-col item-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900 ">{userInfo.user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{userInfo.user.username}</p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Portfolio Website"
                />
              )}
              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              />
            </div>
            {userInfo.user.bio && (
              <p className='paragraph-regular text-dark400_light800 mt-8'>{userInfo.user.bio}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb:-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        reputation={userInfo.reputation}
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
        badges={userInfo.badgeCounts}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList  className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="flex w-full flex-col gap-6 mt-5">
            <QuestionsTap
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId ?? undefined}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswersTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId ?? undefined}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Page
