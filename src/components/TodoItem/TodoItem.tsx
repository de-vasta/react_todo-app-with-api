import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React, { useState } from 'react';

interface Props {
  todo: Todo;
  onToggle?: (todoId: number) => void;
  onTodoRemove?: (todoId: number) => Promise<void>;
  hasTempTodo?: boolean;
  isToDelete?: boolean;
}

const TodoItem = ({
  todo: { id, title, completed },
  onToggle,
  onTodoRemove,
  hasTempTodo = false,
  isToDelete = false,
}: Props) => {
  const [titleInput, setTitleInput] = useState(title);
  const [hasEditMode, setHasEditMode] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasEditMode(false);
    //TODO: add handleUpdate Todo
  };

  const handleCancelUpdate = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      setHasEditMode(false);
      setTitleInput(title);
    }
  };

  const handleDelete = (todoId: number) => {
    onTodoRemove?.(todoId);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label aria-label="Todo Status" className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onToggle?.(id)}
        />
      </label>

      {!hasEditMode ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setHasEditMode(true);
            }}
          >
            {titleInput}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(id)}
          >
            {isToDelete ? '···' : '×'}
          </button>
        </>
      ) : (
        <form
          onSubmit={event => onSubmit(event)}
          onBlur={event => onSubmit(event)}
          onKeyUp={event => handleCancelUpdate(event)}
        >
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleInput}
            onChange={event => setTitleInput(event.target.value)}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': hasTempTodo || isToDelete,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
