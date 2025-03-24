import { Model } from "sequelize-typescript";
import { AutoIncrement, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";


@Table({ tableName: 'holidays-calendar', timestamps: true })
export class HolidaysCalendar extends Model<HolidaysCalendar> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.INTEGER)
    userId?: number;

    @Column(DataType.STRING)
    countryCode?: string;

    @Column(DataType.INTEGER)
    year?: number;

    @Column(DataType.ARRAY(DataType.STRING))
    holidays?: string[];
}