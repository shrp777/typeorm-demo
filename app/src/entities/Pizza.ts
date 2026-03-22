import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity("pizzas")
export class Pizza {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => Category)
  category!: Category;
}
