"use client";
import { useState } from "react";
import MenuIcon from "../../../../public/Icons/MenuIcon";
import Link from "next/link";
import CloseIcon from "../../../../public/Icons/CloseIcon";
import { links } from "../../../../utils/constant";

export default function Nav() {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  return (
    <nav className="p-8">
      <ul className=" flex justify-between">
        <li>
          <h1>Logo</h1>
        </li>
        <li
          onClick={() => setIsMenuShown(true)}
          className=" flex items-center space-x-2 cursor-pointer relative "
        >
          <p>Menu</p>
          <MenuIcon classname="size-6" />

          {isMenuShown && (
            <div className="z-100 flex flex-col  absolute top-10  right-0   bg-white  shadow-lg">
              {/* close button */}
              <div className=" flex  justify-end p-1">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuShown(false);
                  }}
                >
                  <CloseIcon className="size-4" />
                </div>
              </div>

              {/* links for pages */}
              <div className=" flex flex-col space-y-2  pt-4 px-10 pb-6">
                {links.map((item, idx) => (
                  <Link key={idx} href={item.link} prefetch>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
