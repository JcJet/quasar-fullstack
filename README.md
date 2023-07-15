# quasar-fullstack
Требования: Docker.
Запуск в докере (рекомендуется как наиболее простой способ запуска):
```
sudo docker compose up --build -V
```
После завершения загрузки контейнеров, сайт доступен по адресу:
```
http://localhost:8080/
```
Срок жизни Access Token = 15s, для удобства проверки.

При необходимости запуска фронтенда и бекенда отдельно:

Бекенд:
```
cd backend
sudo docker compose up --build -V
```
Фронтенд (требуется node версии 20):
```
npm i
npm i -g @quasar/cli
quasar start
```

Бекенд реализован на микросервисной архитектуре с использованием брокера сообщений RabitMQ и СУБД PostgreSQL. Предусмотрена возможность запуска каждого микросервиса вне докера следующей коммандой: 
```
npm run start:dev
```
Однако, это подразумевает установку и настройку всего стека (RabbitMQ, базы данных PostgreSQL, Node.js, Nest.js), что, в данном случае, вероятно, будет излишним.
