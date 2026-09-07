export type KeepExistingChoice = 'keep' | 'replace' | 'mix';

export type DesignDecision = {
  choice: KeepExistingChoice;
  requiresBudget: boolean;
  nextStep: 'design' | 'budget';
};

export function resolveDesignDecision(choice: KeepExistingChoice): DesignDecision {
  return {
    choice,
    requiresBudget: choice !== 'keep',
    nextStep: choice === 'keep' ? 'design' : 'budget',
  };
}
