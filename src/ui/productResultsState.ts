export function shouldShowEmptyProductPanel(
  intentName: string | undefined,
  actionType: string | undefined,
  candidateCount: number | undefined,
): boolean {
  const shoppingWasRequested = intentName === 'shop' || actionType === 'shop';
  return shoppingWasRequested && (candidateCount ?? 0) === 0;
}
