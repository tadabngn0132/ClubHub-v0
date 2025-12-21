const Home = () => {
  return (
    <div className="flex flex-col min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] w-full md:pl-[var(--pub-container-padding-x)] md:pr-[var(--pub-container-padding-x)]">
      <div className="flex flex-col bg-[#212121] w-full h-[30rem] rounded-[3rem] p-10 pt-8 pb-6 justify-between">
        <span className="self-end text-end leading-5 font-light">Lorem ipsum dolor sit amet, consectetuer adipisc-<br />ing elit, sed diam nonummy nibh euismod tincidunt<br /> ut laoreet dolore magna aliquam erat volutpat. Ut<br /> wisi enim ad minim veniam</span>

        <div className="flex items-end justify-between uppercase">
          <h1 className="monument-extra-bold text-6xl/18">Project:<br /><span className="monument-regular">Stages of Love</span></h1>
          <button className="monument-regular uppercase leading-10 cursor-pointer">More</button>
        </div>
      </div>

      <img className="w-[30rem] m-10 ml-7" src="src/assets/items/activites-items-01.webp" alt="Featured Activities" />

      <div className="grid grid-cols-7 gap-10 w-full">
        {/* Card 1 */}
        <div className="flex flex-col w-full h-full bg-[#212121] col-span-4 rounded-[3rem] items-end">
          <div className="flex flex-col w-[37.5%] h-[30rem] bg-[#121212] rounded-[3rem] rounded-l-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10"> Mini Project:<br /><span className="monument-regular">Twist</span></h1>
            <div className="flex flex-col h-full justify-between mt-2">
              <span className="text-[10.5px] font-light w-10/12">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euis-mod tincidunt ut laoreet dolore magna ali-quam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-row w-full h-full bg-[#212121] col-span-3 row-span-9 rounded-[3rem] items-end">
          <div className="flex flex-col justify-between w-full h-fit bg-[#121212] rounded-[3rem] rounded-t-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10"> Career Fair<br /><span className="monument-regular">2025</span></h1>
            <div className="flex flex-row w-full h-full justify-between mt-10">
              <span className="text-[10.5px] font-light w-[36%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light w-6/12">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-row w-full h-full bg-[#212121] col-span-4 row-span-22 rounded-[3rem] items-end">
          <div className="flex flex-col w-full h-fit bg-[#121212] rounded-[3rem] rounded-t-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10">Photoshoot<br /><span className="monument-regular"></span></h1>
            <div className="flex flex-row w-3/4 h-full items-end gap-10">
              <div className="flex flex-col gap-10 w-1/2">
                <span className="text-[10.5px] font-light w-2/3">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>
                <span className="text-[10.5px] font-light w-full">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing</span>
              </div>

              <span className="text-[10.5px] font-light w-1/2">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-row w-full h-full bg-[#212121] col-span-3 row-span-14 rounded-[3rem] items-end">
          <div className="flex flex-col justify-between w-full h-fit bg-[#121212] rounded-[3rem] rounded-t-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10">Clubfair<br /><span className="monument-regular">2025</span></h1>
            <div className="flex flex-row w-full h-full justify-between mt-2">
              <span className="text-[10.5px] font-light w-[36%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light w-6/12">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="flex flex-row w-full h-full bg-[#212121] col-span-3 row-span-3 rounded-[3rem] items-end">
          <div className="flex flex-row w-full h-fit bg-[#121212] rounded-[3rem] rounded-t-none p-5 pl-9 pr-9 items-end">
            <div className="flex flex-col h-full justify-between gap-8">
              <h1 className="monument-extra-bold uppercase text-3xl/10">Student Honoring Ceremony:<br /><span className="monument-regular">Sum25</span></h1>
              
              <span className="text-[10.5px] font-light w-9/12">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy nibh e</span>
            </div>
            <span className="text-[10.5px] font-light w-[55%]">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipi-scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna ali-quam erat adipiscing ....</span>
          </div>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col w-full h-full bg-[#212121] col-span-4 row-span-2 rounded-[3rem] items-end">
          <div className="flex flex-col w-[37.5%] bg-[#121212] rounded-[3rem] rounded-l-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10">Opening Ceremony<br /><span className="monument-regular">2025</span></h1>
            <div className="flex flex-col h-full justify-between mt-2 gap-12">
              <span className="text-[10.5px] font-light w-10/12">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euis-mod tincidunt ut laoreet dolore magna ali-quam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>

        {/* Card 7 */}
        <div className="flex flex-col w-full h-full bg-[#212121] col-span-4 row-span-1 rounded-[3rem] items-start">
          <div className="flex flex-col w-[37.5%] bg-[#121212] rounded-[3rem] rounded-r-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10">Casting Call:<br /><span className="monument-regular">Result</span></h1>
            <div className="flex flex-col h-full justify-between mt-2 gap-24">
              <span className="text-[10.5px] font-light w-10/12">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euis-mod tincidunt ut laoreet dolore magna ali-quam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home