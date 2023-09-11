from django.conf import settings
import pika
import time

def connect(queues = ["to_resize", "to_socket"], retry = True):
    connected = False
    while connected == False:
        try:
            credentials = pika.PlainCredentials(username=settings.RMQ_USER,
                password=settings.RMQ_PASS)
            parameters = pika.ConnectionParameters(host=settings.RMQ_HOST,
                port=settings.RMQ_PORT, credentials=credentials)
            connection = pika.BlockingConnection(parameters=parameters)
            channel = connection.channel()
            for queue in queues:
                channel.queue_declare(queue = queue)
            connected = True
            return connection, channel
        except:
            pass
        if retry == False: return None, None
        time.sleep(5)
