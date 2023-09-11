from students.models import Student
from django.core.management.base import BaseCommand
from django.conf import settings
from PIL import Image
from utils import connect
import io
import os
from io import BytesIO
import urllib.parse
import base64
import pika
import time
import json

class Command(BaseCommand):
    def handle(self, *args, **options):
        connection, channel = connect()
        print("I am DJANGO WORKER and I am Waiting for messages. To exit press CTRL+C")
        channel.basic_consume(queue='to_resize', auto_ack=True,\
                on_message_callback=self.callback)
        channel.start_consuming()

    @staticmethod
    def callback(ch, method, properties, body):
        try:
            print("Processing image 'to_resize'")
            msg = json.loads(body.decode("UTF-8"))
            filepath = os.path.join(settings.MEDIA_ROOT, 'photo/', msg["filename"])
            fixed_height = 300
            image = Image.open(BytesIO(base64.b64decode(msg["image"])))
            height_percent = (fixed_height / float(image.size[1]))
            width_size = int((float(image.size[0]) * float(height_percent)))
            new = image.resize((width_size, fixed_height))
            image.save(filepath)
            student = Student.objects.get(pk=msg["pk"])
            student.photo = settings.MEDIA_URL + "photo/" + msg["filename"]
            student.save(update_fields=['photo'])
            socket_msg = {"type": "refresh"}
            ch.basic_publish(exchange='', routing_key='to_socket',\
                    body=bytes(json.dumps(socket_msg), "UTF-8"))
            print("Processing image 'to_resize' complete")
        except Exception as error:
            print(error)
