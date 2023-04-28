const express = require('express');
const router = express.Router();
import LibTodo from '../lib/LibTodo';

/*****************************
Task -index
******************************/
router.get('/index', async function(req: any, res: any) {
  try {
    const items = await LibTodo.getItems();
//console.log(items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/******************************** 
*  todos Show
*********************************/
router.get('/show/:id', async function(req: any, res: any) {
  try {
    console.log(req.params.id  );
    const result = await LibTodo.getItem(Number(req.params.id));
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
add
******************************/
router.post('/create', async function(req: any, res: any) {
  try {
    const result = await LibTodo.create(req);
console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/*****************************

******************************/
router.post('/search', async function(req: any, res: any) {
  try {
console.log(req.body.search_key);
    const result = await LibTodo.search(req.body.search_key);
console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/*****************************
Task - update
******************************/
router.post('/update', async function(req: any, res: any) {
  try {
    const result = await LibTodo.update(req);
console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/*****************************
delete
******************************/
router.post('/delete', async function(req: any, res: any) {
  try {
    const result = await LibTodo.delete(req);
console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;