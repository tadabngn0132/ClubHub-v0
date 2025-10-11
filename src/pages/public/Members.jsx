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

        {/* Card using flex box */}
        <div className="flex w-full h-[36rem] 2xl:h-[36rem] bg-[url(src/assets/backgrounds/pub_members_background/founders_bg.png)] bg-cover items-center justify-center">
          <div className="relative flex items-center justify-center flex-wrap gap-10">
            {/* Card 1 */}
            <div className="lg:absolute flex flex-col p-2.5 pl-5 pr-5 justify-end items-start bg-[#454545] w-[19.5rem] h-[19.5rem] z-10 -rotate-10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black lg:-left-[16vw] lg:top-[3.5rem]"> 
              <span className="monument-extra-bold uppercase text-3xl">Name</span>
            </div>
            {/* Card 2 */}
            <div className="relative flex flex-col p-2.5 pl-5 pr-5 justify-start items-start bg-[#454545] w-[19.5rem] h-[19.5rem] z-1 rotate-[3.25deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black lg:-top-[4.5rem]">
              <span className="monument-extra-bold uppercase text-3xl">Name</span>
            </div>
            {/* Card 3 */}
            <div className="lg:absolute flex flex-col p-2.5 pl-5 pr-5 justify-end items-end bg-[#454545] w-[19.5rem] h-[19.5rem] z-10 -rotate-[3.25deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black lg:-right-[19.5vw] lg:top-[1.5rem]">
              <span className="monument-extra-bold uppercase text-3xl">Name</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between md:pl-[var(--pub-container-padding-x)] md:pr-[var(--pub-container-padding-x)]">
          <span className="w-[24%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
          <span className="w-[45%] text-right">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
        </div>
      </div>

      <div>
        <div className="flex gap-5">
          <div className="w-[var(--pub-container-padding-x)] bg-[var(--pink-color)]"></div>
          <span className="monument-extra-bold uppercase text-[3.5rem] leading-none">Excutive Board</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-5">
          <div className="w-[var(--pub-container-padding-x)] bg-[var(--pink-color)]"></div>
          <span className="monument-extra-bold uppercase text-[3.5rem] leading-none">Heads of Departments</span>
        </div>

        <div className="flex w-full h-[42rem]">
          <div className="flex flex-col p-5 justify-end w-1/5 h-full bg-[#454545]">
            <span className="monument-regular uppercase text-3xl">Name</span>
            <span className="monument-extra-bold uppercase text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-start w-1/5 h-full bg-[#333333]">
            <span className="monument-regular uppercase text-3xl">Name</span>
            <span className="monument-extra-bold uppercase text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-end w-1/5 h-full bg-[#454545]">
            <span className="monument-regular uppercase text-3xl">Name</span>
            <span className="monument-extra-bold uppercase text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-start w-1/5 h-full bg-[#333333]">
            <span className="monument-regular uppercase text-3xl">Name</span>
            <span className="monument-extra-bold uppercase text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-end w-1/5 h-full bg-[#454545]">
            <span className="monument-regular uppercase text-3xl">Name</span>
            <span className="monument-extra-bold uppercase text-2xl">Head of Performance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members