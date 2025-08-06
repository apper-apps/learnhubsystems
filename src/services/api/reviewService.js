import reviewsData from "@/services/mockData/reviews.json";

class ReviewService {
  constructor() {
    this.reviews = [...reviewsData];
  }

  async getAll() {
    await this.delay();
    return [...this.reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  async getById(id) {
    await this.delay();
    return this.reviews.find(review => review.Id === parseInt(id));
  }

  async create(reviewData) {
    await this.delay();
    const newReview = {
      ...reviewData,
      Id: Math.max(...this.reviews.map(r => r.Id)) + 1,
      likes: [],
      created_at: new Date().toISOString()
    };
    this.reviews.push(newReview);
    return { ...newReview };
  }

  async update(id, reviewData) {
    await this.delay();
    const index = this.reviews.findIndex(review => review.Id === parseInt(id));
    if (index === -1) throw new Error("Review not found");
    
    this.reviews[index] = { ...this.reviews[index], ...reviewData };
    return { ...this.reviews[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.reviews.findIndex(review => review.Id === parseInt(id));
    if (index === -1) throw new Error("Review not found");
    
    this.reviews.splice(index, 1);
    return true;
  }

  async toggleLike(id, userId) {
    await this.delay();
    const review = this.reviews.find(review => review.Id === parseInt(id));
    if (!review) throw new Error("Review not found");
    
    const userIdStr = userId.toString();
    const likeIndex = review.likes.indexOf(userIdStr);
    
    if (likeIndex === -1) {
      review.likes.push(userIdStr);
    } else {
      review.likes.splice(likeIndex, 1);
    }
    
    return { ...review };
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const reviewService = new ReviewService();