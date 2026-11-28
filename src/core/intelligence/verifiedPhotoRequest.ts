import { matchesImageFidelity, type NormalizedImageFidelity } from './imageNormalization';

export type VerifiedPhotoRequestResult<T> =
  | { ok: true; value: T }
  | { ok: false };

type PhotoRequest<T> = (photo: string) => Promise<T>;
type CanRequest = () => boolean;

async function runVerifiedPhotoRequest<T>(
  photo: string | null,
  fidelity: NormalizedImageFidelity | null,
  onRejected: () => void,
  request: PhotoRequest<T>,
  canRequest: CanRequest
): Promise<VerifiedPhotoRequestResult<T>> {
  if (!photo || !(await matchesImageFidelity(photo, fidelity))) {
    onRejected();
    return { ok: false };
  }
  if (!canRequest()) return { ok: false };
  return { ok: true, value: await request(photo) };
}

export function runAnalysisWithVerifiedPhoto<T>(
  photo: string | null,
  fidelity: NormalizedImageFidelity | null,
  onRejected: () => void,
  request: PhotoRequest<T>,
  canRequest: CanRequest = () => true
): Promise<VerifiedPhotoRequestResult<T>> {
  return runVerifiedPhotoRequest(photo, fidelity, onRejected, request, canRequest);
}

export function runVisualConceptWithVerifiedPhoto<T>(
  photo: string | null,
  fidelity: NormalizedImageFidelity | null,
  onRejected: () => void,
  request: PhotoRequest<T>,
  canRequest: CanRequest = () => true
): Promise<VerifiedPhotoRequestResult<T>> {
  return runVerifiedPhotoRequest(photo, fidelity, onRejected, request, canRequest);
}
