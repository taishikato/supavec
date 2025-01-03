# Welcome to the API documentation for the PDF and Text File Embeddings API :)

We're working on:
- a more comprehensive API documentation, but for now, here's a simple guide to our API endpoints
- building more endpoints to support more data sources and manipulations

Please generate your API Key on [the dashboard page](https://www.supavec.com/login).

Please check our backlog to see what we're working on: https://github.com/users/taishikato/projects/2/views/1

## Endpoints

### `https://api.supavec.com/upload_file`

Upload a PDF or text file to generate embeddings.

```typescript
const formData = new FormData();
formData.append("file", files[0]); // Accepts PDF (.pdf) or text (.txt) files

const response = await fetch("https://api.supavec.com/upload_file", {
  method: "POST",
  headers: {
    authorization: apiKey,
  },
  body: formData,
});
```

### `https://api.supavec.com/upload_text`

Upload a text content to generate embeddings.

```typescript
const res = await fetch("https://api.supavec.com/upload_text", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: apiKey,
  },
  body: JSON.stringify({ name, contents }),
});
```

### `https://api.supavec.com/embeddings`

Search for embeddings relevant to a query in a list of uploaded files.

```typescript
const res = await fetch("https://api.supavec.com/embeddings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: apiKey,
  },
  body: JSON.stringify({ query, file_ids: [selectedFileId] }),
});
```

### `https://api.supavec.com/user_files`

Get a list of files uploaded by the user.

```typescript
const res = await fetch("https://api.supavec.com/user_files", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: apiKey,
  },
  body: JSON.stringify({ pagination, order_dir }),
});
```
