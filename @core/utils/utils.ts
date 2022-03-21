export { v4 as uuidv4 } from 'uuid';

export const omit = (key: string, obj: any) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};
