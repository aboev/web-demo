#!/bin/sh

until cd /usr/src/app/
do
    echo "Waiting for server volume..."
done

if [ "$DATABASE" = "postgres" ]
then
    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      echo "Waiting for db to be ready..."
      sleep 0.1
    done
fi

python manage.py migrate

./manage.py collectstatic --noinput
./manage.py loaddata fixtures/students.json --app students

nohup python manage.py worker & python manage.py runserver 0.0.0.0:8000

#####################################################################################
# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# run gunicorn with debug log level
# gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# run development server
# DEBUG=True ./manage.py runserver 0.0.0.0:8000
