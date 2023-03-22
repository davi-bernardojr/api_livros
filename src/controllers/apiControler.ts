import { unlink } from 'fs/promises'
import { Request, Response} from 'express'
import { Sequelize } from 'sequelize'
import sharp from 'sharp'
import { Phrase } from '../models/Phrases'

export const ping = (req : Request, res : Response) => {
    res.json({pong : true})
}

export const random = (req : Request, res : Response) => {
    let nRand : number = Math.floor(Math.random() * 10)
    res.json({numero : nRand})
}

export const name = (req : Request, res : Response) => {
    let nome : string = req.params.nome
    res.json({nome})
}

export const createFrase = async (req : Request, res : Response) => {
    let data = {
        txt : req.body.txt,
        author : (req.body.author === '' ? 'Desconhecido' : req.body.author)
    }
    let frase = await Phrase.create(data)
    res.status(201)
    res.json(frase)
}

export const getFrases = async (req : Request, res : Response) => {
    let frases = await Phrase.findAll({})
    res.json({list : frases})
}

export const getFrase = async (req : Request, res : Response) => {
    let { id } = req.params
    let frase = await Phrase.findByPk(id)
    res.json(frase ? {frase} : {erro : 'Frase não encontrada.'})
}

export const updateFrase = async (req : Request, res : Response) => {
    let { id } = req.params
    let { author, txt } = req.body
    let frase = await Phrase.findByPk(id)
    if ( frase ) {
        frase.txt = txt
        frase.author = author
        await frase.save()
        res.json({frase}) 
    } else {
        res.json({erro : 'Frase não encontrada.'})
    }    
}

export const deleteFrase = async (req : Request, res : Response) => {
    let { id } = req.params
    let frase = await Phrase.findByPk(id)
    if ( frase ) {
        await frase.destroy()
        res.json({sucesso : 'Registro apagado com sucesso.'}) 
    } else {
        res.json({erro : 'Frase não encontrada.'})
    }    
}

export const getFrasesAleatorio = async (req : Request, res : Response) => {
    let frases = await Phrase.findOne({
        order : [
            Sequelize.fn('RANDOM')
        ]
    })
    res.json({list : frases})
}

export const uploadFile = async (req : Request, res : Response) => {
    // let files = req.files as { [fileldname : string ] : Express.Multer.File[]}
    // res.json( { 
    //     avatar : files.avatar,
    //     gallery : files.gallery 
    // } )
    if (req.file){
        const arquivo = req.file.filename

        await sharp(req.file.path)
            .resize(800, 600)
            .toFormat(`jpeg`)
            .toFile(`./public/media/${arquivo}.jpg`)
        res.json({ image : `${arquivo}`})
        await unlink(req.file.path)
    } else {
        res.status(400)
        res.json({ error : 'Arquivo não encontrado.'})
        
    }
    
}
