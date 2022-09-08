import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OperatingSystem } from "../models/operating-system.model";

@Injectable({
  providedIn: 'root'
})
export class OperatingSystemService {
  private readonly webApiUrl = environment.webApiUrl;
  constructor (private http: HttpClient) {}

  getAvaliableOperatingSystems(): Observable<OperatingSystem[]> {
    return this.http.get<OperatingSystem[]>(`${this.webApiUrl}/api/oss/dictionary`);
  }
}
