let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let assets: createjs.LoadQueue;

    
    let Button: UIObjects.Button;
    let leftDice: Core.GameObject;
    let rightDice: Core.GameObject;    

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

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        stage.update();
    }
    function buildInterface():void
    {
        Button = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(Button);
      

        leftDice = new Core.GameObject("1", Config.Game.CENTER_X-150, Config.Game.CENTER_Y-80, true);
        stage.addChild(leftDice);

        rightDice = new Core.GameObject("1", Config.Game.CENTER_X+150, Config.Game.CENTER_Y-80, true);
        stage.addChild(rightDice);
    }
    
    function Roll():string[]
    {
        let diceValue = [" ", " "];
        var outCome = [0, 0];
        for (let roll = 0; roll < 2; roll++) {
            outCome[roll] = Math.floor((Util.Mathf.RandomRange(1,7)));
            switch (outCome[roll]) {
                case outCome[roll]=1:  
                    diceValue[roll] = "1";
                    break;
                case outCome[roll]=2:  
                    diceValue[roll] = "2";
                    break;
                case outCome[roll]=3:  
                    diceValue[roll] = "3";
                    break;
                case outCome[roll]=4:  
                    diceValue[roll] = "4";
                    break;
                case outCome[roll]=5:  
                    diceValue[roll] = "5";
                    break;
                case outCome[roll]=6:  
                    diceValue[roll] = "6";
                    break;    
            }
        }return diceValue;

    }
    
    function interfaceLogic():void
    {
        Button.on("click", ()=>{
            console.log("roll button clicked");
            let clickRoll = Roll();
            leftDice.image = assets.getResult(clickRoll[0]) as HTMLImageElement;
            rightDice.image = assets.getResult(clickRoll[1]) as HTMLImageElement;
        });
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        buildInterface();   
        interfaceLogic();

        
    }

    window.addEventListener('load', Preload);


})();