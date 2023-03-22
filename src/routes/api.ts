import { Router } from 'express'
import multer from 'multer'
import * as apiController from '../controllers/apiControler'

const hashName = () => {
    let data = new Date()
    let dt = data.getHours().toString().length == 1 ? '0'+data.getHours().toString() : data.getHours().toString()
    dt += data.getMinutes().toString().length == 1 ? '0'+data.getMinutes().toString() : data.getMinutes().toString()
    dt += data.getSeconds().toString().length == 1 ? '0'+data.getSeconds().toString() : data.getSeconds().toString()
    dt += data.getDate().toString().length == 1 ? '0'+data.getDate().toString() : data.getDate().toString()
    dt += (data.getMonth() + 1).toString().length == 1 ? '0'+(data.getMonth() + 1).toString() : (data.getMonth() + 1).toString()
    dt += data.getFullYear().toString().length == 1 ? '0'+data.getFullYear().toString() : data.getFullYear().toString()
    dt += data.getMilliseconds().toString().length == 1 ? '0'+data.getMilliseconds().toString() : data.getMilliseconds().toString()
    return dt
}

const storageConfig = multer.diskStorage({
    destination : ( req, file, cb ) => {
        cb(null, './tmp')
    },
    filename : ( req, file, cb ) => {
        cb(null, `${hashName()}.jpg`)
    }
})

const upload = multer({ 
    storage : storageConfig,
    fileFilter : ( req, file, cb ) => {
        const allwoed = ['image/jpg', 'image/jpeg', 'image/png']
        cb(null, allwoed.includes( file.mimetype ))
    },
    limits : {
        fileSize : 1048576
    }
})

const router = Router()

router.get('/ping', apiController.ping)
router.get('/random', apiController.random)
router.get('/nome/:nome', apiController.name)

router.post('/frases', apiController.createFrase)

router.get('/frases', apiController.getFrases)
router.get('/frases/aleatoria', apiController.getFrasesAleatorio)
router.get('/frases/:id', apiController.getFrase)

router.put('/frases/:id', apiController.updateFrase)

router.delete('/frases/:id', apiController.deleteFrase)

router.post('/upload', upload.single('avatar'), apiController.uploadFile)

export default router