import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  title = 'audio-app';


  ngOnInit() {
    //this.playAudio();
  }
  /*playAudio() {
    var audio = new Audio();
    audio.src = "../../assets/music/ErrorMusic.mp3";
    // when the sound has been loaded, execute your code
    audio.oncanplaythrough = (event) => {
        var playedPromise = audio.play();
        if (playedPromise) {
            playedPromise.catch((e) => {
                console.log(e)
                if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
                    console.log(e.name);
                }
            }).then(() => {

            });
            
        }
      }
  }*/
}