"use client";

import { Button, DarkThemeToggle, Navbar } from "flowbite-react";

const NavBar = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Falcon
          </span>
        </Navbar.Brand>
        <div className="flex gap-2 md:order-2">
          <Button color="gray">Login</Button>
          <Button className="bg-[#646AE8] dark:bg-[#646AE8] rounded-md">
            Singup
          </Button>
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
      </Navbar>
    </section>
  );
};

export default NavBar;
