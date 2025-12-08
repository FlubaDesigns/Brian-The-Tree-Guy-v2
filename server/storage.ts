import { type User, type InsertUser, type Service, type GalleryImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getServices(): Promise<Service[]>;
  getGalleryImages(): Promise<GalleryImage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Service[];
  private galleryImages: GalleryImage[];

  constructor() {
    this.users = new Map();
    this.services = [
      {
        id: "1",
        title: "Tree Trimming",
        description: "Professional trimming to maintain the health and appearance of your trees. We shape trees for optimal growth, remove dead branches, and improve overall aesthetics. Regular trimming promotes healthy growth and prevents potential hazards.",
        icon: "scissors",
        order: 1,
      },
      {
        id: "2",
        title: "Tree Removal",
        description: "Safe and efficient removal of unwanted or hazardous trees. Our experienced crew handles trees of all sizes with proper equipment and techniques. We ensure complete cleanup and disposal of all debris.",
        icon: "axe",
        order: 2,
      },
      {
        id: "3",
        title: "Stump Grinding",
        description: "Complete stump removal to reclaim your yard space. Our grinding service eliminates stumps below ground level, allowing you to replant or landscape the area. We leave your property clean and ready for use.",
        icon: "stump",
        order: 3,
      },
      {
        id: "4",
        title: "Storm Damage Cleanup",
        description: "Emergency response for storm-damaged trees. We provide fast, safe removal of fallen trees and limbs. Available for urgent situations to protect your property and restore safety.",
        icon: "wind",
        order: 4,
      },
      {
        id: "5",
        title: "Land Clearing",
        description: "Professional clearing services for residential and commercial properties. We remove trees, brush, and vegetation to prepare your land for construction or landscaping projects.",
        icon: "trees",
        order: 5,
      },
      {
        id: "6",
        title: "Debris Hauling",
        description: "Complete cleanup and removal of tree debris, branches, and leaves. We ensure your property is left clean and tidy after every job. Responsible disposal of all materials.",
        icon: "truck",
        order: 6,
      },
    ];
    this.galleryImages = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getServices(): Promise<Service[]> {
    return this.services.sort((a, b) => a.order - b.order);
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return this.galleryImages.sort((a, b) => a.order - b.order);
  }
}

export const storage = new MemStorage();
