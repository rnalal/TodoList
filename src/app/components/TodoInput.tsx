"use client";
import React, { useState } from "react";
import styles from "../styles/TodoInput.module.css";

interface TodoInputProps {
  onTodoAdded: (task: string) => void;
  hasTodos: boolean;
  loading: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({ onTodoAdded, hasTodos, loading }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      onTodoAdded(task); // 할 일 추가 API 호출
      setTask(""); // 입력창 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={styles.todoInput} placeholder="할 일을 입력해주세요" disabled={loading}/>
      <button type="submit" className={`${styles.todoButton} ${hasTodos ? styles.hasTodos : styles.noTodos}`} disabled={loading}>
        <span className={styles.plusIcon}>{loading ? "" : "+"}</span>
        {loading ? "추가 중..." : "추가하기"}
      </button>
    </form>
  );
};

export default TodoInput;