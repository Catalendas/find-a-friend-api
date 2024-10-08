import { Prisma, Pet } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public pets: Pet[] = []
    
    async fetch(user_id: string, description: string = '') {

    if (!user_id) {
        return this.pets
    }
    
    const pets = await this.pets.filter(({ user_id, pet_description }) => user_id === user_id 
        && pet_description?.toLowerCase().includes(description))

        return pets
    }
        
    async getPet(id: string) {
        const pet = await this.pets.find(({ pet_id }) => pet_id === id) 

        if (!pet) {
            return null
        }

        return pet
    }
    // async getPet(id: string) {
    //    
    // }
    
    async register(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            user_id: data.user_id,
            pet_id: randomUUID() ,
            pet_name: data.pet_name,
            pet_description: data.pet_description!,
            age: data.age,
            size: data.size,
            energy_level: data.energy_level,
            level_of_independence: data.level_of_independence,
            environment: data.environment,
            requirements: data.requirements,
            created_at: new Date(),
            updated_at: new Date()
        }

        this.pets.push(pet)

        return pet
    }

}