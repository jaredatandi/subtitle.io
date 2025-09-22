import React, { useEffect, useMemo, useRef, useState } from "react";
import DashboardLayout from "layout/DashboardLayout";
import { Helmet } from "react-helmet";

const FAQ = () => {
  const detailsRefs: any = useRef<HTMLElement[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs = useMemo(
    () => [
      {
        q: "How accurate are the automatically generated subtitles?",
        a: "Our AI-powered technology provides highly accurate subtitles, but there may be occasional errors due to accents, background noise, or complex vocabulary.",
      },
      {
        q: "Can I edit the subtitles manually?",
        a: "Yes, we provide an option to edit subtitles manually!",
      },
      {
        q: "Is it possible to customize the styling of the subtitles?",
        a: "Absolutely! SubtitleO gives you full control to customize styling along with cool and modern ready made templates.",
      },
      {
        q: "How long does it take to generate subtitles for a video?",
        a: "It is totally dependent on the quality, size and duration of the raw video.",
      },
    ],
    []
  );

  useEffect(() => {
    faqs.forEach((_, idx) => {
      const detailsRef = detailsRefs.current[idx];

      const toggleListener = () => {
        setActiveIdx(detailsRef?.open ? idx : null);
      };

      if (detailsRef) {
        detailsRef.addEventListener("toggle", toggleListener);

        return () => {
          detailsRef.removeEventListener("toggle", toggleListener);
        };
      }
    });
  }, [faqs]);

  return (
    <DashboardLayout>
      <Helmet>
        <title>FAQ - SubtitleO</title>
      </Helmet>
      <div className="ml-[11.8vw] sm:ml-0 md:ml-0 flex items-center justify-center flex-col">
        <h1 className="text-[40px] sm:text-[20px] md:text-[35px] text-center sm:mx-4 md:mx-6 font-sora font-bold text-[#084A9B] my-6">
          Frequently Asked Questions
        </h1>
        <div className="bg-white rounded-[20px] p-6 w-full flex items-center justify-center dark:bg-[#292929]">
          <div className="space-y-4">
            {faqs.map((faq: any, idx: any) => (
              <details
                key={idx}
                ref={(el) => (detailsRefs.current[idx] = el)}
                className={`group rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden shadow-lg sm:w-[300px] md:w-[400px] w-[600px] dark:bg-[#323232] ${
                  activeIdx === idx ? "border-[#084A9B] border-2" : ""
                }`}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 dark:text-white">
                  <h2
                    className={`font-medium font-sora ${
                      activeIdx === idx ? "text-[#084A9B]" : ""
                    }`}
                  >
                    {faq.q}
                  </h2>
                  <span className="relative h-5 w-5 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4  text-gray-700 w-[400px] text-sm whitespace-pre-wrap sm:w-[200px] md:w-[200px]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FAQ;
