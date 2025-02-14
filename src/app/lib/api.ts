import axios from "axios";

const API_BASE_URL = "https://assignment-todolist-api.vercel.app/api/young";
const API_IMAGE_URL = `${API_BASE_URL}/images/upload`; // 이미지 업로드 API URL 정의

// 할 일 추가 함수
export const addTodo = async (name: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/items`, { name });
      return response.data; // 생성된 할 일 객체 반환
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
      throw error;
    }
  };

// 할 일 목록 가져오는 함수
export const getTodos = async (page: number = 1, pageSize: number = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items`, {
        params: {
          page,
          pageSize,
        },
      });
      return response.data; // 응답 데이터 반환
    } catch (error) {
      console.error('할 일 목록 가져오기 중 오류 발생:', error);
      throw error;
    }
  };

// 할 일 상태 업데이트 함수 (완료 상태 변경)
export const updateTodoStatus = async (id: number, isCompleted: boolean) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/items/${id}`, {
        isCompleted: isCompleted,
      });
      return response.data; // 상태 업데이트 후 반환된 데이터
    } catch (error) {
      console.error("할 일 상태 업데이트 중 오류 발생:", error);
      throw error;
    }
  };

  // 할 일 상세 정보 가져오기
export const getTodoById = async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items/${id}`);
      console.log("요청 URL:", `${API_BASE_URL}/items/${id}`);
      return response.data; // 응답 데이터 반환
    } catch (error) {
      console.error("할 일 상세 보기 중 오류 발생:", error);
    }
  };

  // 할 일 수정 함수
  export const updateTodo = async (
    id: number,
    updatedTodo: { name: string; memo: string; imageUrl: string; isCompleted: boolean }
  ) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/items/${id}`, updatedTodo);
      return response.data; // 수정된 할 일 데이터 반환
    } catch (error) {
      console.error("할 일 수정 중 오류 발생:", error);
      throw error;
    }
  };

  // 이미지 업로드 함수
  export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(API_IMAGE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
        },
      });
      return response.data.url; // 업로드된 이미지 URL 반환
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      throw error;
    }
  };

// 할 일 삭제 함수
export const deleteTodo = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/items/${id}`);
    return response.data; // 삭제된 할 일 데이터 반환
  } catch (error) {
    console.error("할 일 삭제 중 오류 발생:", error);
    throw error;
  }
};
  