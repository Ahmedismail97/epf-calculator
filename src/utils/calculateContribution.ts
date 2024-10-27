import partAContributions from './partA_contributions.json';
import partBContributions from './partB_contributions.json';

interface ContributionResult {
  employerShare: number;
  employeeShare: number;
  sectionType: string;
}

function determineSectionType(
  nationality: string,
  residencyStatus: string,
  age: number,
  contributionStartDate?: Date
): "Part A" | "Part B" {
  if (age >= 60) throw new Error("Contributions do not apply for employees 60 and older.");

  // Part A eligibility
  if (
    nationality === "Malaysian" ||
    residencyStatus === "permanent resident" ||
    (residencyStatus === "non-citizen" && contributionStartDate && contributionStartDate < new Date("1998-08-01"))
  ) {
    return "Part A";
  }

  // Part B eligibility
  if (
    residencyStatus === "non-citizen" &&
    contributionStartDate &&
    contributionStartDate >= new Date("1998-08-01")
  ) {
    return "Part B";
  }

  throw new Error("Unable to determine contribution part based on eligibility rules.");
}

function getContributionFromData(
  wage: number,
  data: Array<{ minWage: number; maxWage: number; employerShare: number; employeeShare: number }>,
  sectionType: string,
  isBonusIncluded: boolean
): ContributionResult {
  const contribution = data.find(
    (entry) => wage >= entry.minWage && wage <= entry.maxWage
  );

  if (contribution) {
    let employerShare = contribution.employerShare;
    let employeeShare = contribution.employeeShare;

    // Special handling for wages 5000 and below with bonus
    if (isBonusIncluded && sectionType === "Part A") {
      const baseWage = data.find(entry => entry.maxWage === 5000);
      if (baseWage) {
        if (wage <= 5000) {
          // If wage is still 5000 or below after bonus, use normal calculation
          employerShare = contribution.employerShare;
          employeeShare = contribution.employeeShare;
        } else {
          // If wage exceeds 5000 after bonus, apply special rule
          employerShare = Math.ceil(wage * 0.13); // 13% of wage, rounded up to next ringgit
          employeeShare = baseWage.employeeShare; // Employee share remains at the 5000 level
        }
      }
    }

    return {
      employerShare,
      employeeShare,
      sectionType,
    };
  }

  throw new Error(`Wage out of range for ${sectionType}`);
}

export function calculateContribution(
  wage: number,
  nationality: string,
  age: number,
  isBonusIncluded: boolean,
  residencyStatus: string,
  contributionStartDate?: Date
): ContributionResult {
  const sectionType = determineSectionType(nationality, residencyStatus, age, contributionStartDate);
  const contributionData = sectionType === "Part A" ? partAContributions : partBContributions;
  return getContributionFromData(wage, contributionData, sectionType, isBonusIncluded);
}
