import BaseHttpService from "@/services/baseHttp.service";

export class RecordService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!RecordService.instance) {
      RecordService.instance = new RecordService();
    }

    return RecordService.instance;
  }

  get endpoints() {
    return this.getEndpoints("record");
  }

  addRecord(recordData) {
    return this.post(this.endpoints.addRecord, recordData);
  }
}
