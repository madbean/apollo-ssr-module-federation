docker run -p 3000:3000 \
  --mount type=bind,source="$(pwd)"/dashboard-data,target=/data \
  -t scriptedalchemy/mf-dashboard:latest