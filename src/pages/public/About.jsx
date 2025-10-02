const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[46.5vw] m-[68px] ml-0 mr-0 w-full">
      <div className="flex flex-col w-full items-center bg-[#212121]  md:pl-9 md:pr-9">
        <img className="w-200" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
        <div className="flex flex-col">
          <img className="w-fit" src="src/assets/items/about-items-01.webp" alt="About Us" />
          <div className="flex gap-12">
            <span className="w-1/9">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat</span>
            <span className="w-1/9">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh e</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About