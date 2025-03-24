import { Model } from "sequelize-typescript";
import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    name?: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;
}