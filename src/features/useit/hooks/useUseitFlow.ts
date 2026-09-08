import { useCallback, useState } from 'react';
import { analyzeImage, redesignImage, type AnalysisResult, type RedesignResult } from '../../core/intelligence/apiClient';

export type UseitFlowState = {
  imageUri: string | null;
  analysis: AnalysisResult | null;
  redesign: RedesignResult | null;
  loading: boolean;
  error: string | null;
};

const initialState: UseitFlowState = {
  imageUri: null,
  analysis: null,
  redesign: null,
  loading: false,
  error: null,
};

export function useUseitFlow() {
  const [state, setState] = useState<UseitFlowState>(initialState);

  const setImage = useCallback((imageUri: string) => {
    setState({ ...initialState, imageUri });
  }, []);

  const analyze = useCallback(async () => {
    if (!state.imageUri) return;
    setState((current) => ({ ...current, loading: true, error: null, redesign: null }));
    try {
      const analysis = await analyzeImage(state.imageUri);
      setState((current) => ({ ...current, analysis, loading: false }));
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: false,
        error: error instanceof Error ? error.message : 'Az elemzés sikertelen.',
      }));
    }
  }, [state.imageUri]);

  const redesign = useCallback(async () => {
    if (!state.imageUri) return;
    setState((current) => ({ ...current, loading: true, error: null }));
    try {
      const result = await redesignImage(state.imageUri);
      setState((current) => ({ ...current, redesign: result, loading: false }));
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: false,
        error: error instanceof Error ? error.message : 'Az újratervezés sikertelen.',
      }));
    }
  }, [state.imageUri]);

  const clearError = useCallback(() => {
    setState((current) => ({ ...current, error: null }));
  }, []);

  return { state, setImage, analyze, redesign, clearError };
}
