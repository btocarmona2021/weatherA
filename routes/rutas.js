import express from "express";
import {obtenerClima} from "../controller/climaController.js";

export const router = express.Router();

router.get('/clima',obtenerClima);
