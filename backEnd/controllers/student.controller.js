import { getAll, create } from "../models/students.model.js";
import {randomUUID} from "crypto"

export const getStudent = async (req, res) => {
    try{
        const data = await getAll()
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({message: "compadre, hay un error en el codigo, el cual es ", err: error})
    }
}

export const createStudent = async (req, res) => {
    try{
        const newStudent = {
            id: randomUUID(),
            ...req.body
        };

        await create(newStudent);
        res.status(201).json({message: "estudiante creado"})
    }catch(error){
        res.status(500).json({message: "error al crear", err: error })
    }
}