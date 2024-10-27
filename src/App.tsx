import { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import ContributionResult from "./components/ContributionResult";
import { calculateContribution, ContributionResult as ContributionResultType } from "./utils/calculateContribution";

function App() {
  const [result, setResult] = useState<ContributionResultType | null>(null);

  const handleCalculate = (wage: number, nationality: string, age: number, isBonusIncluded: boolean, residencyStatus: string, contributionStartDate?: Date) => {
    try {
      const contribution = calculateContribution(wage, nationality, age, isBonusIncluded, residencyStatus, contributionStartDate);
      setResult(contribution);
    } catch (error) {
      console.error(error);
      setResult(null);
    }
  };

  const handleClear = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6">EPF Third Schedule Calculator</h1>
            <CalculatorForm onCalculate={handleCalculate} onClear={handleClear} />
            <ContributionResult result={result} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
