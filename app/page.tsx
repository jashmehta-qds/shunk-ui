"use client";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import { Accordion } from "@/shared/Accordion";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const features = [
  {
    title: "Secure Investments",
    description: "Industry-leading security and transparency.",
  },
  {
    title: "High Yield Returns",
    description: "Earn competitive rates with minimal risk.",
  },
  {
    title: "Decentralized Access",
    description: "No intermediaries, no restrictions.",
  },
];

const FAQquestions = [
  {
    content: "testing coneoaihawiodjaoiwjdilahwdoai hda dawojd akw haoi oia",
    heading: "What is Shunk?",
  },
  {
    content:
      "Velvet Capital provides all the necessary infrastructure to create & manage DeFi products. Velvet is like your own personal smart contract factory - every time a vault manager creates a vault, a new series of custom smart contracts gets deployed, each product is independent and is entirely created & managed by the vault manager. We do not take custody of your assets.",
    heading: "How Does Shunk.io work?",
  },
  {
    content:
      "Velvet Capital is focused on building a Professional-Grade Operating System for DeFi that makes creating new DeFi products easier than ever. We are currently live on BNB Chain & Arbitrum and will be supporting more chains over time. View our roadmap here.",
    heading: "What is next for Shunk.io?",
  },
  {
    content:
      "Velvet Capital is focused on building a Professional-Grade Operating System for DeFi that makes creating new DeFi products easier than ever. We are currently live on BNB Chain & Arbitrum and will be supporting more chains over time. View our roadmap here.",
    heading: "What is Shunk DAO & How Do I Join?",
  },
  {
    heading: "How do i create my own Bag?",
    content: "Steps to do",
  },
];
const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{ background: "rgb(214, 219, 220)" }}
      className="w-full h-screen"
    />
  ),
});
const Home = () => {
  return (
    <div className=" overflow-scroll flex flex-col w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center"
      >
        <Hero />
      </motion.div>

      <section className=" w-11/12 lg:w-full self-center py-20  backdrop-blur-sm text-dark">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose Us?</h2>
          <div className="grid gap-10 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-5 bg-neutral-50		 shadow-lg rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-3">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className=" w-11/12 self-center lg:w-full py-20 	 backdrop-blur	 text-dark">
        <div className="max-w-5xl mx-auto text-center">
          <div className="  lg:flex gap-10 justify-between">
            <div className="mb-4">
              <p className="justify-self-center	lg:justify-self-start	 mb-5 font-silkscreen  text-mainBlue font-bold">
                FAQ
              </p>
              <h1 className="	lg:text-left	 text-4xl font-bold">
                Question?, Well Here are some Answers
              </h1>
              <div className="mt-5 mb-5 w-full border	 border-solid border-stone-400	"></div>
              <div className="items-center lg:items-left justify-between flex gap-5 items-center">
                <p className="text-m font-semibold">Cant See your question?</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: "#2563eb", borderColor: "#2563eb" }}
                  className="bg-white/10  px-8 py-3 rounded-full font-medium backdrop-blur-sm border  hover:bg-white/20 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              {FAQquestions.map((question, index) => (
                <motion.div
                  key={index}
                  className="w-full"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Accordion
                    heading={question.heading}
                    content={question.content}
                    customClass="mb-2 lg:mb-4 "
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className=" w-11/12 lg:w-full self-center py-20 backdrop-blur-md text-dark">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Start Your DeFi Journey?
          </motion.h2>
          <motion.button
            className="mt-8 py-3 px-8 "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative inline-flex items-center justify-center px-8 py-3 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-full group">
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-mainBlue rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative text-base font-semibold">
                Join Now{" "}
              </span>
            </div>
          </motion.button>
        </div>
      </section>
      <footer className="bg-dark text-white py-5">
        <div className="max-w-5xl mx-auto text-center">
          <p>&copy; 2024 DeFi Invest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
