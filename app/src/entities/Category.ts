import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pizza } from "./Pizza";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Pizza, (pizza) => pizza.category)
  pizzas?: Pizza[];
}
