let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let assets: createjs.LoadQueue;

    let dice1Label: UIObjects.Label;
    let dice2Label: UIObjects.Label;
    let exampleButton: UIObjects.Button;  
    let one: Core.GameObject;
    let two: Core.GameObject;
    let three: Core.GameObject;
    let four: Core.GameObject;
    let five: Core.GameObject;
    let six: Core.GameObject;
    let backButton: UIObjects.Button;
    let background: Core.GameObject;
    let blank1: Core.GameObject;
    let blank2: Core.GameObject;
    let button: UIObjects.Button;
    let nextButton: UIObjects.Button;
    let placeholder: Core.GameObject;
    let resetButton: UIObjects.Button;
    let rollButton: UIObjects.Button;
    let startButton: UIObjects.Button;
    let startOverButton: UIObjects.Button;

    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/1.png"},
        {id:"2", src:"./Assets/images/2.png"},
        {id:"3", src:"./Assets/images/3.png"},
        {id:"4", src:"./Assets/images/4.png"},
        {id:"5", src:"./Assets/images/5.png"},
        {id:"6", src:"./Assets/images/6.png"},
        {id:"backButton", src:"./Assets/images/startButton.png"},
        {id:"background", src:"./Assets/images/background.png"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"startOverButton", src:"./Assets/images/startOverButton.png"}
    ];

    function Preload():void
    {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config

        Main();
    }

    /*
        This function is triggered every frame (16ms)
        The stage is then erased and redrawn 
    */
    function Update():void
    {
        stage.update();
    }

    /* This is the main function of the Game (where all the fun happens) */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        gameInterface();

        gameInterfaceLogic();
    }

    function gameInterface()
    {
        background = new Core.GameObject('background', Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(background);

        blank1 = new Core.GameObject('blank', Config.Game.CENTER_X - 120, Config.Game.CENTER_Y - 70, true);
        stage.addChild(blank1);

        blank2 = new Core.GameObject('blank', Config.Game.CENTER_X + 120, Config.Game.CENTER_Y - 70, true);
        stage.addChild(blank2);

        dice1Label = new UIObjects.Label("0", "20px", "Consolas", "#000000", Config.Game.CENTER_X - 120, Config.Game.CENTER_Y + 40, true);
        stage.addChild(dice1Label);

        dice2Label = new UIObjects.Label("0", "20px", "Consolas", "#000000", Config.Game.CENTER_X + 120, Config.Game.CENTER_Y + 40, true);
        stage.addChild(dice2Label);

        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
    }

    function gameInterfaceLogic()
    {
        rollButton.on("click", ()=>{
            let dice1 = Math.round(Util.Mathf.RandomRange(1, 5));
            let dice2 = Math.round(Util.Mathf.RandomRange(1, 5));

            changeDiceImage(dice1, 1, blank1);
            changeDiceImage(dice2, 2, blank2);

            dice1Label.setText(dice1.toString());
            dice2Label.setText(dice2.toString());
        });
    }

    function changeDiceImage(dice: number, dice_NO: number, target: Core.GameObject)
    {
        let x: number = 0;
        let y: number = 0;

        if(dice_NO === 1)
        {
            x = Config.Game.CENTER_X - 120;
            y = Config.Game.CENTER_Y - 70;
        }
        else
        {
            x = Config.Game.CENTER_X + 120;
            y = Config.Game.CENTER_Y - 70;
        }

        target = new Core.GameObject(dice.toString(), x, y, true);
        stage.addChild(target);
    }
    window.addEventListener('load', Preload);


})();