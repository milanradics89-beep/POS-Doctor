FROM python:3.12-slim@sha256:191083cdf6c7bda8c76158983163ead5d5cf7b77cf3033e805bb0f5296f51b4b

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    USEIT_ENV=production \
    PORT=8080

WORKDIR /app

COPY backend/requirements-runtime.lock /app/requirements.lock
RUN python -m pip install --no-cache-dir --require-hashes -r /app/requirements.lock

RUN groupadd --system --gid 10001 useit \
    && useradd --system --uid 10001 --gid useit --home-dir /app --no-create-home useit \
    && install -d --owner=10001 --group=10001 /app/data

COPY --chown=10001:10001 backend/ /app/backend/

USER 10001:10001

EXPOSE 8080

CMD ["sh", "-c", "exec uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8080} --no-access-log"]
