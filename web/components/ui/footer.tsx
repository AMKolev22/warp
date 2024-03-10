import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import Whitelogo from "../../public/logo-white.svg";
import Image from 'next/image';

function Footer() {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];

  return (
    <footer className="">
     <hr className="w-full mt-0 mb-8"></hr>
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row items-center md:items-start md:gap-[5rem] text-left">
          <div className="flex flex-col w-1/2 md:p-0 py- gap-8 mb-[10vh]">          
            <Image src={Whitelogo} alt="" className="w-[50vh] mr-[50vh]" />
            <div className="flex gap-7 text-[18px] text-[#646464] justify-center md:justify-start">
              {iconsTab.map(({ icon }, index) => (
                <div
                  key={index}
                  className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-[#ff0366] hover:text-white"
                  style={{ transition: "all 0.3s" }}
                >
                  {icon}
                </div>
              ))}
            </div>
            <p className="text-[16px] font-medium text-[#646464]">
              @ Warp {new Date().getFullYear()} <br />{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.radiustheme.com/"
              ></a>
            </p>
          </div>

          <div className="flex flex-col gap-8 relative">
            <p className="text-[22px] font-bold footer-main text-white">Resources</p>

            <span className="top-[33px] absolute w-[7rem] h-[4px]"></span>

            <p className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
              FAQ
            </p>
            <p className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
              Docs
            </p>
            <p className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
              Help
            </p>
          </div>

          <div className="flex flex-col gap-8 relative">
            <p className="text-[22px] font-bold footer-main text-white">More</p>

            <span className="top-[33px] absolute w-[7rem] h-[4px]"></span>

            <p className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
              Sign In
            </p>
            <p className="text-[16px] hover:text-[#ff0366] cursor-pointer text-[#646464] font-medium hover:font-bold">
              Contact
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
