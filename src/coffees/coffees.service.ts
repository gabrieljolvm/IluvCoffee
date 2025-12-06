import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: '1',
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: '2',
      name: "Captain's Blend",
      brand: 'Black Rifle',
      flavors: ['chocolate', 'caramel'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: Omit<Coffee, 'id'>) {
    this.coffees.push({
      id: String(this.coffees.length + 1),
      ...createCoffeeDto,
    });
    return createCoffeeDto;
  }

  update(id: string, updateData: Partial<Coffee>) {
    const coffee = this.findOne(id);
    // if (coffee) {
    // Object.assign(coffee, updateData);
    // }
    return coffee;
  }

  remove(id: string) {
    const index = this.coffees.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.coffees.splice(index, 1);
      return true;
    }
    return false;
  }
}
