

def tail(i, n):
    lst = []
    it = iter(i)
    for x in range(n):
        lst.append(next(it))
    try:
        while (True):
            lst.append(next(it))
            lst.pop(0)
    except StopIteration:
        return lst

import itertools
def tailrec(i, n):
    def trav(left, right):
        try:
            next(left)
            next(right)
            return trav(left,right)
        except StopIteration:
            return right
    l,r = itertools.tee(i)
    for x in range(n):
        next(l)    
    return list(trav(l,r))

def isPrime(i):
    primes = {2,3}
    if (i in primes):
        return True
    else:
        import math
        sqrt = int(math.sqrt(i) // 1)
        if (i % 2 == 0 or i % 3 == 0):  # special since we go 3-> sqrt
            return False
        for s in range(3,sqrt,2):  # check odd vals, or all prior primes + new primes
            if (i % s == 0):
                return False
        return True

print (tailrec([1,2,3],2))
print (tailrec((x**2 for x in range(10)),3))

print (tail([1,2,3],2))
print (tail((x**2 for x in range(10)),3)) 

print (f'num {9} is prime? {isPrime(9)}')

for i in range(100):
    print (f'num {i} is prime? {isPrime(i)}')
