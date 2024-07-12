"use client";

import { useGetJobs } from "@/hooks/query/useGetJobs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import loading from "../../../public/assets/images/loading_spinner.png";

const JobList = () => {
  const { jobsData, fetchNextPage, error } = useGetJobs();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col container mx-auto max-w-[1400px] px-5 h-16">
      <h1 className="flex text-start text-2xl font-bold my-5">채용공고</h1>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {jobsData.map((job, index) => (
          <li
            key={index}
            className="flex flex-col border border-gray-300 rounded-md p-3 gap-y-4 cursor-pointer hover:bg-gray-100 transition-transform transform hover:-translate-y-2 duration-300"
          >
            <Link
              href={`/detail-page/${job.recrutPblntSn}`}
              className="flex flex-col h-full"
            >
              <h2>{job.recrutPbancTtl}</h2>
              <div className="mt-auto text-sm text-gray-400">
                <p>위치: {job.workRgnNmLst}</p>
                <p>신입/경력: {job.recrutSeNm}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={ref} className="flex justify-center pt-4">
        {inView && (
          <Image
            className="spin"
            src={loading}
            alt="loading"
            width={40}
            height={40}
            priority={true}
          />
        )}
      </div>
    </div>
  );
};

export default JobList;
