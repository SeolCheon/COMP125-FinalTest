/*File name : game.ts
  Author's name : Seol Cheon
  Student Id : 301113120
  Date : 20th August 2020
  file description: a typescript file that will transpile to game.js. 
  overview :  Use your accumulated knowledge of various libraries and frameworks demonstrated in class
            to build a dice roller. Your game will display a random result of two dies set side by side within the
            webpage. Each time the player presses the Roll button the dice result displayed will change.*/
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;    
    
    let assets: createjs.LoadQueue;
    
    let Button: UIObjects.Button;

    let leftDice: Core.GameObject;
    let rightDice: Core.GameObject;  

    let leftNumber: UIObjects.Label;
    let rightNumber: UIObjects.Label;  

    //variable for manifesting assets(id and path)
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

    //function that will be implemented before loading the page
    function Preload():void
    {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue();                  // asset container 
        assets.installPlugin(createjs.Sound);               // supports sound preloading
        assets.loadManifest(assetManifest);                 // load manifest
        assets.on("complete", Start);                       // implement Start function           
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);                 //create new canvas
        createjs.Ticker.framerate = Config.Game.FPS;                 
        createjs.Ticker.on('tick', Update);                 //sets the framerate to 60 FPS
        stage.enableMouseOver(20);
        
        Config.Game.ASSETS = assets;                        // make a reference to the assets in the global config

        Main();                                             //implement Main function
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        stage.update();
    }

    /**
     * This function creates objects
     */
    function buildInterface():void
    {
        //create button
        Button = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(Button);    

        //create two dices
        leftDice = new Core.GameObject("1", Config.Game.CENTER_X-150, Config.Game.CENTER_Y-80, true);
        stage.addChild(leftDice);

        rightDice = new Core.GameObject("1", Config.Game.CENTER_X+150, Config.Game.CENTER_Y-80, true);
        stage.addChild(rightDice);

        //create two text labels under two dices respectively(it initializes both dice number as 1)
        leftNumber = new UIObjects.Label("1", "20px", "Consolas", "#000000", Config.Game.CENTER_X-150, Config.Game.CENTER_Y+35, true);
        stage.addChild(leftNumber);

        rightNumber = new UIObjects.Label("1", "20px", "Consolas", "#000000", Config.Game.CENTER_X+150, Config.Game.CENTER_Y+35, true);
        stage.addChild(rightNumber);

    }

    /**
     * This function makes dice value randomly decided
     */
    function diceRoll():string[] 
    {
        let diceValue = [" ", " "];
        let outCome = [0, 0];
        
        for (let roll = 0; roll < 2; roll++) {
            outCome[roll] = Math.floor((Util.Mathf.RandomRange(1,6)));
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
  
    /**
     * This function makes dice images randomly roll 
     * and textLabel also roll depending on dice image
     */
    function interfaceLogic():void
    {
        Button.on("click", ()=>{
            //show this message whenever you click the roll button
            console.log("roll button clicked");

            //change dice image and change textLabel depending on dice image
            let dice = diceRoll();
            leftDice.image = assets.getResult(dice[0]) as HTMLImageElement;         //left dice image
            leftNumber.setText(dice[0].toString());                                 //left textLabel

            rightDice.image = assets.getResult(dice[1]) as HTMLImageElement;        //right dice image
            rightNumber.setText(dice[1].toString());                                //right textLabel
            
        });
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        //implement functions when you load the page
        buildInterface();   
        interfaceLogic();        
    }

    window.addEventListener('load', Preload);


})();