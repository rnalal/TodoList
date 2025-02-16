"use client";
import React from "react";
import Link from "next/link"; // Next.js에서 페이지 이동을 위한 Link 컴포넌트 추가
import styles from "../styles/TodoItem.module.css";

interface TodoItemProps {
  id: number;
  name: string;
  completed: boolean;
  toggleComplete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, name, completed, toggleComplete }) => {
  return (
    <div className={`${styles.todoItem} ${completed ? styles.completed : ""}`}>
      {/* 체크박스 클릭 시 완료 상태 변경*/}
      <div onClick={toggleComplete} className={styles.checkbox}>
        <img
          src={completed ? "/images/check.png" : "/images/nocheck.png"}
          alt="checkbox"
          className={styles.checkboxImage}
        />
      </div>
      <Link href={`/items/${id}`} className={styles.taskLink}>
        <label className={completed ? styles.completedTask : ""}>{name}</label>
      </Link>
    </div>
  );
};

export default TodoItem;