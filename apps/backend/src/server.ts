import express from 'express';

//cria aplicacao backend
const app = express();
const PORT = 3333;

//permite que api receba json no corpo das requisicoes
app.use(express.json());

app.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'HelpDesk API is running',
  });
});

app.listen(PORT, () => {
  console.log(`HelpDesk API is running on port ${PORT}`);
});
