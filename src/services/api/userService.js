import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async getAll() {
    await this.delay();
    return [...this.users];
  }

  async getById(id) {
    await this.delay();
    return this.users.find(user => user.Id === parseInt(id));
  }

  async create(userData) {
    await this.delay();
    const newUser = {
      ...userData,
      Id: Math.max(...this.users.map(u => u.Id)) + 1,
      is_admin: false
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await this.delay();
    const index = this.users.findIndex(user => user.Id === parseInt(id));
    if (index === -1) throw new Error("User not found");
    
    this.users[index] = { ...this.users[index], ...userData };
    return { ...this.users[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.users.findIndex(user => user.Id === parseInt(id));
    if (index === -1) throw new Error("User not found");
    
    this.users.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const userService = new UserService();