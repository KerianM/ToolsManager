# System Info API Documentation

## Get System Info

Retrieves the system information including website customization settings.

```http
GET /api/system-info
```

### Response

```json
{
  "title": "string",
  "announcement": "string",
  "website_title": "string",
  "logo_url": "string",
  "background_url": "string"
}
```

| Field | Type | Description |
|-------|------|-------------|
| title | string | System title |
| announcement | string | System announcement message |
| website_title | string | Website display title |
| logo_url | string | URL for website logo image |
| background_url | string | URL for website background image |

### Example Response

```json
{
  "title": "Card Management System",
  "announcement": "Welcome to our card system!",
  "website_title": "卡片管理系统",
  "logo_url": "https://example.com/logo.png",
  "background_url": "https://example.com/bg.jpg"
}
```

## Update System Info

Updates the system information. Requires admin authentication.

```http
PUT /api/system-info
Authorization: Bearer <token>
```

### Request Body

```json
{
  "title": "string",
  "announcement": "string",
  "website_title": "string",
  "logo_url": "string",
  "background_url": "string"
}
```

All fields are optional. Only provided fields will be updated.

### Validation Rules

- `title`: Non-empty string if provided
- `announcement`: Optional string
- `website_title`: Non-empty string if provided
- `logo_url`: Valid URL string if provided
- `background_url`: Valid URL string if provided

### Example Request

```json
{
  "title": "Updated System Title",
  "website_title": "新卡片系统",
  "logo_url": "https://example.com/new-logo.png"
}
```

### Success Response

```json
{
  "message": "System info updated successfully"
}
```

### Error Responses

```json
// 401 Unauthorized
{
  "error": "Please authenticate"
}

// 403 Forbidden
{
  "error": "Admin access required"
}

// 400 Bad Request
{
  "error": "Title is required and must not be empty"
}
```