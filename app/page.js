import { Roboto } from "next/font/google";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <div
        className={`flex justify-center items-center ${roboto.className} h-[50vh]`}
      >
        <div className="flex flex-col w-1/2 h-full p-4 bg-[rgb(211,239,227)] items-center justify-center">
          <h1 className="text-xl font-bold">
            The best URL shortener available
          </h1>
          <p className="text-sm text-center pt-2">
            BitLinks is a URL shortening service that allows you to shorten long
            URLs to short URLs. It is a simple and easy to use URL shortening
            service. It is a free service and you can use it to shorten your
            URLs.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link href="/Shorten">
              <button className="bg-[rgb(29,80,58)] flex justify-center items-center gap-2 text-white px-4 py-1 mt-4 rounded-md">
                Get Started
              </button>
            </Link>
            <Link href="https://github.com/Aniket-a14" target="_blank" rel="noopener noreferrer">
            <button className="bg-[rgb(29,80,58)] flex justify-center items-center gap-2 text-white px-4 py-1 mt-4 rounded-md">
                <FaGithub />GitHub
            </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 h-full  bg-[rgb(211,239,227)]">
          <Image
            src="/group.jpg"
            alt="URL Shortener"
            className="mix-blend-darken"
            width={700}
            height={700}
          />
        </div>
      </div>
    </>
  );
}
