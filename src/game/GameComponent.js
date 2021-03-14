import Phaser from 'phaser'
import tiles from './assets/grass.png';
import tiles2 from './assets/grass2.png';
import hero from './assets/hero.png';
import mapJSON from './test.json';
import {useEffect, useState} from 'react';

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
}


const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: "game__container",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: 0
        }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

    var keys;
    var PlayerSprite;
    var cursors;
  
  function preload() {
    this.load.image('tiles', tiles);

    this.load.image('tiles2', URL.createObjectURL(dataURLtoBlob(tiles2)));
    this.load.image('hero', URL.createObjectURL(dataURLtoBlob(hero)));

    this.load.tilemapTiledJSON('map', mapJSON);
  }

  function create() {

    var map = this.make.tilemap({ key: 'map' });

    var tiles = map.addTilesetImage('grass', 'tiles');
    var tiles2 = map.addTilesetImage('grass2', 'tiles2');
    var layer = map.createLayer('dirt', tiles, 0, 0);
    var layer2 = map.createLayer('grass', tiles2, 0, 0);
    

    cursors = this.input.keyboard.createCursorKeys();

    PlayerSprite = this.physics.add.sprite(100, 300, 'hero');
    PlayerSprite.setCollideWorldBounds(true); //Не дает выйти за границы окна.(Но у меня границы динамические....)
    
    map.setCollisionBetween(1, 999, true, 'layer2');
    this.physics.add.collider(PlayerSprite, layer2);

    PlayerSprite.body.setOffset(5, 24);       // Это настройка хитбокса/колизии для персонажа.
    PlayerSprite.body.setSize(15, 15, 0, 0);  // Это настройка хитбокса/колизии для персонажа.

    keys = this.input.keyboard.addKeys('W,A,S,D'); //Добавляем клавиши для индексикации нажатия

        
  }



  function update (){
    PlayerSprite.setVelocity(0);
    if (cursors.left.isDown || keys.A.isDown){
            PlayerSprite.setVelocityX(-200);
        }
    if (cursors.right.isDown|| keys.D.isDown){
            PlayerSprite.setVelocityX(200);
        }
    if (cursors.up.isDown || keys.W.isDown){
            PlayerSprite.setVelocityY(-200);
        }
    if (cursors.down.isDown || keys.S.isDown){
            PlayerSprite.setVelocityY(200);
    }
}



const GameComponent = () =>{
    useEffect(()=>{
        let cleanupFunction = false;

        if(!cleanupFunction){var game = new Phaser.Game(config)}

        return () => {cleanupFunction = true; game.destroy()}
    }, [])

    return ""
}

export default GameComponent