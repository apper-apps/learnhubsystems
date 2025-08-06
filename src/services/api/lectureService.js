import lecturesData from "@/services/mockData/lectures.json";

class LectureService {
  constructor() {
    this.lectures = [...lecturesData];
  }

  async getAll() {
    await this.delay();
    return [...this.lectures];
  }

  async getById(id) {
    await this.delay();
    return this.lectures.find(lecture => lecture.Id === parseInt(id));
  }

  async getByProgramSlug(programSlug) {
    await this.delay();
    return this.lectures.filter(lecture => lecture.program_slug === programSlug);
  }

  async create(lectureData) {
    await this.delay();
    const newLecture = {
      ...lectureData,
      Id: Math.max(...this.lectures.map(l => l.Id)) + 1
    };
    this.lectures.push(newLecture);
    return { ...newLecture };
  }

  async update(id, lectureData) {
    await this.delay();
    const index = this.lectures.findIndex(lecture => lecture.Id === parseInt(id));
    if (index === -1) throw new Error("Lecture not found");
    
    this.lectures[index] = { ...this.lectures[index], ...lectureData };
    return { ...this.lectures[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.lectures.findIndex(lecture => lecture.Id === parseInt(id));
    if (index === -1) throw new Error("Lecture not found");
    
    this.lectures.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const lectureService = new LectureService();