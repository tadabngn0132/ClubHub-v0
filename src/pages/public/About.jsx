const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[46.5vw] m-[68px] ml-0 mr-0 w-full">
      <div className="flex flex-col w-full items-center bg-[#212121]  md:pl-9 md:pr-9">
        <img className="w-225" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />

        <div className="flex flex-col mt-28 ml-24">
          <img className="w-[21rem]" src="src/assets/items/about-items-01.webp" alt="About Us" />
          <div className="flex gap-12">
            <span className="w-1/8">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
            <span className="w-1/8">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh e</span>
          </div>
        </div>

        <span className="w-[37.5%] text-right self-end mt-16">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ulla-mcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac-cumsan et iusto odio dignissim qui blandit praesent luptatum zzril dele-nit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ulla-
        </span>
      </div>
    </div>
  )
}

export default About