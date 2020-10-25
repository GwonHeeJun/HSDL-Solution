import Router from 'koa-router';
import { BusDetail, BusList, DetectiveNonMask, SubwayDetail, SubwayList } from './ctrl';

const api = new Router;

api.get('/all/bus', BusList);
api.get('/all/subway', SubwayList);

api.get('/bus/:id', BusDetail);
api.get('/subway/:id', SubwayDetail);

api.post('/detecitve', DetectiveNonMask);

export default api;