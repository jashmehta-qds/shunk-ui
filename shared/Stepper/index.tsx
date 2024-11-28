const CONTRACT_ADDRESS = process.env.BASE_CONTRACT_ADDRESS;

export interface StepperInterface {
  id: number;
  content: React.ReactNode;
  additionalContent?: React.ReactNode;
}
export interface StepperProps {
  list: StepperInterface[];
  selectedId: number;
}
export const Stepper: React.FC<StepperProps> = ({ list, selectedId }) => {
  return (
    <ol className=" overflow-hidden  md:space-y-8 flex flex-row md:flex-col h-full">
      {list.map((data) => {
        const isSelected = data.id < selectedId;

        const isNext = data.id === selectedId;

        return (
          <li
            key={data.id + "stepper"}
            className={`after:opacity-0 md:after:opacity-100 relative flex-1 after:content-[''] after:w-0.5 after:h-full after:inline-block after:absolute after:left-4 lg:after:left-5  ${
              isSelected
                ? "after:bg-indigo-600 after:-bottom-11"
                : isNext
                ? "after:bg-gray-200 after:-bottom-12"
                : ""
            }`}
          >
            <a
              className={`flex mb-2 lg:mb-0 flex-col md:flex-row items-center font-medium w-full transition-colors duration-300 ${
                isSelected
                  ? "text-indigo-600"
                  : isNext
                  ? "text-indigo-600"
                  : "text-gray-900"
              }`}
            >
              <span
                className={`w-8 h-8 lg:w-10 lg:h-10 border-2 rounded-full flex justify-center items-center mr-0 lg:mr-3 text-sm transition-all duration-300 ${
                  isSelected
                    ? "bg-indigo-600 border-transparent text-white"
                    : isNext
                    ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {isSelected ? (
                  <svg
                    className="w-5 h-5 stroke-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
                      stroke="stroke-current"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="my-path"
                    />
                  </svg>
                ) : (
                  data.id
                )}
              </span>
              <div className="block text-center lg:text-left">
                <h4
                  className={`hidden md:block text-lg transition-colors duration-300 ${
                    isSelected
                      ? "text-indigo-600"
                      : isNext
                      ? "text-indigo-600"
                      : "text-gray-900"
                  }`}
                >
                  Step {data.id}
                </h4>
                <span className="text-sm ">{data.content}</span>
              </div>
            </a>
            <div className="hidden md:block ml-12 pl-1">
              {data.additionalContent}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
