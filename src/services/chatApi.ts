import apiClient from "../api/client";

interface AskQuestionPayload {
  query: string;
  session_id: string;
}

interface ChatResponse {
  query: string;
  answer: string;
  sources: {
    page_number: number;
    source: string;
  }[];
  session_id: string;
}

export async function askQuestion(
  payload: AskQuestionPayload
): Promise<ChatResponse> {

  const response = await apiClient.post(
    "/chat",
    payload
  );

  return response.data.data;
}