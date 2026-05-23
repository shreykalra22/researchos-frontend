import { apiClient } from "./client";

export type ChatRequest = {
  query: string;
  session_id: string;
};

export type ChatSource = {
  page_number: number;
  source: string;
};

export type ChatResponse = {
  success: boolean;
  data: {
    query: string;
    answer: string;
    sources: ChatSource[];
    session_id: string;
  };
};

export async function sendChatMessage(
  payload: ChatRequest
): Promise<ChatResponse> {

  const response = await apiClient.post(
    "/chat",
    payload
  );

  return response.data;
}