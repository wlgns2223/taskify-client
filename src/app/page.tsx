import Image from "next/image";
import sectionImage from "@/../public/images/section.png";
import IndexHeader from "../components/index/index-header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <IndexHeader />
      <main className="bg-neutral-700 py-24">
        <div className="max-w-[1200px] mx-auto">
          <section className="flex flex-col items-center">
            <Image src={sectionImage} alt="hero" />
            <div className="text-neutral-50 mt-12 flex flex-col items-center">
              <h2 className="text-7xl font-bold">
                {"새로운 일정관리"}{" "}
                <span className="text-primary">{"Taskify"}</span>
              </h2>
              <p className="mt-6">{"서비스 설명"}</p>
            </div>
            <Link
              className="py-4 bg-primary w-[280px] rounded-lg text-center text-neutral-50 text-lg font-semibold mt-16"
              href={"/login"}
            >
              {"로그인 하기"}
            </Link>
          </section>
        </div>
      </main>
      <footer>{"footer"}</footer>
    </>
  );
}
