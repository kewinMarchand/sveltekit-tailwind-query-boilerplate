import { createQuery } from '@tanstack/svelte-query'

import { findAllTasks } from '#lib/modules/task/infrastructure/taskRepository'
import { TasksLoadError } from '#lib/modules/task/infrastructure/TasksLoadError'

export const TASKS_QUERY_KEY = ['tasks'] as const

const fetchTasks = async () => {
  try {
    return await findAllTasks()
  } catch {
    throw new TasksLoadError()
  }
}

export const useTasks = () =>
  createQuery(() => ({ queryKey: TASKS_QUERY_KEY, queryFn: fetchTasks }))
