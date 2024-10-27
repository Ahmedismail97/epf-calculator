import React from "react";

interface ContributionResultProps {
  result: { employerShare: number; employeeShare: number; sectionType: string } | null;
}

const ContributionResult: React.FC<ContributionResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Contribution Results</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Employer's Share</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">RM {result.employerShare.toFixed(2)}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Employee's Share</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">RM {result.employeeShare.toFixed(2)}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Section Type</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.sectionType}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ContributionResult;
