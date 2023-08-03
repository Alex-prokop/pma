export interface Board {
  id?: string;
  title: string;
}

export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Task[];
}

export interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
}

