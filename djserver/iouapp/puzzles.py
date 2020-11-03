

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


def mymemoize(f):
    memo = {}
    def helper(x):
#        print(f'calling helper on {x}')
        if x not in memo:            
            memo[x] = f(x)
        return memo[x]
    return helper
    

@mymemoize
def isPrime(i):
    primes = {2,3}
    if (i in primes):
        return True
    else:
        if (i % 2 == 0 or i % 3 == 0):  # special since we go 3-> sqrt
            return False
        import math
        sqrt = int(math.sqrt(i) // 1)
        for s in range(3,sqrt+1,2):  # check odd vals, or all prior primes + new primes
            if (i % s == 0):
                return False
#       primes.add(i)
        return True

# not too efficient, should memoize or cache the prime{} set in isPrime()
def nextPrime(i):
    if isPrime(i):
        return i
    else:
        return nextPrime(i+1)

def factorize(i):
    if (i == 0):
        return []
    elif (isPrime(i)):
        return [i]
    else:
        d = 2
        while (i % d != 0):
            d = nextPrime(d+1)
        rem = i // d
        return factorize(d)+factorize(rem)

for i in range(1,50):
    print(f'factorize {i} -> {factorize(i)}')

print(isPrime(25))
# print (tailrec([1,2,3],2))
# print (tailrec((x**2 for x in range(10)),3))

# print (tail([1,2,3],2))
# print (tail((x**2 for x in range(10)),3)) 

# print (f'num {9} is prime? {isPrime(9)}')

# for i in range(90,100):
#     print (f'num {i} is prime? {isPrime(i)}')


# for i in range (90,100):
#     print(f'next prime of {i} is {nextPrime(i)}')

