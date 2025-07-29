import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6"
    >
      <h2 className="text-4xl font-bold text-center mb-8">About TicketSwap</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300">
            TicketSwap is a modern platform designed to make ticket exchange simple,
            secure, and convenient. Our mission is to connect travelers and help them
            find the best deals on travel tickets.
          </p>
        </div>

        {/* Why Choose Us Card */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">Why Choose TicketSwap?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Safe and secure transactions</li>
            <li>Wide selection of tickets</li>
            <li>User-friendly interface</li>
            <li>24/7 customer support</li>
            <li>Best price guarantee</li>
          </ul>
        </div>
      </div>
      
      {/* Values Section */}
      <h3 className="text-3xl font-semibold text-center mt-12 mb-6">Our Values</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Trust</h4>
          <p className="text-gray-600 dark:text-gray-300">Building trust through transparent and secure transactions.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Innovation</h4>
          <p className="text-gray-600 dark:text-gray-300">Constantly improving our platform for better user experience.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Community</h4>
          <p className="text-gray-600 dark:text-gray-300">Creating a helpful community of travelers.</p>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
