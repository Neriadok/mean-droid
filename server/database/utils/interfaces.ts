export function extendsWithDates() {
  return {
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
  }
}
