'use client';

import DashRendering from './dashrendering';
import { auth } from '@/components/authentication/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from 'flowbite-react';

const DashMain = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | false | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);    
      } else {
        setCurrentUser(false);  
        router.push('/authScreens/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (currentUser === null) {
    return <Spinner/>;   
  }
  return <DashRendering />;
};

export default DashMain;
