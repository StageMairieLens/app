import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from '../Image'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  [x: string]: any;

  constructor() {}

  static list_image: Image[] = [
    new Image('Fleur', '../../assets/fleur.jpg'),
    new Image('Chat', '../../assets/chat.jpg'),
    new Image('Voiture', '../../assets/voiture.png'),
    new Image('Elephant', '../../assets/elephant.jpg'),
    new Image('Chien', '../../assets/chien.jpeg'),
    new Image('Lapin', '../../assets/lapin.webp'),
    new Image('Panda', '../../assets/panda.png'),
    new Image('Souris', '../../assets/souris.jpg'),
    new Image('Maison', '../../assets/house.svg'),
    new Image('Orange', '../../assets/orange.jpg')
  ];


  ngOnInit(): void {

  }

  public getListImages(): Image[] {
    return ImagesComponent.list_image;
  }


  addImage(i: Image): void {
    console.log(i);
  }
}
