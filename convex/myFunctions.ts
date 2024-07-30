import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

export const listTodos = query({
  args: {
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").order("desc").take(args.count);
    return todos.reverse();
  },
});

export const addTodo = mutation({
  args: {
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("todos", { value: args.value, done: false });
    console.log("Added new document with id:", id);
  },
});

export const markTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const todo = await ctx.db.get(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.patch(id, { done: !todo.done });
  },
});
