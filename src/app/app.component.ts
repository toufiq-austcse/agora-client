import { Component, OnInit } from '@angular/core';
import * as AgoraRTC from 'agora-rtc-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   rtcToken = '00668e793c0d705413188f99d79329bf2cdIAArn5zCpGFFZaIclSdYGETsFNZUwQFwkashMoGqbGPdc0o3N0Stghr6EADWzvUCgRwuYAEAAQAAAAAA';

  
  title = 'agora-client';
   client:AgoraRTC.Client;
  ngOnInit(): void {
    this.client = AgoraRTC.createClient({
      mode:'live',
      codec:'vp8'
    });
    this.client.init('68e793c0d705413188f99d79329bf2cd',()=>{
      this.client.setClientRole('audience');

      this.client.join(this.rtcToken,'video.1',25,null,()=>{
       this.client.on('stream-added',(evt)=>{
        this.client.subscribe(evt.stream,null,(err)=>console.log(err))
         
       });
       this.client.on('stream-subscribed',(evt)=>{
         console.log('safds');
         
        let stream = evt.stream;
        let streamId = String(stream.getId());
        //this.addVideoStream(streamId);
        stream.play('remote-container');
         
       })
        
      })
    });
   
  }

  addVideoStream(id){
    let remoteContainer = document.getElementById('remote-container');
    console.log(remoteContainer);
    
    // Creates a new div for every stream
    let streamDiv = document.createElement("div");
    // Assigns the elementId to the div.
    streamDiv.id = id;
    // Takes care of the lateral inversion
    streamDiv.style.transform = "rotateY(180deg)";
    // Adds the div to the container.
    remoteContainer.appendChild(streamDiv);
  }
  
}
