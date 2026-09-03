import { RiskEvaluationRequest, RiskEvaluationResult } from '../types/risk';
import { SentinelRiskEngine } from '../engine/riskEngine';
import { aiAssistantService } from './aiAssistant';
import { ChatMessage } from '../types/ai';

const API_BASE_URL = 'http://localhost:3001/api';

export class SentinelApiClient {
  /**
   * Evaluates risk by querying the Express backend or fallback to in-browser engine.
   */
  public static async evaluateRisk(request: RiskEvaluationRequest): Promise<RiskEvaluationResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/risk/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.result) {
          return data.result;
        }
      }
    } catch (err) {
      // Backend not running; fallback gracefully to client engine
    }

    return SentinelRiskEngine.evaluate(request);
  }

  /**
   * Sends user query to AI safety assistant.
   */
  public static async askAIAssistant(message: string, context?: any): Promise<ChatMessage> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.message) {
          return data.message;
        }
      }
    } catch (err) {
      // Backend not running; fallback to client service
    }

    return aiAssistantService.analyzeAndRespond(message, context);
  }

  /**
   * Records prevented transaction to server audit log.
   */
  public static async recordPreventedTransaction(payload: any): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/transactions/prevent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Ignore network errors in demo mode
    }
  }
}
