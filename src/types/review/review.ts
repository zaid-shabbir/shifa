export interface IReview {
  id: string;
  type: number;
  review_headline: string;
  review_body: string;
  star_rating_cleanliness: number;
  star_rating_communication: number;
  star_rating_location: number;
  star_rating_value: number;
  star_rating_attitude: number;
  created_date: Date;
  reply_body: string;
  replied_date: Date;
  created_by_user: string;
  practitioner: string;
  facility: string;
  replied_by_user: string;
}
