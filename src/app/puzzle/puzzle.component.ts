import { Component, OnInit,ViewChild,Input, ElementRef,AfterViewInit } from '@angular/core';
import { Puzzle } from './Puzzle'
import { Progress } from '../Progress'

declare function restart():any;
declare function rules():any;
declare function lance():any;
@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],
  template: `
    <canvas #canvas width="1000" height="1000" ></canvas>
       
  `,
  styles: ['canvas { border-style: solid }']
})
export class PuzzleComponent implements OnInit {
  @ViewChild('visualization') visualization: ElementRef | undefined;
  @ViewChild('img') img: ElementRef | undefined;
  
  private context: CanvasRenderingContext2D | undefined;
  private element: HTMLImageElement | undefined;

  src: string;
  imgWidth: number
  imgHeight: number
  constructor() { 
    this.r = null;
    this.imgWidth = 600;
    this.imgHeight = 400;
    this.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
    
    

  }
  ngAfterViewInit() {
    this.context = this.visualization!.nativeElement.getContext("2d");
    this.element = this.img!.nativeElement;
  }
  afterLoading() {
    this.context!.clearRect(0, 0, this.imgWidth, this.imgHeight);
    console.log('drawImage');
    // this prints an image element with src I gave
    console.log(this.element);
    this.context!.drawImage(this.element!, 0, 0, this.imgWidth, this.imgHeight);
  }
  ngOnInit(): void {
    lance();
    restart();
    
    /*this.ctx = this.canvas!.nativeElement.getContext('2d')as unknown as CanvasRenderingContext2D;// ou juste !
    this.img.src='../../assets/chat.jpg';
    this.ctx.drawImage(this.img,10,10);*/
    //this.test();
    //rules(); 
  }
  typeEcriture: string = "CAPITAL"; // default
  @Input() r: Puzzle | null;
  @Input() showTitle : boolean = true;
  
  
  
  }

 

 