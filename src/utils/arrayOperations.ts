
class ArrayHandler<T> {
  private array: T[];

  constructor(initialArray: T[] = []) {
    this.array = [...initialArray];
  }

  // Create: Add an element at a specific index
  addAtIndex(index: number, element: T): void {
    if (index < 0 || index > this.array.length) {
      throw new RangeError("Index out of bounds");
    }
    this.array.splice(index, 0, element);
  }

  // Read: Get an element at a specific index
  getAtIndex(index: number): T {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError("Index out of bounds");
    }
    return this.array[index];
  }

  // Update: Update an element at a specific index
  updateAtIndex(index: number, newValue: T): void {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError("Index out of bounds");
    }
    this.array[index] = newValue;
  }

  // Delete: Remove an element at a specific index
  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError("Index out of bounds");
    }
    this.array.splice(index, 1);
  }

  // Get the entire array
  getArray(): T[] {
    return [...this.array];
  }
}

export default ArrayHandler;

