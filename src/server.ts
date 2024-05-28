import app from "./app";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Auth server is running on port ${port}`);
});
