"use client";

import { Footer } from "flowbite-react";

const FooterComponent = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <Footer container>
        <div className="w-full text-center">
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Developed by Team Falcon
          </p>
        </div>
      </Footer>
    </section>
  );
};

export default FooterComponent;