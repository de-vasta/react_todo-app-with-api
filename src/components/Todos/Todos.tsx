import React from 'react';
import { Todo } from '../../types/Todo';
import TodoItem from '../TodoItem/TodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Props {
  todos: Todo[];
  handleTodoRemove: (todoId: number) => Promise<void>;
  handleTodoUpdate: (todo: Todo) => Promise<void>;
  transitionTimeout: number;
  deletingTodoIds?: number[];
}

const Todos = ({
  todos,

  handleTodoRemove,
  handleTodoUpdate,
  deletingTodoIds = [],
  transitionTimeout,
}: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={transitionTimeout}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              onTodoUpdate={handleTodoUpdate}
              onTodoRemove={handleTodoRemove}
              isToDelete={deletingTodoIds.includes(todo.id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};

export default React.memo(Todos);
