#!/bin/bash

redis-cli -h localhost -p 6379 hset user:1 name Danilo
redis-cli -h localhost -p 6379 hset user:1 surname Balocco
redis-cli -h localhost -p 6379 hset user:1 age 31
redis-cli -h localhost -p 6379 hset user:1 nickname Nilo
redis-cli -h localhost -p 6379 hset user:1 city Turin
