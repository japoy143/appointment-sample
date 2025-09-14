"use client";
import Link from "next/link";
import React from "react";
import {
  aboutLinks,
  newsLinks,
  servicesLinks,
} from "../../../../utils/constant";

export default function Contact() {
  return (
    <div className="bg-gray-200 p-10 grid grid-cols-7 gap-4  ">
      <div className=" col-span-1">
        <h1>Logo</h1>
      </div>

      <div className="   col-span-3 space-y-6">
        <div className=" grid grid-cols-3">
          <div className=" flex flex-col text-sm font-light space-y-2">
            <h1 className=" text-base font-semibold">Services</h1>
            {servicesLinks.map((item, idx) => (
              <Link key={idx} href={item.link}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className=" flex flex-col text-sm font-light space-y-2">
            <h1 className=" text-base font-semibold">Latest News</h1>
            {newsLinks.map((item, idx) => (
              <Link key={idx} href={item.link}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className=" flex flex-col text-sm font-light space-y-2">
            <h1 className=" text-base font-semibold">About</h1>
            {aboutLinks.map((item, idx) => (
              <Link key={idx} href={item.link}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h1>We would like to know your feedback and/or concerns:</h1>

          <p className="text-sm font-light text-justify space-y-2">
            Cotabato Eye Medical Hospital has partnered with an independent
            whistleblowing service that allows you to confidentially and
            anonymously report any fraud or unethical behavior. The hospital
            treats all whistleblowing reports with utmost seriousness and will
            conduct an investigation whenever necessary.
          </p>
        </div>

        <h4>
          Please Contact us on our email address: cotabatoeyemedical@gmail.com
        </h4>
      </div>

      <div className="  col-span-3 space-y-4">
        <h1 className=" font-semibold">LOCATION</h1>
        <div>
          <h4 className=" font-medium">COTABATO EYE MEDICAL HOSPITAL</h4>
          <p className=" text-sm font-light text-justify">
            Sinsuat Avenue. Cotabato City, 1020 +6309345342
          </p>
        </div>

        <div>
          <h4 className=" font-medium">COTABATO EYE MEDICAL HOSPITAL</h4>
          <p className=" text-sm font-light text-justify">
            Sinsuat Avenue. Cotabato City, 1020 +6309345342
          </p>
        </div>

        <div>
          <h4 className=" font-medium">COTABATO EYE MEDICAL HOSPITAL</h4>
          <p className=" text-sm font-light text-justify">
            Sinsuat Avenue. Cotabato City, 1020 +6309345342
          </p>
        </div>
      </div>
    </div>
  );
}
