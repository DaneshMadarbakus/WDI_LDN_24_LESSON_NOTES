## Response Codes

> HTTP response codes standardize a way of informing the client about the result of its request.

When you make a HTTP request, the server will respond by returning the most appropriate HTTP response code; this way, the client can attempt to repair its errors, assuming there are any. 

Most people are familiar with the common `404 Not Found` response code, however, there are a lot more available to fit a wide variety of situations.

Keep in mind that the meaning of a HTTP response code is not extremely precise; this is a consequence of HTTP itself being rather generic.

Here are some HTTP response codes, which are often used with REST:

### 200 OK

This response code indicates that the request was successful.

### 201 Created

This indicates the request was successful and a resource was created. It is used to confirm success of a `PUT` or `POST` request.

### 400 Bad Request

The request was malformed. This happens especially with `POST` and `PUT` requests, when the data does not pass validation, or is in the wrong format.

### 404 Not Found

This response indicates that the required resource could not be found. This is generally returned to all requests which point to a URL with no corresponding resource.

### 401 Unauthorized

This error indicates that you need to perform authentication before accessing the resource.

### 405 Method Not Allowed

The HTTP method used is not supported for this resource.

### 409 Conflict

This indicates a conflict. For instance, you are using a `PUT` request to create the same resource twice.

### 500 Internal Server Error

When all else fails; generally, a 500 response is used when processing fails due to unanticipated circumstances on the server side, which causes the server to error out.

<br>