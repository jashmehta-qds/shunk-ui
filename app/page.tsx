"use client";
import { motion } from "framer-motion";

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

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <motion.nav
        className="flex justify-between items-center p-5 bg-dark text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold">DeFi Invest</div>
        <ul className="flex gap-5">
          <li>Home</li>
          <li>About</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>
      </motion.nav>
      <section className="min-h-screen flex items-center justify-center bg-primary text-white">
        <div className="text-center max-w-2xl">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Invest in the Future of DeFi
          </motion.h1>
          <motion.p
            className="mt-5 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Earn passive income with decentralized investments. Safe, secure,
            and easy.
          </motion.p>
          <motion.button
            className="mt-10 bg-accent text-dark py-3 px-6 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </section>
      <section className="py-20 bg-light text-dark">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose Us?</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-5 bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-3">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-accent text-dark">
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
            className="mt-8 bg-dark text-white py-3 px-8 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now
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
