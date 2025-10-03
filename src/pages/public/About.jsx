const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[46.5vw] m-[68px] ml-0 mr-0 w-full">
      <div className="flex flex-col w-full items-center bg-[#212121] p-10 pl-9 pr-9">
        <img className="p-20 pl-0 pr-0 w-200 2xl:w-225" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />

        <div className="flex flex-col mt-28 ml-14 2xl:ml-24">
          <img className="w-[23rem]" src="src/assets/items/about-items-01.webp" alt="About Us" />
          <div className="flex gap-12">
            <span className="w-[15%] 2xl:w-[14%] text-lg/5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
            <span className="w-[15%] 2xl:w-[14%] text-lg/5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh e</span>
          </div>
        </div>

        <div className="flex flex-col w-[46%] 2xl:w-[41%] mt-16 self-end">
          <span className="w-full text-right text-lg/5">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ulla-mcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac-cumsan et iusto odio dignissim qui blandit praesent luptatum zzril dele-nit augue duis dolore te feugait nulla facilisi.
          </span>
          <span className="w-full text-right text-lg/5">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ulla-
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <img className=" pl-9 pr-9" src="src/assets/items/about-items-02.webp" alt="Moving Until The Last Breath" />
        
        <div className="flex justify-between pl-9 pr-9">
          <span className="w-3/10">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
          <span className="w-[22%]">Lorem ipsum dolor sit amet, consec-tetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut</span>
        </div>
        
        <img className=" pl-4 pr-4" src="src/assets/items/about-items-03.webp" alt="Creativity Unity Discipline" />

        <div className=" pl-9 pr-9">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default About