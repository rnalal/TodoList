"use client";

import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Icon from './components/Icon';
import { getTodos, addTodo, updateTodoStatus } from "./lib/api"; // API 호출 함수 임포트
import styles from './styles/Page.module.css';

export default function TodoPage() {
  const [todos, setTodos] = useState<{ id: number; name: string; completed: boolean }[]>([]);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [loadingTodos, setLoadingTodos] = useState(true); // 할 일 목록 로딩 상태

    // 새로운 할 일 추가 시 상태 업데이트
    const handleTodoAdded = async (task: string) => {
      setLoading(true); // 로딩 시작
      try {
        const newTodo = await addTodo(task); // API 호출하여 할 일 추가
        setTodos((prevTodos) => [...prevTodos, newTodo]); // 상태 업데이트
      } catch (error) {
        console.error("할 일 추가 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };
    
     // 할 일 목록을 가져오는 함수
    const fetchTodos = async () => {
      setLoadingTodos(true); // 로딩 시작
      try {
        const fetchedTodos = await getTodos(); // API 호출
        setTodos(fetchedTodos); // 상태 업데이트
      } catch (error) {
        console.error("할 일 목록 가져오기 중 오류 발생:", error);
      } finally {
        setLoadingTodos(false); // 로딩 끝
      }
    };
    // 컴포넌트가 마운트될 때 할 일 목록을 가져옵니다.
    useEffect(() => {
      fetchTodos(); // 할 일 목록 가져오기
    }, []); // 페이지가 처음 로드될 때만 실행

    // 할 일 상태 업데이트 함수
    const toggleComplete = async (id: number) => {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;
    
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );

      try {
        await updateTodoStatus(id, updatedTodo.completed); // 서버에 완료 상태 업데이트
      } catch (error) {
        console.error("할 일 상태 업데이트 중 오류 발생:", error);
      }
    };

  return (
    <div className={styles.main}>
        <Icon /> {/* 아이콘 표시 */}
        <div className={styles.page}>
        <TodoInput onTodoAdded={handleTodoAdded} hasTodos={todos.length > 0} loading={loading}/>
        <div>
          {loadingTodos ? (  // 로딩 중이면 로딩 메시지 표시
            <p>할 일 목록을 가져오는 중...</p>
          ) : (
            <TodoList todos={todos} toggleComplete={toggleComplete} />
          )}
        </div>
      </div>
    </div>
  );
} 