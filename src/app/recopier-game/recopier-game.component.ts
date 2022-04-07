import { Component, OnInit, ViewChild } from '@angular/core';
import { Image } from './Image'

@Component({
  selector: 'app-recopier-game',
  templateUrl: './recopier-game.component.html',
  styleUrls: ['./recopier-game.component.css']
})
export class RecopierGameComponent implements OnInit {

  constructor() { }

  image : Image[] = [];
  showImageCpt : number = 0;


  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

  enterKey($event : KeyboardEvent) : void {
    if($event.key == 'Enter') {
      this.sendAnswer((<HTMLInputElement>$event.target).value, this.image[this.showImageCpt]);
    }
  }

  ngOnInit(): void {
    this.image.push(new Image('Fleur','https://imgs.search.brave.com/-eWW3d6u1vKgtJG-bhT1TVStKGfCTGDUowy95wYkUHY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb25n/d29vZGdhcmRlbnMu/b3JnL3NpdGVzL2Rl/ZmF1bHQvZmlsZXMv/aGlnaGxpZ2h0X2lt/YWdlcy83Njc1OC5q/cGc'));
    this.image.push(new Image('Lion','https://imgs.search.brave.com/Pe4oHRuA8lRa0gURHyJEdpiDiayBgKXfoI4YpwQOesE/rs:fit:1024:712:1/g:ce/aHR0cDovL2ltZy5i/dXJyYXJkLWx1Y2Fz/LmNvbS9rZW55YS9m/dWxsL2ltcHJlc3Np/dmVfbWFsZV9saW9u/LmpwZw'));
    this.image.push(new Image('Chien','https://imgs.search.brave.com/pdVRubgeL8KsfN_B9SQ9qd9HSHeo2Q1gX2hqBLisaJc/rs:fit:1200:731:1/g:ce/aHR0cHM6Ly93d3cu/bmV3c2h1Yi5jby5u/ei9ob21lL2xpZmVz/dHlsZS8yMDE5LzEx/L2RvZy15ZWFycy1h/cmUtYS1teXRoLTIt/eWVhci1vbGQtZG9n/cy1hbHJlYWR5LW1p/ZGRsZS1hZ2VkLXNj/aWVudGlzdHMvX2pj/cl9jb250ZW50L3Bh/ci92aWRlby9pbWFn/ZS5keW5pbWcuMTI4/MC5xNzUuanBnL3Yx/NTc0NTcyMzU4ODE4/L0dFVFRZLWxhYnJh/ZG9yLXB1cHB5LTEx/MjAuanBn'));
    this.image.push(new Image('Chat','https://imgs.search.brave.com/tO-IPpWru0K-CCUJGWm7ntiARcqxpkdLzLCNGjWKjmw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9waWNm/aWxlcy5hbHBoYWNv/ZGVycy5jb20vMzEx/LzMxMTIwMi5qcGc'));
    this.image.push(new Image('Elephant','https://imgs.search.brave.com/n0E_4XOqRHMl33MJB1bswBs1OXz1mnlGlb5cUxPpID0/rs:fit:1200:1000:1/g:ce/aHR0cHM6Ly8yLmJw/LmJsb2dzcG90LmNv/bS8tNmYybUZYeXJi/b28vVnhGY3o0T2hf/b0kvQUFBQUFBQUFG/WU0vbmhVLXI4ZVZj/VlFnVGowYVpWcmp0/TTRUVjhDaWRxalZn/Q0tnQi9zMTYwMC9F/bGVwaGFudC1Bbmlt/YWwtSEQtV2FsbHBh/cGVycy5qcGc'));
    this.image.push(new Image('Cheval','https://imgs.search.brave.com/hpUGtW8aoMo7IUZCk6mp9f4ft3oZkPdnw9e8su27heM/rs:fit:900:652:1/g:ce/aHR0cDovL3d3dy5j/aGV2YWxhbm5vbmNl/LmNvbS9waG90b3Mt/YW5ub25jZXMxLzEv/Z2VycmV0LThhMzE5/OTUwYjNhN2Y5YTQx/MjM5YTlhMzNlNjA4/NGFjLmpwZw'));
  }

  sendAnswer(text: string,img : Image): void {
    if (text.toUpperCase() === img.getNom().toUpperCase()) {
      document.getElementById('result')!.innerHTML = '<p style="color : green">C\'est le bon mot</p>';
      document.getElementById('container')!.animate([ { opacity: 1 },
        { opacity: 0.1, offset: 0.7 },
        { opacity: 1 } ],
      800);

      setTimeout(() => {
        this.showImageCpt++;
        document.getElementById('result')!.innerHTML = '';
        (<HTMLInputElement>document.getElementById('input_recopier')).value = '';
        document.getElementById('progressbar')!.style.width = ((this.showImageCpt/this.image.length)*100).toString() + '%';

      },
      600);
    } else {
      document.getElementById('result')!.innerHTML = '<p style="color : red">Ce n\'est pas le bon mot</p>';
      document.getElementById('container')?.animate([
        { transform: 'translateX(0px)'},
        { transform: 'translateX(-50px)'},
        { transform: 'translateX(50px)'}
      ], { duration : 200 }
      );
    }

  }


}
