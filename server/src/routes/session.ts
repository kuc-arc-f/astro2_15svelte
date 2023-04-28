const express = require('express');
const router = express.Router();
import LibSession from '../lib/LibSession';

/**
 *
 * @param req : any
 * @return
 *
 * @throws
 */ 
router.post('/get', async function(req: any, res: any) {
  try {
//console.log(req.body);
    const result = await LibSession.getItem(req);
console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/**
 *
 * @param req : any
 * @return
 *
 * @throws
 */ 
router.post('/create', async function(req: any, res: any) {
  try {
    const result = await LibSession.create(req);
console.log(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 *
 * @param req : any
 * @return
 *
 * @throws
 */ 
router.post('/delete', async function(req: any, res: any) {
  try {
    const result = await LibSession.delete(req);
console.log(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;