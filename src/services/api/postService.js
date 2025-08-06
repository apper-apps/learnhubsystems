import postsData from "@/services/mockData/posts.json";

class PostService {
  constructor() {
    this.posts = [...postsData];
  }

  async getAll() {
    await this.delay();
    return [...this.posts].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
  }

  async getById(id) {
    await this.delay();
    return this.posts.find(post => post.Id === parseInt(id));
  }

  async getBySlug(slug) {
    await this.delay();
    return this.posts.find(post => post.slug === slug);
  }

  async create(postData) {
    await this.delay();
    const newPost = {
      ...postData,
      Id: Math.max(...this.posts.map(p => p.Id)) + 1,
      published_at: new Date().toISOString()
    };
    this.posts.push(newPost);
    return { ...newPost };
  }

  async update(id, postData) {
    await this.delay();
    const index = this.posts.findIndex(post => post.Id === parseInt(id));
    if (index === -1) throw new Error("Post not found");
    
    this.posts[index] = { ...this.posts[index], ...postData };
    return { ...this.posts[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.posts.findIndex(post => post.Id === parseInt(id));
    if (index === -1) throw new Error("Post not found");
    
    this.posts.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const postService = new PostService();