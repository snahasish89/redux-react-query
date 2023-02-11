import React, { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { Loading } from "../component/Loading";
import {
  getTodoAsync,
  getUserAsync,
  selectorStatus,
  selectorTodos,
  selectorTodoStatus,
  selectorUsers,
} from "../slice/userTodo";

const Users = () => {
  const todos = useSelector(selectorTodos);
  const user = useSelector(selectorUsers);
  const userStatus = useSelector(selectorStatus);
  const todoStatus = useSelector(selectorTodoStatus);
  const dispatch = useAppDispatch();
  const [selectedUserId, setSelectedUserId] = useState<number>(-1);
  //   const { isLoading, error, data } = useQuery("getUsers", () => getUsers());
  //   console.log(isLoading, error, data);
  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  if (userStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="container mx-auto my-3">
      <select
        onChange={(e) => dispatch(getTodoAsync(parseInt(e.target.value)))}
        className="px-2 border border-blue-200 cursor-pointer  rounded-lg bg-blue-100 hover:bg-blue-400"
      >
        {user?.map((el, idx) => (
          <option key={idx} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <div className="my-3 rounded my-2 min-h-[400px] bg-red-100">
        {
          todos.map((e,id) => (
            <p key={e.id} className="p-2 bg-white text-dark my-2">{e.title}</p>
          ))
        }
      </div>
    </div>
  );
};

export default memo(Users);
