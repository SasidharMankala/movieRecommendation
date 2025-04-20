'use client';
import { Button } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Discover Your Next
        </h1>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Favorite Film
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Explore curated movie recommendations tailored just for you.
        </p>
        <div className="flex flex-col mb-8 px-10 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button className="bg-[#646AE8] dark:bg-[#646AE8] rounded-md"
          onClick={()=>{router.push("/authScreens/login")}}
          >
            Get started
          </Button>
        </div>
        <div className="grid place-items-center">
        <Image src="/images/hero.jpeg" alt="hero" className="rounded-md place-items-center" width={800} height={800} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
