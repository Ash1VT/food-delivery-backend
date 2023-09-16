import os

import uvicorn

if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    uvicorn.run(app="setup.app:app", port=8002, reload=True)
