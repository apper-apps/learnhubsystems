import programsData from "@/services/mockData/programs.json";

class ProgramService {
  constructor() {
    this.programs = [...programsData];
  }

  async getAll() {
    await this.delay();
    return [...this.programs];
  }

  async getById(id) {
    await this.delay();
    return this.programs.find(program => program.Id === parseInt(id));
  }

  async getBySlug(slug) {
    await this.delay();
    return this.programs.find(program => program.slug === slug);
  }

  async create(programData) {
    await this.delay();
    const newProgram = {
      ...programData,
      Id: Math.max(...this.programs.map(p => p.Id)) + 1,
      created_at: new Date().toISOString()
    };
    this.programs.push(newProgram);
    return { ...newProgram };
  }

  async update(id, programData) {
    await this.delay();
    const index = this.programs.findIndex(program => program.Id === parseInt(id));
    if (index === -1) throw new Error("Program not found");
    
    this.programs[index] = { ...this.programs[index], ...programData };
    return { ...this.programs[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.programs.findIndex(program => program.Id === parseInt(id));
    if (index === -1) throw new Error("Program not found");
    
    this.programs.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const programService = new ProgramService();