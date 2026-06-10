import express from 'express'
import { getbyFromTo,postdata,getdetails,postesp32,post_loca } from '../Controllers/Busdetails.js';

const router =  express.Router();

router.post('/',postdata)
router.post('/personcount',postesp32)
router.post('/location',post_loca)

router.get('/:busnumber',getdetails)
router.get('/:from/:to',getbyFromTo)

export default router;
