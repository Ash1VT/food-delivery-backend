from pathlib import Path
from environ import Env

# Env file path
ENV_FILE = Path(__file__).resolve().parent.parent.parent / '.env'

# Initialise environment variables
env = Env()
Env.read_env(env_file=ENV_FILE)
