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
        <div className="flex w-full h-fit lg:h-[36rem] bg-[var(--pink-color)] items-center justify-center">
          <div className="lg:relative flex items-center justify-center flex-wrap gap-10">
            {/* Card 1 */}
            <div className="lg:absolute flex flex-col p-2.5 pl-5 pr-5 justify-end items-start bg-[#454545] w-[19.5rem] h-[19.5rem] z-10 -rotate-10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black lg:top-[3.5rem] xl:-left-[19vw] 2xl:-left-[16vw]"> 
              <span className="monument-extra-bold uppercase text-3xl">Name</span>
            </div>
            {/* Card 2 (Center) */}
            <div className="relative flex flex-col p-2.5 pl-5 pr-5 justify-start items-start bg-[#454545] w-[19.5rem] h-[19.5rem] z-1 rotate-[3.25deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black lg:-top-[4.5rem]">
              <span className="monument-extra-bold uppercase text-3xl">Name</span>
            </div>
            {/* Card 3 */}
            <div className="lg:absolute flex flex-col p-2.5 pl-5 pr-5 justify-end items-end bg-[#454545] w-[19.5rem] h-[19.5rem] z-10 -rotate-[3.25deg] shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black lg:top-[1.5rem] xl:-right-[23vw] 2xl:-right-[19.25vw]">
              <span className="monument-extra-bold uppercase text-3xl">Name</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between md:pl-[var(--pub-container-padding-x)] md:pr-[var(--pub-container-padding-x)]">
          <span className="w-[24%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
          <span className="w-[45%] text-right">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-5">
          <div className="w-[var(--pub-container-padding-x)] bg-[var(--pink-color)]"></div>
          <span className="monument-extra-bold uppercase text-[3.5rem] leading-none">Excutive Board</span>
        </div>

        <div className="relative flex items-center justify-center bg-[var(--pink-color)] bg-cover h-[44rem] 2xl:h-[54rem]">
          <span className="absolute top-6.5 left-[27vw] 2xl:left-[30vw] w-50 text-right">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy tincidunt ut laoreet dolore</span>
          <span className="absolute top-45 left-[9.5vw] w-38 text-right">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit,</span>
          <span className="absolute top-[31.5rem] right-[12.5vw] w-94">Lorem ipsum dolor sit amet, consectetuer adipisc-ing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud</span>
          <div className="relative flex w-full h-full items-center justify-center">
            <div className="absolute flex flex-col p-5 w-[20rem] h-[27rem] bg-[#333333] justify-end shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black z-10 -rotate-7 bottom-10 left-[28vw]">
              <span className="monument-extra-bold text-2xl 2xl:text-3xl uppercase">Name</span>
              <span className="monument-regular text-2xl 2xl:text-3xl uppercase">President</span>
            </div>
            <div className="absolute flex flex-col p-5 w-[20rem] h-[27rem] bg-[#333333] justify-start shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] shadow-black z-1 text-end rotate-2 top-10 right-[28vw]">
              <span className="monument-extra-bold text-2xl 2xl:text-3xl uppercase">Name</span>
              <span className="monument-regular text-2xl 2xl:text-3xl uppercase">President</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-5">
          <div className="w-[var(--pub-container-padding-x)] bg-[var(--pink-color)]"></div>
          <span className="monument-extra-bold uppercase text-[3.5rem] leading-none">Heads of Departments</span>
        </div>

        <div className="flex w-full h-[42rem]">
          <div className="flex flex-col p-5 justify-end w-1/5 h-full bg-[#454545]">
            <span className="monument-regular uppercase xl:text-2xl 2xl:text-3xl">Name</span>
            <span className="monument-extra-bold uppercase xl:text-xl 2xl:text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-start w-1/5 h-full bg-[#333333]">
            <span className="monument-regular uppercase xl:text-2xl 2xl:text-3xl">Name</span>
            <span className="monument-extra-bold uppercase xl:text-xl 2xl:text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-end w-1/5 h-full bg-[#454545]">
            <span className="monument-regular uppercase xl:text-2xl 2xl:text-3xl">Name</span>
            <span className="monument-extra-bold uppercase xl:text-xl 2xl:text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-start w-1/5 h-full bg-[#333333]">
            <span className="monument-regular uppercase xl:text-2xl 2xl:text-3xl">Name</span>
            <span className="monument-extra-bold uppercase xl:text-xl 2xl:text-2xl">Head of Performance</span>
          </div>
          <div className="flex flex-col p-5 justify-end w-1/5 h-full bg-[#454545]">
            <span className="monument-regular uppercase xl:text-2xl 2xl:text-3xl">Name</span>
            <span className="monument-extra-bold uppercase xl:text-xl 2xl:text-2xl">Head of Performance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members