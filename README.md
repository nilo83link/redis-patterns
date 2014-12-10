redis-patterns
==============

A simple Node.js web interface. Allow developers to inspect Redis keys without remember key patterns. 

![screenshot](https://github.com/nilo83link/redis-patterns/blob/master/public/images/screenshot-redis-patterns.png)

![example](https://github.com/nilo83link/redis-patterns/blob/master/public/images/example-redis-patterns.png)


Configuration
=============

Supported key command:
- HGETALL
- GET
- LRANGE

```json
{
    "host": "localhost",
    "port": 6379,
    "patterns": [
        {
            "name": "First key",
            "description": "Return user data",
            "key": "user:{0}",
            "type": "HGETALL",
            "redisDb": 16,
            "variables": [
                "UserID"
            ]
        },
        {
            "name": "Second key",
            "description": "Return siteGUID by site name",
            "key": "site:{0}",
            "type": "GET",
            "redisDb": 16,
            "variables": [
                "SiteName"
            ]
        },
        {
            "name": "Third key",
            "description": "Return site's users",
            "key": "site:{0}:users",
            "type": "LRANGE",
            "redisDb": 16,
            "variables": [
                "SiteGUID"
            ]
        }
    ]
}
```
