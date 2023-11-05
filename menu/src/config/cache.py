import os
from functools import wraps


def config_cache(func):
    cache = {}

    @wraps(func)
    def wrapper(*args, **kwargs):
        config = os.environ.get("CONFIGURATION", "Develop")
        cache_key = (func, config)

        if cache_key not in cache:
            cache[cache_key] = func(*args, **kwargs)

        return cache[cache_key]

    return wrapper
