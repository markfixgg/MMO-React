import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

const GameComponent = () =>{
    var config = {
        type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.RESIZE,
                width: '100%',
                height: '100%'
            },
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

    function preload ()
    {
        this.load.image('tiles', './assets/grass.png');
        this.load.image('tiles2', './assets/grass2.png');
        this.load.image('hero', './assets/hero.png');
    
        this.load.tilemapTiledJSON('map', './test.json');
    }
    function create ()
    {
        
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

    function update ()
    {
        
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

    return <IonPhaser game={config}/>
}
export default GameComponent