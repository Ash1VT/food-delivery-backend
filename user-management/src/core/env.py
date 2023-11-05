from pathlib import Path
from environ import Env

# Env file path
env = Env()

configuration = env('DJANGO_CONFIGURATION')
ENV_DIRECTORY = Path(__file__).resolve().parent.parent.parent / 'env'

# Initialise environment variables
if configuration == 'Develop':
    Env.read_env(env_file=ENV_DIRECTORY / '.env.dev')
elif configuration == 'Test':
    Env.read_env(env_file=ENV_DIRECTORY / '.env.test')
