import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motion';

function About() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto p-6"
    >
      <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-8">About TicketSwap</motion.h2>
      
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card */}
        <motion.div variants={fadeInUp} className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300">
            TicketSwap is a modern platform designed to make ticket exchange simple,
            secure, and convenient. Our mission is to connect travelers and help them
            find the best deals on travel tickets.
          </p>
        </motion.div>

        {/* Why Choose Us Card */}
        <motion.div variants={fadeInUp} className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Why Choose TicketSwap?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Safe and secure transactions</li>
            <li>Wide selection of tickets</li>
            <li>User-friendly interface</li>
            <li>24/7 customer support</li>
            <li>Best price guarantee</li>
          </ul>
        </motion.div>
      </motion.div>
      
      {/* Values Section */}
      <motion.h3 variants={fadeInUp} className="text-3xl font-semibold text-center mt-12 mb-6">Our Values</motion.h3>
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Trust</h4>
          <p className="text-gray-600 dark:text-gray-300">Building trust through transparent and secure transactions.</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Innovation</h4>
          <p className="text-gray-600 dark:text-gray-300">Constantly improving our platform for better user experience.</p>
        </motion.div>
        <motion.div variants={fadeInUp} className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Community</h4>
          <p className="text-gray-600 dark:text-gray-300">Creating a helpful community of travelers.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
