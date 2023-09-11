run_cmd="cd django_project && python -u manage.py runserver  > ../log_server.log 2>&1"
run_cmd+="& cd django_project && python -u manage.py worker > ../log_worker.log 2>&1"
run_cmd+="& cd reactapp && node socket.js > ../log_socket.log 2>&1"
run_cmd+="& cd reactapp && npm run start > ../log_react.log 2>&1"
nohup sh -c "$run_cmd" &

