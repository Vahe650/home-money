import {CategoryModel} from './category.model';

export class EventModel {

  constructor(
    public eventType: string,
    public amount: number,
    public category: CategoryModel,
    public date: string,
    public description: string,
    public eventId?: number,
    public catName?: string
  ) {
  }
}
