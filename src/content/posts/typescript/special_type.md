---
title: "[Typescript] Advance type implementations"
published: 2024-04-09
description: 'Advance type for typescript developers'
tags: [Typescript, Annotations]
category: Typescript
draft: false
---

# [Type] Special type implementations

In deep, the `typeof`, `keyof`, `keyof typeof`, `as const`, `extends` and `Record` are quite useful in general cases.

## `typeof`
To get the type of a variables.

```ts
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
 
type Person = typeof MyArray[number];
// type Person = {
//     name: string;
//     age: number;
// }
```

## `keyof`
To get the key terms of a `interface / type`.

```ts
type Staff = {
    name: string;
    salary: number;
}

type staffKeys = keyof Staff; // "name" | "salary"
```

## `keyof typeof`
To get the key terms regading a `builded object`.  

```ts
const preferences = { 
    language: "en",
    theme: 'light'
};

type Preferences = keyof typeof preferences; // "language" | "theme"
```

## `as const`
To implement `fully readonly objects` for types.  

### Array usage 

```ts
const optionsList = ['easy', 'normal', 'hard'] as const
type Difficulty = typeof optionsList[number] // "easy" | "normal" | "hard"  
```   

```ts
export const GESTURE_LIST = ["Unknown", "Closed_Fist", "Open_Palm"] as const

export interface GestureObj {
    label: string;
    emoji: string;
}

export const GESTURE_DATA: {
    [key in typeof GESTURE_LIST[number]]: GestureObj
} = {
    "Unknown": {
        label: "Unrecognized gesture",
        emoji: "❓"
    },
    "Closed_Fist": {
        label: "Closed fist",
        emoji: "✊"
    },
    "Open_Palm": {
        label: "Open palm",
        emoji: "✋"
    }
}

// Types: 
// const GESTURE_DATA: {
//     Unknown: GestureObj;
//     Closed_Fist: GestureObj;
//     Open_Palm: GestureObj;
// }
```   

## `extends`

### 1. To extends a types / class.

```ts
interface Person {
    age: number;
    occupation: string;
}

interface Author extends Person {
    firstName: string;
    lastName: string;
}
```

### 2. Special usage of accept all but not `null` and `undefined`.  

```ts
function funcB<T extends {}>() { }
```

## `Record`
Create a set of `key` and `values` pair type object.

```ts
interface EmployeeType {
    id: number
    fullname: string
    role: string
}

// Record<number, EmployeeType>
let employees: Record<number, EmployeeType> = {
    0: { id: 1, fullname: "John Doe", role: "Designer" },
    1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
    2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
}
```

```ts
type CatNames = "miffy" | "boris" | "mordred";
type CatList = Record<CatNames, {age: number}>

const cats: CatList = {
    miffy: { age:99 },
    boris: { age:16 },
    mordred: { age:600 }
}
```