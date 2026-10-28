const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function buildBlackFridayClaimFilter(leadId: string, claimToken: string): string {
  if (!UUID.test(leadId) || !UUID.test(claimToken)) throw new Error('invalid_claim');
  return `id=eq.${encodeURIComponent(leadId)}&tracking_status=eq.processing&tracking_claim_token=eq.${encodeURIComponent(claimToken)}`;
}
