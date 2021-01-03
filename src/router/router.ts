import { Router } from 'express';
import { MasterDataRouter } from './masterData/masterData.router';

const RootRouter = Router();
RootRouter.use('/master-data', MasterDataRouter);

export { RootRouter };

