const Members = () => {
  return (
    <div className="flex flex-col min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] gap-40">
      <div className="flex flex-col items-center md:pl-[var(--pub-container-padding-x)] md:pr-[var(--pub-container-padding-x)] mt-16 gap-12">
        <div className="flex w-full gap-8">
          <span className="monument-extra-bold uppercase text-[7.25rem] 2xl:text-[7.5rem] text-[var(--pink-color)] leading-none">Green</span>
          <div className="bg-[#212121] w-full"></div>
        </div>

        <div className="flex w-full gap-8">
          <div className="bg-[#212121] w-7/12 2xl:w-7/12"></div>
          <div className="flex flex-col gap-6">
            <span className="monument-extra-bold uppercase text-[7.25rem] 2xl:text-[7.5rem] text-[var(--pink-color)] leading-none">Wich</span>
            <span className="w-5/12">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span>
          </div>
        </div>

        <div className="flex w-full gap-8">
          <span className="monument-extra-bold uppercase text-[7.25rem] 2xl:text-[7.5rem] text-[var(--pink-color)] leading-none">Dance</span>
          <div className="bg-[#212121] w-full"></div>
          <span className="monument-extra-bold uppercase text-[7.25rem] 2xl:text-[7.5rem] text-[var(--pink-color)] leading-none">Crew</span>
        </div>

        <span className="w-[45%] text-center text-xs 2xl:w-2/5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing.....</span>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-5">
          <div className="w-[var(--pub-container-padding-x)] bg-[var(--pink-color)]"></div>
          <span className="monument-extra-bold uppercase text-[3.5rem] leading-none">Founders</span>
        </div>

        {/* Card using position */}
        {/* <div className=" flex w-full h-[32rem] bg-[url(src/assets/backgrounds/pub_members_background/founders_bg.png)] bg-cover items-center justify-center relative">
          <div className="flex flex-col p-2.5 pl-5 pr-5 justify-end items-start bg-[#454545] w-[20.8%] h-[17.5rem] absolute top-41.5 left-75 z-10 rotate-350 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black">
            <span className="monument-extra-bold uppercase text-3xl">Name</span>
          </div>
          <div className="flex flex-col p-2.5 pl-5 pr-5 justify-start items-start bg-[#454545] w-[20.8%] h-[17.5rem] absolute top-12.5 left-129 z-1 rotate-[3.25deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black">
            <span className="monument-extra-bold uppercase text-3xl">Name</span>
          </div>
          <div className="flex flex-col p-2.5 pl-5 pr-5 justify-end items-end bg-[#454545] w-[20.8%] h-[17.5rem] absolute top-34 left-195.5 z-10 rotate-[356.5deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black">
            <span className="monument-extra-bold uppercase text-3xl">Name</span>
          </div>
        </div> */}

        {/* Card using flex box (not fixed) */}
        <div className=" flex w-full h-[32rem] bg-[url(src/assets/backgrounds/pub_members_background/founders_bg.png)] bg-cover items-center justify-center relative">
          <div className="flex flex-col p-2.5 pl-5 pr-5 justify-end items-start bg-[#454545] w-[20.8%] h-[17.5rem] absolute top-41.5 left-75 z-10 rotate-350 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black">
            <span className="monument-extra-bold uppercase text-3xl">Name</span>
          </div>
          <div className="flex flex-col p-2.5 pl-5 pr-5 justify-start items-start bg-[#454545] w-[20.8%] h-[17.5rem] absolute top-12.5 left-129 z-1 rotate-[3.25deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black">
            <span className="monument-extra-bold uppercase text-3xl">Name</span>
          </div>
          <div className="flex flex-col p-2.5 pl-5 pr-5 justify-end items-end bg-[#454545] w-[20.8%] h-[17.5rem] absolute top-34 left-195.5 z-10 rotate-[356.5deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black">
            <span className="monument-extra-bold uppercase text-3xl">Name</span>
          </div>
        </div>

        <div className="flex justify-between md:pl-[var(--pub-container-padding-x)] md:pr-[var(--pub-container-padding-x)]">
          <span className="w-[24%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
          <span className="w-[45%] text-right">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
        </div>
      </div>
    </div>
  )
}

export default Members