export default function Footer() {
    return (
      <footer className="bottom-0 left-0 z-20 w-full p-4 footer-bg border-t-[0.2px] border-gray-100 shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://www.linkedin.com/in/bhavya-gupta-623981280/" className="hover:underline" target="#">Bhavya Gupta™</a>.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a target="#" href="https://github.com/BhavyaGupta315" className="hover:underline me-4 md:me-6 text-lg">
            <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a target="#" href="https://www.linkedin.com/in/bhavya-gupta-623981280/" className="hover:underline me-4 md:me-6 text-lg">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </footer>
    );
  }
  