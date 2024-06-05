import Image from "next/image";
import Link from "next/link";
import sectionImage from "@/../public/images/section.png";
import sectionOneImage from "@/../public/images/section_one.png";
import createTodoImage from "@/../public/images/create_todo.png";
import dashBoard from "@/../public/images/dashboard.png";
import invitation from "@/../public/images/invitation.png";
import members from "@/../public/images/members.png";
import IndexHeader from "../components/index/index-header";
import ImageGridItem from "../components/index/image-grid-item";

export default function Home() {
  return (
    <>
      <IndexHeader />
      <main className="bg-neutral-700 py-24 px-4 sm:px-10 min-w-mobile">
        <div className="max-w-[1200px] mx-auto">
          <section className="flex flex-col items-center">
            <Image src={sectionImage} alt="hero" />
            <div className="text-neutral-50 mt-12 flex flex-col items-center">
              <div className="text-[max(9vw,40px)] sm:text-[min(7vw,56px)] lg:text-[min(8vw,76px)] font-bold flex flex-col sm:flex-row items-center">
                <h2>{"새로운 일정관리"}</h2>
                <span className="text-primary mt-2 sm:mt-0 sm:ml-6 ">
                  {"Taskify"}
                </span>
              </div>
              <p className="mt-6">{"서비스 설명"}</p>
            </div>
            <Link
              className="py-4 bg-primary w-[280px] rounded-lg text-center text-neutral-50 text-lg font-semibold mt-16"
              href={"/login"}
            >
              {"로그인 하기"}
            </Link>
          </section>
          <section className="relative mt-44 rounded-lg max-w-[1200px] mx-auto bg-neutral-600 h-[680px] sm:h-[972px] lg:h-[600px] p-12 lg:p-16 flex">
            <div className="flex-1 sm:flex-none sm:basis-1/2 text-neutral-50 flex flex-col items-center sm:items-start">
              <h3 className=" text-2xl font-semibold">{"Point 1"}</h3>
              <p className="text-4xl sm:text-5xl font-bold mt-24">
                {"일의 우선순위를"}
                <br />
                {"관리하세요"}
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-11/12 sm:w-4/5 lg:w-1/2  ">
              <Image
                src={sectionOneImage}
                alt="section image"
                className="rounded-b-lg sm:rounded-br-lg"
              />
            </div>
          </section>
          <section className="relative mt-44 rounded-lg max-w-[1200px] mx-auto bg-neutral-600 h-[680px] sm:h-[972px] lg:h-[600px] p-12 lg:p-16 flex flex-col lg:flex-row-reverse">
            <div className="flex-1 sm:flex-none sm:basis-1/2 text-neutral-50 flex flex-col items-center sm:items-start">
              <h3 className=" text-2xl font-semibold">{"Point 2"}</h3>
              <p className="text-4xl sm:text-5xl font-bold mt-24">
                {"일의 우선순위를"}
                <br />
                {"관리하세요"}
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0  lg:left-16 bottom-0  w-[min(300px,70%)] sm:w-[min(600px,65%)] lg:w-[40%] ">
              <Image
                src={createTodoImage}
                alt="create todo image"
                className="rounded-t-lg"
              />
            </div>
          </section>
          <section className="mt-44 text-neutral-50">
            <h3 className=" text-2xl font-semibold">
              {"생산성을 높이는 다양한 설정"}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-y-0 lg:gap-x-8 mt-8">
              <div className="rounded-lg overflow-hidden">
                <div className="relative h-[280px] lg:h-[260px] bg-neutral-500 flex justify-center items-center p-8">
                  <ImageGridItem alt="dashboard image" src={dashBoard} />
                </div>
                <div className="p-8 bg-neutral-600 flex flex-col">
                  <span className="font-semibold text-lg">
                    {"대시보드 설정"}
                  </span>
                  <p className="mt-4">
                    {"대시보드 사진과 이름을 변경할 수 있어요."}
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="relative h-[280px] lg:h-[260px] bg-neutral-500 flex justify-center items-center p-8">
                  <ImageGridItem alt="invitation image" src={invitation} />
                </div>
                <div className="p-8 bg-neutral-600 flex flex-col">
                  <span className="font-semibold text-lg">
                    {"대시보드 설정"}
                  </span>
                  <p className="mt-4">
                    {"대시보드 사진과 이름을 변경할 수 있어요."}
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="relative h-[280px] lg:h-[260px] bg-neutral-500 flex justify-center items-center p-8">
                  <ImageGridItem alt="members image" src={members} />
                </div>
                <div className="p-8 bg-neutral-600 flex flex-col">
                  <span className="font-semibold text-lg">
                    {"대시보드 설정"}
                  </span>
                  <p className="mt-4">
                    {"대시보드 사진과 이름을 변경할 수 있어요."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-neutral-700 h-20">{"footer"}</footer>
    </>
  );
}
