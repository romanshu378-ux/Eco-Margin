# EcoMargin API Documentation

## Base URL
- **Development:** `http://localhost:5000/api/v1`
- **Production:**  `https://api.ecomargin.com/api/v1`

## Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Endpoints Overview

### Auth
| Method | Endpoint                    | Auth | Description                |
|--------|-----------------------------|------|----------------------------|
| POST   | `/auth/register`            | ❌    | Register new user          |
| POST   | `/auth/login`               | ❌    | Login                      |
| POST   | `/auth/logout`              | ✅    | Logout                     |
| POST   | `/auth/refresh`             | ❌    | Refresh access token       |
| POST   | `/auth/forgot-password`     | ❌    | Send password reset email  |
| POST   | `/auth/reset-password`      | ❌    | Reset password with token  |
| GET    | `/auth/verify-email/:token` | ❌    | Verify email address       |
| GET    | `/auth/me`                  | ✅    | Get current user           |

### Stations
| Method | Endpoint                     | Auth | Description                |
|--------|------------------------------|------|----------------------------|
| GET    | `/stations`                  | ❌    | List all stations          |
| GET    | `/stations/nearby`           | ❌    | Stations near coordinates  |
| GET    | `/stations/search`           | ❌    | Search stations            |
| GET    | `/stations/:id`              | ❌    | Station detail             |
| GET    | `/stations/:id/reviews`      | ❌    | Station reviews            |
| POST   | `/stations`                  | ✅👑  | Create station (admin/op)  |
| PUT    | `/stations/:id`              | ✅👑  | Update station             |
| DELETE | `/stations/:id`              | ✅👑  | Delete station             |

### Bookings
| Method | Endpoint                     | Auth | Description                |
|--------|------------------------------|------|----------------------------|
| GET    | `/bookings/my-bookings`      | ✅    | My bookings                |
| GET    | `/bookings`                  | ✅👑  | All bookings (admin)       |
| GET    | `/bookings/:id`              | ✅    | Booking detail             |
| POST   | `/bookings`                  | ✅    | Create booking             |
| PATCH  | `/bookings/:id/cancel`       | ✅    | Cancel booking             |

### Payments
| Method | Endpoint                     | Auth | Description                |
|--------|------------------------------|------|----------------------------|
| POST   | `/payments/create-order`     | ✅    | Create payment order       |
| POST   | `/payments/verify`           | ✅    | Verify payment             |
| GET    | `/payments/history`          | ✅    | Payment history            |
| GET    | `/payments/:id/invoice`      | ✅    | Download invoice           |
| POST   | `/payments/:id/refund`       | ✅    | Request refund             |

### Users
| Method | Endpoint                     | Auth | Description                |
|--------|------------------------------|------|----------------------------|
| GET    | `/users/profile`             | ✅    | Get profile                |
| PUT    | `/users/profile`             | ✅    | Update profile             |
| PATCH  | `/users/change-password`     | ✅    | Change password            |
| DELETE | `/users/account`             | ✅    | Delete account             |

---

## Response Format
```json
{
  "success": true,
  "message": "Success",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Error Format
```json
{
  "success": false,
  "message": "Error description"
}
```

## HTTP Status Codes
| Code | Meaning               |
|------|-----------------------|
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

✅ = Authenticated | 👑 = Admin/Operator only
