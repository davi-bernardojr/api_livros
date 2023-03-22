import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/pg'

export interface phraseInstace extends Model{
    id : number,
    txt : string,
    author : string
}

export const Phrase = sequelize.define<phraseInstace>('Phrase', {
    id : {
        primaryKey : true,
        autoIncrement : true,
        type : DataTypes.INTEGER
    },
    txt : {
        type : DataTypes.STRING
    },
    author : {
        type : DataTypes.STRING,
        defaultValue : 'Desconhecido'
    }
}, {
    tableName : 'phrases',
    timestamps : false
})