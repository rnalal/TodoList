'use client'; 
import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import { getTodoById,updateTodo, uploadImage, deleteTodo } from "../../lib/api"; // api.ts에서 함수 임포트
import Icon from '../../components/Icon';
import styles from "../../styles/TodoDetail.module.css";

const TodoDetailPage = () => {
    const [todo, setTodo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter(); // 라우터 사용
  
    const { id } = useParams(); // Next.js 13에서 URL 파라미터를 가져올 때 useParams 사용
  
    // 할 일 상세 정보를 가져오는 함수
    const fetchTodoDetail = async (id: string) => {
      try {
        const response = await getTodoById(Number(id)); // getTodoById로 데이터 가져오기
        setTodo(response);
        setMemo(response.memo || "");
      } catch (error) {
        setError("해당 할 일을 찾을 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (id) {
        fetchTodoDetail(id as string);
      }
    }, [id]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
      }
    };

      // 체크박스 클릭 시 완료 상태 토글 함수
      const toggleComplete = () => {
        if (todo) {
          setTodo({ ...todo, completed: !todo.completed }); // completed 값 토글
        }
      };

      // 수정 완료 버튼 클릭 시 호출되는 함수
      const handleUpdate = async () => {
        if (!todo) return;

      // 이미지가 선택되지 않은 경우, 기존 이미지 URL을 사용하거나 없으면 null로 설정
      let imageUrl = todo.imageUrl || null; // 기존 이미지가 없으면 null로 처리

      // 이미지가 선택된 경우, 이미지 업로드 API 호출
      if (image) {
        try {
          imageUrl = await uploadImage(image); // 이미지 업로드 후 URL 받기
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          alert('이미지 업로드 실패');
          return; // 이미지 업로드 실패 시 함수 종료
        }
      }
        // 수정할 데이터 준비
        const updatedTodo = {
          name: todo.name,
          memo: memo,
          imageUrl: imageUrl,
          isCompleted: todo.completed,
        };
        try {
          const updated = await updateTodo(Number(id), updatedTodo);
          setTodo(updated); // 업데이트된 데이터로 상태 변경
          alert('할 일이 성공적으로 수정되었습니다.');
          window.location.reload();
        } catch (error) {
          console.error("할 일 수정 중 오류 발생:", error);
          alert('할 일 수정 실패');
        }
      };

      // 할 일 삭제 함수
      const handleDelete = async (id: number) => {
        try {
          const result = await deleteTodo(id); // 할 일 삭제
          console.log("삭제 결과:", result); // 삭제된 데이터 확인
          alert('할 일이 삭제되었습니다.');
          router.push('/'); // 삭제 후 메인 페이지로 이동
        } catch (error) {
          alert('할 일 삭제 실패');
        }
      };
      
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    // todo가 없을 때는 렌더링하지 않도록
   if (!todo) return <p>할 일을 찾을 수 없습니다.</p>;
  
    return (
      <div className={styles.main}>
      <Icon /> 
        <div className={styles.page}>
          <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}>
            <div onClick={toggleComplete} className={styles.checkbox}>
              <img src={todo.completed ? "/images/check.png" : "/images/nocheck.png"} alt="checkbox" className={styles.checkboxImage} />
            </div>
            <span className={`${todo.completed ? styles.completedTask : ""} ${styles.underlined}`}>{todo.name}</span>
          </div>
          <div className={styles.content}>
          <div className={styles.imageUpload}>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {/* 이미지가 있을 경우 기존 이미지를 보여주고, 새로운 이미지를 선택하면 미리보기로 표시 */}
              {todo?.imageUrl && !image && (
                <img src={todo.imageUrl} alt="Existing Image" className={styles.preview} />
              )}
              {image && (
                <img src={URL.createObjectURL(image)} alt="Preview" className={styles.preview} />
              )}
          </div>
            <div className={styles.memoContainer}>
              <span className={styles.memoLabel}>Memo</span>
              <textarea value={memo} onChange={(e) => setMemo(e.target.value)} className={styles.memoInput} />
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.updateButton} onClick={handleUpdate}>✔ 수정 완료</button>
            <button className={styles.deleteButton} onClick={() => handleDelete(todo.id)} style={{ background: 'none', border: 'none', padding: 0 }}>
              <img src="/images/Del.png" alt="Delete" className={styles.deleteImage} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  
  export default TodoDetailPage;