---
title: "[Python] Annotations to typescript developers"
published: 2024-04-09
description: 'Quick guild for python annotations check list'
tags: [Python, Typescript, Annotations]
category: Python
draft: false
---

# [Basic] Python Annotations 

Quite guild to python annotations check list.

## Common types

### Basic
```python
# Numbers
int_num: int = 68
float_num: float = 32.2
double_num: double = 320.233

# String
name: str = "Peter"
by: bytes = b"test"
is_ok: bool = False
```

### Special 
```python
# List
num_list: list = []
num_list_specific: list[int] = [1,2,3] ## Python 3.9

# Special
mytuple: tuple = ("apple", "banana", "cherry")
mytuple_specific: tuple[int, str, str] = (1, "banana", "cherry") # Python 3.9+

mySet: set[int] = {6, 7} ## Python 3.9
myDict: dict[str, int] = { "age" : 30 }

whatever: Any = False
```

:::tip

For Python 3.8 and earlier, you may use the `typing` collection 
```python
from typing import List, Set, Dict, Tuple
```

:::

### Functions 
```python
def add(a: int, b: int) -> int:
    return a + b

def addVoid(a: int, b: int) -> None:
    print( a + b )

from typing import Iterator # Python < 3.10+ in case

def gen(n: int) -> Iterator[int]:
    i = 0
    while i < n:
        yield i
        i += 1
```

## Special type method

### `Literal` types
The `Literal` is used to define your own output types like `enum`

```python
def isBigger(a: int, b: int) -> Literal["yes", "no"]:
    return "yes" if a > b else "no"
```

:::tip

For Python 3.8 and earlier, you may use `typing` collection 
```python
from typing import Literal
```

:::

### `type` types
The `type` is used to define your own type for later used.

```python
# Define a type
type Point = tuple[float, float]

myPoint: Point = (1.1, 4.7)

def makePoint(a: float, b: float) -> Point:
    return (a, b)
```

### `Union` types
The `Union` is used to define mixed type.

```python
from typing import Union # Python < 3.10+ in case

# Python 3.10+
mix_list: list[str | bool] = ["omg", True, "ok"] 

mix_list_union: list[Union[str | bool]] = ["gg", True, "ok"]
```

### `Optional` types
The `Optional` is used to define optional params in functions.

```python
from typing import Optional # Python < 3.10+ in case

def isBigger(a: Optional[str] = None) -> None:
    print(a)

# Other usage beside Optional
def isBigger(a:  str | None = None) -> None:
    print(a)
```


