# Card API Testing Examples

## Prerequisites
1. Start the server: `npm run dev`
2. Use Postman to run the tests
3. Import the provided Postman collection

## Test Flow

### 1. Authentication
First, get an authentication token:

```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
    "username": "admin",
    "password": "admin"
}
```

Save the returned token in the `authToken` variable.

### 2. Create a Card

```http
POST {{baseUrl}}/api/cards
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
    "name": "Example Card",
    "description": "This is an example card",
    "category_id": 1,
    "download_url": "https://example.com/card.zip",
    "preview_url": "https://example.com/preview.jpg",
    "markdown_content": "# Example Card\n\nThis is an example card description."
}
```

Expected response (201 Created):
```json
{
    "id": 1
}
```

### 3. Get All Cards

```http
GET {{baseUrl}}/api/cards
Authorization: Bearer {{authToken}}
```

Expected response (200 OK):
```json
[
    {
        "id": 1,
        "name": "Example Card",
        "description": "This is an example card",
        "category_id": 1,
        "creator_name": "admin",
        "status": 1,
        "download_url": "https://example.com/card.zip",
        "preview_url": "https://example.com/preview.jpg",
        "markdown_content": "# Example Card\n\nThis is an example card description.",
        "category_name": "Example Category"
    }
]
```

### 4. Get Card by ID

```http
GET {{baseUrl}}/api/cards/1
Authorization: Bearer {{authToken}}
```

Expected response (200 OK):
```json
{
    "id": 1,
    "name": "Example Card",
    "description": "This is an example card",
    "category_id": 1,
    "creator_name": "admin",
    "status": 1,
    "download_url": "https://example.com/card.zip",
    "preview_url": "https://example.com/preview.jpg",
    "markdown_content": "# Example Card\n\nThis is an example card description.",
    "category_name": "Example Category"
}
```

### 5. Update Card

```http
PUT {{baseUrl}}/api/cards/1
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
    "name": "Updated Card",
    "description": "This card has been updated",
    "status": 2
}
```

Expected response (200 OK):
```json
{
    "message": "Card updated successfully"
}
```

### 6. Delete Card

```http
DELETE {{baseUrl}}/api/cards/1
Authorization: Bearer {{authToken}}
```

Expected response (200 OK):
```json
{
    "message": "Card deleted successfully"
}
```

## Error Cases

### 1. Invalid Authentication
```http
GET {{baseUrl}}/api/cards
Authorization: Bearer invalid_token
```

Expected response (401 Unauthorized):
```json
{
    "error": "Please authenticate"
}
```

### 2. Invalid Card Creation
```http
POST {{baseUrl}}/api/cards
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
    "name": "",
    "category_id": "invalid"
}
```

Expected response (400 Bad Request):
```json
{
    "error": "Card name must be at least 2 characters long"
}
```

### 3. Card Not Found
```http
GET {{baseUrl}}/api/cards/999
Authorization: Bearer {{authToken}}
```

Expected response (404 Not Found):
```json
{
    "error": "Card not found"
}
```