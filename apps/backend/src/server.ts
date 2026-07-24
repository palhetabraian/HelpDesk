import { app } from "./app";

//porta que vai rodar o backend
const PORT = 3333;

//inicia o servidor
app.listen(PORT, () => {
  console.log(`HelpDesk API is running on port ${PORT}`);
});