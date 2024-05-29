
import Link from "next/link";
import hero from "../../../assets/HomePageBannerImg/hero.jpg"
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";

const ContactForm = () => {
  return (
    <section className="mt-16">
      <div className="max-w-screen-2xl mx-auto bg-white relative">
       <Image src={hero} alt="" className="w-full h-[450px] md:h-[600px] lg:h-full bg-cover"/>
        <div className="absolute top-10 md:top-16 left-7  md:left-16">
          <div className="w-11/12 md:w-[642px] h-auto md:h-[398px] bg-white flex flex-col justify-center px-10 py-5">
            <h2 className="text-xl md:text-[38px] font-secondary leading-normal md:leading-[55.02px] font-normal w-auto md:w-[350px]">
              ALL-NATURAL MADE WITH LOVE
            </h2>
            <p className="text-base md:text-[20px] font-bold font-tertiary pt-5 text-gray-700 leading-[31.58px]">
              Its long-lasting fragnance is exquisite and has a striking appeal
              Its long-lasting is exquisite and has a striking appeal Its long-
              lasting fragnance is exquisite and has a Its long-lasting is.
            </p>
          </div>
          <div className="flex justify-end w-11/12 md:w-[642px]">
            <Link href={"/products"} className="">
              <button className="relative w-[120px] md:w-[249px] h-10 md:h-[74px] group">
                <p className="absolute left-0 right-0 top-0 bottom-0 z-10  flex justify-center items-center gap-2 text-white">
                  <span className="text-sm md:text-[28px] font-petrona font-black">
                    SHOP NOW
                  </span>
                  <FaArrowRight className="text-base md:text-2xl group-hover:translate-x-1 group-hover:duration-300" />
                </p>
                <div className="absolute inset-0 bg-primary-200 opacity-50"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
