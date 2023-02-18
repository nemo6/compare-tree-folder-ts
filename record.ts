(obj2 as Record<typeof k, typeof k>)
obj = obj as unknown as { prop: string };
var obj: {[k: string]: any} = {};

const someObj:ObjectType = data;
const field = 'username';

const temp = someObj[field];
const temp = someObj[field as keyof ObjectType]
const temp = someObj[field as keyof typeof someObj]

let b = jsonToChildren({ obj1: a }) as NestedObject[]
