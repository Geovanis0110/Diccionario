import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class SharedData{
  behaviorSub = new BehaviorSubject<boolean>(false);
  constructor(){}
}
