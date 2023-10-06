
export interface IDraggableEvent<T> {
  added?: {
    newIndex: number;
    element: T;
  };
  removed?: {
    oldIndex: number;
    element: T;
  };
  moved?: {
    newIndex: number;
    oldIndex: number;
    element: T;
  }
}
