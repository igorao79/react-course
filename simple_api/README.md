# Restaurant API

Простое REST API для управления ресторанами, блюдами и отзывами.

## Запуск

1. Установите зависимости:
```bash
npm install
```

2. Запустите сервер:
```bash
npm start
```

Или для разработки с автоперезапуском:
```bash
npm run dev
```

Сервер запустится на порту 3001: http://localhost:3001

## API Endpoints

### Рестораны

- **GET /api/restaurants** - Получить все рестораны
- **GET /api/restaurant/:restaurantId** - Получить ресторан по ID

### Блюда

- **GET /api/dishes?restaurantId=:restaurantId** - Получить блюда ресторана
- **GET /api/dish/:dishId** - Получить блюдо по ID

### Отзывы

- **GET /api/reviews?restaurantId=:restaurantId** - Получить отзывы ресторана
- **POST /api/review/:restaurantId** - Создать отзыв
- **PATCH /api/review/:reviewId** - Изменить отзыв

### Пользователи

- **GET /api/users** - Получить всех пользователей

## Примеры использования

### Получить все рестораны
```bash
curl http://localhost:3001/api/restaurants
```

### Получить блюда ресторана
```bash
curl "http://localhost:3001/api/dishes?restaurantId=a757a0e9-03c1-4a2a-b384-8ac21dbe2fb2"
```

### Создать отзыв
```bash
curl -X POST http://localhost:3001/api/review/a757a0e9-03c1-4a2a-b384-8ac21dbe2fb2 \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "a304959a-76c0-4b34-954a-b38dbf310360",
    "text": "Отличное место!",
    "rating": 5
  }'
```

### Изменить отзыв
```bash
curl -X PATCH http://localhost:3001/api/review/5909796d-5030-4e36-adec-68b8f9ec2d96 \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Обновленный отзыв",
    "rating": 4
  }'
```

## Структура данных

### Ресторан
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "img": "string",
  "menu": ["dishId1", "dishId2"],
  "reviews": ["reviewId1", "reviewId2"]
}
```

### Блюдо
```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "ingredients": ["ingredient1", "ingredient2"]
}
```

### Отзыв
```json
{
  "id": "string",
  "userId": "string",
  "text": "string",
  "rating": "number",
  "userName": "string"
}
```

### Пользователь
```json
{
  "id": "string",
  "name": "string"
}
``` 