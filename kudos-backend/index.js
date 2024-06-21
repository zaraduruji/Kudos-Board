const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors());


app.get('/boards', async (req, res) => {
    console.log("getting boards")
    const boards = await prisma.kudoBoard.findMany()
    res.status(200).json(boards);
});

app.post('/boards', async (req, res) => {
    const { title, category, author, imgUrl} = req.body;
    console.log(req.body);
    const newBoard = await prisma.kudoBoard.create({
      data: {
        title,
        category,
        author,
        imgUrl
      }
    })
    res.status(201).json(newBoard);
});

// to Delete boards from the database
app.delete('/boards/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBoard = await prisma.kudoBoard.delete({
        where: { id: parseInt(id) }
      });
      res.status(200).json(deletedBoard);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

app.get('/boards/:id', async (req, res) => {
    const { id } = req.params
    const boards = await prisma.kudoBoard.findUnique(
        {
            where: { id: parseInt(id) },
        });
    res.status(200).json(boards);
});

// app.delete('/boards/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//       const deletedBoard = await prisma.kudoBoard.delete({
//         where: { id: parseInt(id) },
//       });
//       res.status(204).send();
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error deleting board' });
//     }
//   });

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
  });
