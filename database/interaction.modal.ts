import { Document, Schema, model, models } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // refrence to user
  action: string;
  question: Schema.Types.ObjectId; // refrence to question
  answer: Schema.Types.ObjectId; // refrence to answer
  tags: Schema.Types.ObjectId[]; // refrence to tags
  createdAt: Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // refrence to user
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question' }, // refrence to question
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' }, // refrence to answer
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], // refrence to tags
  createdAt: { type: Date, default: Date.now },
});

const Interaction = models.Interaction || model('Interaction', InteractionSchema);

export default Interaction;
