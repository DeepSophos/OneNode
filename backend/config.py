import os
import sys
import logging
from pathlib import Path


ENV = os.environ.get("ENV", "dev")

log_levels = ["CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"]
GLOBAL_LOG_LEVEL = os.environ.get("GLOBAL_LOG_LEVEL", "").upper()
if GLOBAL_LOG_LEVEL in log_levels:
    logging.basicConfig(stream=sys.stdout, level=GLOBAL_LOG_LEVEL, force=True)
else:
    GLOBAL_LOG_LEVEL = "INFO"

log = logging.getLogger(__name__)
log.info(f"GLOBAL_LOG_LEVEL: {GLOBAL_LOG_LEVEL}")
log.setLevel(f"{GLOBAL_LOG_LEVEL}")

log_sources = [
    "CONFIG",
    "DB",
    "MAIN",
    "MODELS",
    "OLLAMA",
    "RAG",
    "WEBHOOK",
    "AGENT",
    "BACKEND"
]

SRC_LOG_LEVELS = {}
for source in log_sources:
    log_env_var = source + "_LOG_LEVEL"
    SRC_LOG_LEVELS[source] = os.environ.get(log_env_var, "").upper()
    if SRC_LOG_LEVELS[source] not in log_levels:
        SRC_LOG_LEVELS[source] = GLOBAL_LOG_LEVEL
    log.info(f"{log_env_var}: {SRC_LOG_LEVELS[source]}")


IS_KB_PATH = os.environ.get("IS_KB_PATH", "/is_kb")
WEBUI_SECRET_KEY = "t0p-s3cr3t"
