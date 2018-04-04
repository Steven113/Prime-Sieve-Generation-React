# React.js Powered Sieve of Eratosthenes

This code provides the basis of a visualisation of the (basic) Sieve of Eratosthenes algorithm.

The current version of the visualization is deployed to https://steven113.github.io/Prime-Sieve-Generation-React/

Disclaimer: My CSS skills are not amazing

# Sieve of Eratosthenes Algorithm
This algorithm generates all primes between 2 and N. To do this, a array of booleans is generated. We set array[n] = true (true -> array[n] is prime). For all elements in the array, if an element E is prime we mark all multiples of that number as false (not prime - obviously a multiple of a prime has a factor if the multiple > 1) and add E to the list of primes found.

Due to the spacing of prime numbers, the algorithm complexity of the sieve is O(n log(log(n))).

In this specific implementation, all numbers that are even and greater than 2 are marked as non-prime from the start.

# Features:
1. Visualisation of algorithm using React.js
2. Ability to increase/decrease speed of visualization
3. Ability to increase/decrease N (for which we find primes between 2 and N)
4. Ability to enter a specific value of N

# Performance and Optimisations
The set of integers 2 ... N are split into rows of 15 numbers. For each row the hash of the row is stored (note that this takes more space than the numbers in this case but I tried to make the table generalized for any data type as a challenge). A row is only updated when the items of that row changes (because the hash changes).

This algorithm will work fine for ~10 000 primes. I have not implemented incremental generation of the React components in the prime table so the initialization of thousands of primes may freeze the page momentarily.
