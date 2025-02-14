
import React from "react";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

interface TodoListProps {
  todos: { id: number; name: string; completed: boolean }[];
  toggleComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete }) => {
  return (
    <div className={styles.todoListContainer}>
      {/* 해야 할 일 목록 */}
      <div className={`${styles.todoColumn} ${styles.left}`}>
      <img src="/images/todoBtn.png" alt="아이콘" />
          {todos.filter(todo => !todo.completed).length === 0 ? (
            <div className={styles.todoimg}>
              <img src="/images/noTodo.png" alt="아이콘" />
              <p>할 일이 없어요. <br/> TODO를 새롭게 추가해주세요!</p>
            </div>
          ) : (
            todos
              .filter(todo => !todo.completed)
              .map((todo) => (
                <div key={todo.id}>
                  <TodoItem {...todo} toggleComplete={() => toggleComplete(todo.id)} />
                </div>
            ))
        )}
      </div>

      {/* 완료된 일 목록 */}
      <div className={`${styles.todoColumn} ${styles.right}`}>
      <img src="/images/doneBtn.png" alt="아이콘" />
        {todos.filter(todo => todo.completed).length === 0 ? (
          <div className={styles.todoimg}>
            <img src="/images/noDone.png" alt="아이콘" />
            <p>아직 다 한 일이 없어요. <br/> 해야 할 일을 체크해보세요!</p>
          </div>
        ) : (
          todos
            .filter(todo => todo.completed)
            .map((todo) => (
              <div key={todo.id}>
                <TodoItem {...todo} toggleComplete={() => toggleComplete(todo.id)} />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default TodoList;