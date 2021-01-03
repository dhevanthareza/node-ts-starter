import { Router } from "express";
import { BarangRouter } from "./barang.router";

const MasterDataRouter = Router()
MasterDataRouter.use('/barang', BarangRouter)

export { MasterDataRouter };

