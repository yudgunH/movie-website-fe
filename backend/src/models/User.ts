import { Model, Table, Column, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: "Users", timestamps: true, underscored: true })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  full_name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.ENUM("user", "admin"), allowNull: false, defaultValue: "user" })
  role!: "user" | "admin";

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_at!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updated_at!: Date;
}
