'use client';

import { BotCard } from '@/components/ui/card';
import { WorkoutIcon } from '@/components/ui/icons/workout';
import { UserButton } from '@clerk/nextjs';

export default function MyComponent() {

  return (
    <div className='h-screen flex flex-col justify-between p-4 w-screen'>
        <UserButton />
        <div className='h-full w-full flex wrap p-6'>
          <BotCard
            link="/bots/workout"
            className='bg-card-bot'>
              <WorkoutIcon className='fill-transparent'/>
          </BotCard>
        </div>
    </div>
  );
}