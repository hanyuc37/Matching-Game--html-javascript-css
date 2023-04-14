const imageOptions = ['images/chamber.png','images/dobby.png',
        'images/glasses.png','images/hat.png','images/hogwarts.png',
        'images/map.png','images/nimbus.png','images/tree.png',
        'images/owl.png','images/voldemort.png','images/quidditch.png'];
        const magicSound = ['videos/Lumos.mp3','videos/wang-sound.mp3',
        'videos/wandsound2.mp3','videos/wand-3.mp3']
        let numAttempt = 0;
        const theLeftSide = document.getElementById('leftSide');
        const theRightSide = document.getElementById('rightSide');
        //Level Selection
        const levelSelection = document.querySelector('.level-selection');
        const levelButtons = document.querySelectorAll('.level-button');
        //Game Over
        const gameOverSelection = document.querySelector('.gameover-selection');
        const gameOverButtons  = document.querySelectorAll('.gameOverButtons');

        // Pick the level to start game
        //Show the level option box
        levelSelection.style.display = 'block';
        // Add event listener to buttons
        levelButtons.forEach(button=>{
            button.addEventListener('click',buttonHandle);
        })


        function buttonHandle(event){
            event.stopPropagation();
            const number = event.target.dataset.number;
            levelButtons.forEach(button => {
            button.removeEventListener('click', buttonHandle);
            });
            levelSelection.style.display = 'none';
            generateGame(number);   
        }
        

        function generateGame(number){
            let numofFace = Number(number);
            for(let face = 0; face < numofFace; face++){
                //randomize img options
                let face = document.createElement('img');
                let imgRandomIdx = Math.floor(Math.random()*imageOptions.length);
                face.src = imageOptions[imgRandomIdx];
                //resize the image
                face.style.width = "auto";
                face.style.height = "150px";
                //randomize the postion of each face
                let positionTop = Math.floor(Math.random()*350)+1;
                let positionLeft = Math.floor(Math.random()*320)+1;
                face.style.top = positionTop +'px';
                face.style.left = positionLeft +'px';
                face.style.position ="absolute"; //overlap is allowed
                //Append face
                theLeftSide.appendChild(face);
            }
            //Rightside
            //clone from the leftside but delete the last child
            const leftcopy = theLeftSide.cloneNode(true);
            leftcopy.removeChild(leftcopy.lastChild);
            theRightSide.appendChild(leftcopy);
            theRightSide.style.backgroundColor = "cornsilk";

            //Add Click function
            //if click the right one, level up!
            theLeftSide.lastChild.addEventListener('click', event =>{
                nextLevel(event,numofFace)
            });
            //if Click the wrong place, game over! (exclude when click on checking the difficulty level)
            document.addEventListener('click',gameOver);
        }
        
        //level up
        function nextLevel(event,numofFace){
            event.stopPropagation();/*ensure that the event does not 
            get applied to other elements in the webpage, such as other faces*/

            //success sound!
            const successSound = document.getElementById('success-sound');
            successSound.play();
            //face doubled
            numofFace=numofFace*2;
            //clean the page to start a new round
            while (theLeftSide.firstChild){
                theLeftSide.removeChild(theLeftSide.firstChild);
            }
            while (theRightSide.firstChild){
                theRightSide.removeChild(theRightSide.firstChild);
            }
            //Next Round
            numAttempt+=1;
            generateGame(numofFace);
        }

        //GameOver Button 
        function gameOver() {
            document.removeEventListener('click', gameOver);
            theLeftSide.lastChild.removeEventListener('click', nextLevel);
            gameOverSelection.style.display = "block";
            const ronVoice = document.getElementById('eat-slugs');
            ronVoice.play();
            gameOverButtons.forEach(button => {
                button.addEventListener('click', gameOverHandle);
                const attempts = document.getElementById('gameover-text');
                attempts.textContent('You made total of '+ numAttempt +' s!');
            });
        }

        function gameOverHandle(event) {
            const option = event.target.dataset.option;
            gameOverOption(option);
        }
        function gameOverOption(option){
            if (option === "cancel") {
                window.close();
            }
            else if (option === "restart") {
                location.reload();
            }
        }