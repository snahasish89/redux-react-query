import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type } from 'os';
import { RootState } from '../app/store';
import { getTodo, getUsers } from '../services/user.service';
import { ITodo, IUser } from '../types/type';


export type IStatus = 'idle' | 'loading' | 'failed';
export interface UserTodoState {
    users: IUser[];
    userStatus: IStatus;
    todos: ITodo[];
    todoStatus: IStatus;
}

const initialState: UserTodoState = {
  users: [],
  userStatus: 'idle',
  todos: [],
  todoStatus: 'idle'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// Any fetchrequest come through asnthank
export const getUserAsync = createAsyncThunk(
  'userTodo/fetchUser',
  async () => {
    // The value we return becomes the `fulfilled` action payload
    // TODO : how to use useQuery
    return await getUsers();
  }
);

export const getTodoAsync = createAsyncThunk(
    'userTodo/fetchTodo',
    async(userId: number) => {
      console.log(userId);
      return await getTodo(userId);
    }
)



export const userTodoSlice = createSlice({
  name: 'userTodo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
    .addCase(getUserAsync.pending, (state) => {
        state.userStatus = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.userStatus = 'idle';
        state.users = action.payload;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.userStatus = 'failed';
      })
      // Todo........
      .addCase(getTodoAsync.pending, (state) => {
        state.todoStatus = 'loading';
      })
      .addCase(getTodoAsync.fulfilled, (state, action) => {
        state.todoStatus = 'idle'
        state.todos = action.payload;
      })
      .addCase(getTodoAsync.rejected, (state) => {
        state.todoStatus = 'failed';
      });
  },
});

//export const { } = userTodoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectorTodos = (state: RootState) => state.userTodo.todos;
export const selectorUsers = (state: RootState) => state.userTodo.users;
export const selectorStatus = (state: RootState) => state.userTodo.userStatus;
export const selectorTodoStatus = (state: RootState) => state.userTodo.todoStatus;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default userTodoSlice.reducer;
