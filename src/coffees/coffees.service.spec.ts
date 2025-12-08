/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository, ObjectLiteral } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { NotFoundException } from '@nestjs/common';

type MockedRepository<T extends ObjectLiteral> = {
  [K in keyof Repository<T>]: jest.MockedFunction<any>;
};

const createMockRepository = <T extends ObjectLiteral>(): MockedRepository<T> =>
  ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  }) as MockedRepository<T>;

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: {
    findOne: jest.MockedFunction<any>;
    create: jest.MockedFunction<any>;
    find: jest.MockedFunction<any>;
    save: jest.MockedFunction<any>;
    preload: jest.MockedFunction<any>;
    delete: jest.MockedFunction<any>;
  };
  let flavorRepository: {
    findOne: jest.MockedFunction<any>;
    create: jest.MockedFunction<any>;
    find: jest.MockedFunction<any>;
    save: jest.MockedFunction<any>;
    preload: jest.MockedFunction<any>;
    delete: jest.MockedFunction<any>;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository<Flavor>(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository<Coffee>(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get(getRepositoryToken(Coffee));
    flavorRepository = module.get(getRepositoryToken(Flavor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = { id: 1, name: 'Café Tradicional' };

        coffeeRepository.findOne.mockResolvedValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
      describe('when coffee with ID does not exist', () => {
        it('should throw the "NotFoundException"', async () => {
          const coffeeId = '1';
          coffeeRepository.findOne.mockReturnValue(undefined);

          try {
            await service.findOne(coffeeId);
            expect(false).toBeTruthy(); // we should never hit this line
          } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toEqual(`Coffee with ID ${coffeeId} not found`);
          }
        });
      });
    });
  });
});
