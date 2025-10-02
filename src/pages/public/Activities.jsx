const Activities = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col bg-[#212121] w-full h-[30rem] rounded-4xl p-10 pt-8 pb-6 justify-between">
        <span className="self-end text-end leading-5 font-light">Lorem ipsum dolor sit amet, consectetuer adipisc-<br />ing elit, sed diam nonummy nibh euismod tincidunt<br /> ut laoreet dolore magna aliquam erat volutpat. Ut<br /> wisi enim ad minim veniam</span>

        <div className="flex items-end justify-between uppercase">
          <h1 className="monument-extra-bold text-6xl/18">Project:<br /><span className="monument-regular">Stages of Love</span></h1>
          <button className="monument-regular uppercase leading-10 cursor-pointer">More</button>
        </div>
      </div>

      <img className="w-[30rem] m-10 ml-7" src="src/assets/items/activites-items-01.webp" alt="Featured Activities" />

      <div className="grid grid-cols-7 gap-10 w-full">
        {/* Card 1 */}
        <div className="flex flex-col w-full h-full bg-[#212121] col-span-4 rounded-4xl items-end">
          <div className="flex flex-col w-[37.5%] h-[30rem] bg-[#121212] rounded-4xl rounded-l-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10"> Mini Project:<br /><span className="monument-regular">Twist</span></h1>
            <div className="flex flex-col h-full justify-between mt-2">
              <span className="text-[10.5px] font-light w-10/12">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euis-mod tincidunt ut laoreet dolore magna ali-quam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-row w-full h-full bg-[#212121] col-span-3 row-span-8 rounded-4xl items-end">
          <div className="flex flex-col justify-between w-full h-fit bg-[#121212] rounded-4xl rounded-t-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10"> Mini Project:<br /><span className="monument-regular">Twist</span></h1>
            <div className="flex flex-row w-full h-full justify-between mt-2">
              <span className="text-[10.5px] font-light w-[36%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light w-6/12">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-row w-full h-full bg-[#212121] col-span-4 row-span-17 rounded-4xl items-end">
          <div className="flex flex-col justify-between w-full h-fit bg-[#121212] rounded-4xl rounded-t-none p-5">
            <h1 className="monument-extra-bold uppercase text-3xl/10"> Mini Project:<br /><span className="monument-regular">Twist</span></h1>
            <div className="flex flex-row w-full h-full justify-between mt-2">
              <span className="text-[10.5px] font-light w-[36%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh e</span>

              <span className="text-[10.5px] font-light w-6/12">Lorem ipsum dolor sit amet, consectetuer adipi-scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat laoreet dolore magna aliquam erat adipiscing ....</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activities