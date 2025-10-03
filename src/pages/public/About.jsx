const About = () => {
  return (
    <div className="flex flex-col min-h-[var(--pub-main-min-h)] mt-[var(--pub-main-mt-mb)] mb-[var(--pub-main-mt-mb)] w-full">
      <div className="flex flex-col w-full items-center bg-[#212121] p-10 pl-[var(--pub-g-pl-pr)] pr-[var(--pub-g-pl-pr)]">
        <img className="p-20 pl-0 pr-0 w-200 2xl:w-225" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />

        <div className="flex flex-col mt-10 ml-14 2xl:ml-24">
          <img className="w-[21rem]" src="src/assets/items/about-items-01.webp" alt="About Us" />
          <div className="flex gap-12 leading-5">
            <span className="w-[15%] 2xl:w-[14%]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
            <span className="w-[15%] 2xl:w-[14%]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh e</span>
          </div>
        </div>

        <div className="flex flex-col w-[46%] 2xl:w-[41%] mt-16 self-end leading-5">
          <span className="w-full text-right">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ulla-mcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac-cumsan et iusto odio dignissim qui blandit praesent luptatum zzril dele-nit augue duis dolore te feugait nulla facilisi.
          </span>
          <span className="w-full text-right">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ulla-
          </span>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <img className=" pl-[var(--pub-g-pl-pr)] pr-[var(--pub-g-pl-pr)]" src="src/assets/items/about-items-02.webp" alt="Moving Until The Last Breath" />
        
        <div className="flex justify-between pl-[var(--pub-g-pl-pr)] pr-[var(--pub-g-pl-pr)] leading-5">
          <span className="w-3/10">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
          <span className="w-[22%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut</span>
        </div>
        
        <img className="m-20 ml-4 mr-4" src="src/assets/items/about-items-03.webp" alt="Creativity Unity Discipline" />

        <div className="grid grid-cols-9 grid-rows-9 pl-[var(--pub-g-pl-pr)] pr-[var(--pub-g-pl-pr)] mt-6 gap-8 relative">
          <div className="flex flex-col bg-[#212121] p-5 col-span-4 col-start-1 row-span-6 row-start-1 w-full h-[42rem] justify-end leading-5">
            <span className="w-[74%] 2xl:w-[64%]">Lorem ipsum dolor sit amet, consectetuer adipisc-ing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud </span>
            <span className="w-[74%] 2xl:w-[64%]">suscipit lobortis nisl ut aliquip ex ea commodo con-sequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros</span>
          </div>
          <div className="">
            <img className="absolute top-0 right-89 w-[35rem] 2xl:right-112 2xl:w-[35rem]" src="src/assets/items/about-items-04.webp" alt="Main Activities" />
            <span className="absolute top-10 left-139 w-1/9 2xl:left-155 2xl:w-1/10 text-right">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit,</span>
            <span className="absolute top-22 right-39 w-1/7 2xl:right-62 2xl:w-1/8">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy tincidunt ut laoreet dolore</span>
            <span className="absolute top-65 right-34 w-[28%] 2xl:right-56 2xl:w-[24%] text-right">Lorem ipsum dolor sit amet, consectetuer adipisc-ing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud</span>
          </div>
          <div className="bg-[#212121] col-span-4 col-start-1 row-span-3 row-end-10 w-full h-full"></div>
          <div className="flex flex-col bg-[#212121] p-5 col-span-5 row-span-4 row-end-10 w-full h-full text-right items-end justify-end leading-5">
            <span className="w-[57%] 2xl:w-[51%]">Lorem ipsum dolor sit amet, consectetuer adipisc-ing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud</span>
            <span className="w-[57%] 2xl:w-[51%]">suscipit lobortis nisl ut aliquip ex ea commodo con-sequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-56 pl-[var(--pub-g-pl-pr)] pr-[var(--pub-g-pl-pr)] bg-[#212121] mt-8 w-full pt-8">
        <span className="w-[29.5%] self-end text-end leading-5">Lorem ipsum dolor sit amet, consectetuer adipisc-ing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui</span>
        <img className="w-2/3" src="src/assets/items/about-items-05.webp" alt="Achievements" />
      </div>

      <div className="flex justify-between pl-[var(--pub-g-pl-pr)] pr-[var(--pub-g-pl-pr)] w-full pt-8">
        <div className="flex flex-col w-[49.5%] 2xl:w-[43.75%] leading-5">
          <span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euis-mod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac-cumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</span>
          <span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eu-ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span>
          <span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euis-mod tincidunt ut laoreet dolore</span>
        </div>

        <div className="bg-[#212121] w-[27%] h-[32rem]"></div>
      </div>
    </div>
  )
}

export default About