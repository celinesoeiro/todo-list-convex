"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FormEvent, useState } from "react";

export default function Home() {
  const addTodo = useMutation(api.myFunctions.addTodo);
  const markTodo = useMutation(api.myFunctions.markTodo);
  const todos = useQuery(api.myFunctions.listTodos, { count: 10 });

  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit", e);
    void addTodo({ value: text });
  };

  const handleMark = (id: string) => {
    console.log("mark", id);
    void markTodo({ id: id });
  };

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center uppercase text-lime-50">
        To Do list
      </h1>
      <p className="text-lg uppercase text-center">behold... your todos:</p>
      <div className="h-full w-full bg-lime-100 rounded bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-lime-50 p-4">
        <ul className="list-disc pl-2 gap-2 flex flex-col">
          {todos?.map((todo) => (
            <li
              key={todo._id}
              className="flex flex-row gap-1 items-center cursor-pointer"
              onClick={() => handleMark(todo._id)}
            >
              <input type="checkbox" checked={todo.done} />
              {todo.value}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <p>Add a new todo</p>
        <input
          className="bg-transparent border-lime-50 py-1 px-2 rounded border text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What you have to do?"
        />
        <button
          type="submit"
          className="bg-lime-50 text-black border border-lime-500 p-1 rounded"
        >
          Save
        </button>
      </form>
    </main>
  );
}
