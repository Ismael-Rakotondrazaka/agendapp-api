import app from "./app";

const PORT: number | string = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});