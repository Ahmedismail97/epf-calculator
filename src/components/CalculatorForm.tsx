import React, { useState } from "react";

interface CalculatorFormProps {
  onCalculate: (wage: number, nationality: string, age: number, isBonusIncluded: boolean, residencyStatus: string, contributionStartDate?: Date) => void;
  onClear: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, onClear }) => {
  const [wage, setWage] = useState("");
  const [nationality, setNationality] = useState("Malaysian");
  const [age, setAge] = useState("");
  const [isBonusIncluded, setIsBonusIncluded] = useState(false);
  const [residencyStatus, setResidencyStatus] = useState("citizen");
  const [contributionStartDate, setContributionStartDate] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!wage) newErrors.wage = "Wage is required";
    else if (isNaN(parseFloat(wage)) || parseFloat(wage) <= 0) newErrors.wage = "Please enter a valid wage amount";

    if (!age) newErrors.age = "Age is required";
    else if (isNaN(parseInt(age)) || parseInt(age) < 0) newErrors.age = "Please enter a valid age";
    else if (parseInt(age) >= 60) newErrors.age = "Contributions do not apply for employees 60 and older";

    if (nationality === "Non-Malaysian" && !residencyStatus) newErrors.residencyStatus = "Residency status is required for non-Malaysians";

    if (nationality === "Non-Malaysian" && residencyStatus === "non-citizen" && !contributionStartDate) {
      newErrors.contributionStartDate = "Contribution start date is required for non-citizen employees";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate(
        parseFloat(wage),
        nationality,
        parseInt(age),
        isBonusIncluded,
        nationality === "Non-Malaysian" ? residencyStatus : "citizen",
        contributionStartDate ? new Date(contributionStartDate) : undefined
      );
    }
  };

  const handleClear = () => {
    setWage("");
    setNationality("Malaysian");
    setAge("");
    setIsBonusIncluded(false);
    setResidencyStatus("citizen");
    setContributionStartDate("");
    setErrors({});
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="wage" className="block text-sm font-medium text-gray-700">Amount of Wages (RM)</label>
        <input
          type="number"
          id="wage"
          placeholder="Enter wage amount"
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
            errors.wage ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
          }`}
        />
        {errors.wage && <p className="mt-1 text-sm text-red-600">{errors.wage}</p>}
      </div>
      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
        <select
          id="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="Malaysian">Malaysian</option>
          <option value="Non-Malaysian">Non-Malaysian</option>
        </select>
      </div>
      {nationality === "Non-Malaysian" && (
        <div>
          <label htmlFor="residencyStatus" className="block text-sm font-medium text-gray-700">Residency Status</label>
          <select
            id="residencyStatus"
            value={residencyStatus}
            onChange={(e) => setResidencyStatus(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
              errors.residencyStatus ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
            }`}
          >
            <option value="permanent resident">Permanent Resident</option>
            <option value="non-citizen">Non-Citizen</option>
          </select>
          {errors.residencyStatus && <p className="mt-1 text-sm text-red-600">{errors.residencyStatus}</p>}
        </div>
      )}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Employee Age</label>
        <input
          type="number"
          id="age"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
            errors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
          }`}
        />
        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="contributionStartDate" className="block text-sm font-medium text-gray-700">Contribution Start Date</label>
        <input
          type="date"
          id="contributionStartDate"
          value={contributionStartDate}
          onChange={(e) => setContributionStartDate(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
            errors.contributionStartDate ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
          }`}
        />
        {errors.contributionStartDate && <p className="mt-1 text-sm text-red-600">{errors.contributionStartDate}</p>}
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="bonusIncluded"
          checked={isBonusIncluded}
          onChange={(e) => setIsBonusIncluded(e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="bonusIncluded" className="ml-2 block text-sm text-gray-900">Bonus Included</label>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;
