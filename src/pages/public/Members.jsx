const Members = () => {
  return (
    <div className="flex flex-col min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)]">
      <div className="flex flex-col items-center md:pl-[var(--pub-container-padding-x)] md:pr-[var(--pub-container-padding-x)] mt-10 gap-8">
        <div className="flex w-full gap-6">
          <span className="monument-extra-bold uppercase text-[7rem] text-[var(--pink-color)] leading-20">Green</span>
          <div className="bg-[#212121] w-full"></div>
        </div>

        <div className="flex w-full gap-6">
          <div className="bg-[#212121] w-full"></div>
          <div className="flex flex-col">
            <span className="monument-extra-bold uppercase text-[7rem] text-[var(--pink-color)] leading-20">Wich</span>
            <span className="w-7/12">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span>
          </div>
        </div>

        <div className="flex w-full gap-6">
          <span className="monument-extra-bold uppercase text-[7rem] text-[var(--pink-color)] leading-20">Dance</span>
          <div className="bg-[#212121] w-full"></div>
          <span className="monument-extra-bold uppercase text-[7rem] text-[var(--pink-color)] leading-20">Crew</span>
        </div>

        <span className="w-8/12 text-center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing.....</span>
      </div>
    </div>
  )
}

export default Members