export { v4 as uuidv4, NIL as uuidnil } from 'uuid';

export const omit = (key: string, obj: any) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};
