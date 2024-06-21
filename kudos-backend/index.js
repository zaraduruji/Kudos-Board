const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/boards', async (req, res) => {
  const boards = await prisma.kudoBoard.findMany();
  res.status(200).json(boards);
});

app.post('/boards', async (req, res) => {
  const { title, category, author, imgUrl } = req.body;
  const newBoard = await prisma.kudoBoard.create({
    data: { title, category, author, imgUrl },
  });
  res.status(201).json(newBoard);
});

app.delete('/boards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBoard = await prisma.kudoBoard.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedBoard);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/boards/:id', async (req, res) => {
  const { id } = req.params;
  const board = await prisma.kudoBoard.findUnique({
    where: { id: parseInt(id) },
    include: { card: true },
  });
  res.status(200).json(board);
});

app.get('/boards/:id/cards', async (req, res) => {
  const { id } = req.params;
  const cards = await prisma.kudoCard.findMany({
    where: { boardId: parseInt(id) },
  });
  res.status(200).json(cards);
});

app.post('/boards/:id/cards', async (req, res) => {
  const { id } = req.params;
  const { title, description, gifUrl, owner } = req.body;
  try {
    const newCard = await prisma.kudoCard.create({
      data: {
        title,
        description,
        gifUrl,
        authorId: owner ? parseInt(owner) : null,
        boardId: parseInt(id),
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating card' });
  }
});

app.put('/cards/:id/upvote', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCard = await prisma.kudoCard.update({
      where: { id: parseInt(id) },
      data: { upVote: { increment: 1 } },
    });
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: 'Error updating upvote' });
  }
});

app.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.kudoCard.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting card' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
