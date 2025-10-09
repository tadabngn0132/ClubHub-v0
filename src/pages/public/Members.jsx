const Members = () => {
  return (
    <div className="flex flex-col min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)]">
      <div className="flex flex-col items-center md:pl-[var(--pub-container-padding-x)] md:pr-[var(--pub-container-padding-x)] mt-16 gap-12">
        <div className="flex w-full gap-8">
          <span className="monument-extra-bold uppercase text-[7.5rem] text-[var(--pink-color)] leading-none">Green</span>
          <div className="bg-[#212121] w-full"></div>
        </div>

        <div className="flex w-full gap-8">
          <div className="bg-[#212121] w-7/12"></div>
          <div className="flex flex-col gap-6">
            <span className="monument-extra-bold uppercase text-[7.5rem] text-[var(--pink-color)] leading-none">Wich</span>
            <span className="w-5/12">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span>
          </div>
        </div>

        <div className="flex w-full gap-8">
          <span className="monument-extra-bold uppercase text-[7.5rem] text-[var(--pink-color)] leading-none">Dance</span>
          <div className="bg-[#212121] w-full"></div>
          <span className="monument-extra-bold uppercase text-[7.5rem] text-[var(--pink-color)] leading-none">Crew</span>
        </div>

        <span className="w-8/12 text-center text-xs 2xl:w-2/5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing.....</span>
      </div>
    </div>
  )
}

export default Members