
images = [
    { src: '../../assets/images/london-bridge.jpg', title: 'London Bridge' },
    { src: '../../assets/images/lotus-temple.JPG', title: 'Lotus Temple' },
    { src: '../../assets/images/qutub-minar.jpg', title: 'Qutub Minar' },
    { src: '../../assets/images/statue-of-liberty.jpg', title: 'Statue Of Liberty' },
    { src: '../../assets/images/taj-mahal.jpg', title: 'Taj Mahal' }

];
var prochaine_image=0;
function lance(gridSize,imagess) {
    //var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    imagePuzzle.startGame(imagess, gridSize);
};
function restart(gridSize,imagess) {
    //var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    imagePuzzle.startGame(imagess, gridSize);
}
function rules() {
    alert('Réorganiser pour créer une image comme celle-ci');
}
var timerFunction;

var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (images, gridSize) {
        this.setImage(images, gridSize);
        helper.doc('playPanel').style.display = 'block';
        helper.shuffle('sortable');
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.tick();
    },
    tick: function () {
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        helper.doc('timerPanel').textContent = elapsedTime;
        timerFunction = setTimeout(imagePuzzle.tick, 1000);
    },
    setImage: function (images, gridSize ) {
        var percentage = 100 / (gridSize - 1);
        var image = images[prochaine_image++];
        helper.doc('imgTitle').innerHTML = image.title;
        helper.doc('actualImage').setAttribute('src', image.src);
        helper.doc('sortable').innerHTML = '';


        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';

            let li = document.createElement('li');
            li.id = i;
            li.setAttribute('data-value', i);
            li.style.backgroundImage = 'url(' + image.src + ')';

            li.style.backgroundSize = (gridSize * 100) + '%';
            li.style.backgroundPosition = xpos + ' ' + ypos;


                li.style.width = 400 / gridSize + 'px';



                li.style.height = 400 / gridSize + 'px';



            li.setAttribute('draggable', 'true');
            li.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id);
            li.ondragover = (event) => event.preventDefault();
            li.ondrop = (event) => {
                let origin = helper.doc(event.dataTransfer.getData('data'));
                let dest = helper.doc(event.target.id);
                let p = dest.parentNode;
              
                if (origin && dest && p) {
                    let temp = dest.nextSibling;
                    let x_diff = origin.offsetLeft-dest.offsetLeft;
                    let y_diff = origin.offsetTop-dest.offsetTop;

                    if(y_diff == 0 && x_diff >0){
                        //LEFT SWAP
                        p.insertBefore(origin, dest);
                        p.insertBefore(temp, origin);
                    }
                    else{
                        p.insertBefore(dest, origin);
                        p.insertBefore(origin, temp);
                    }


                    let vals = Array.from(helper.doc('sortable').children).map(x => x.id);
                    var now = new Date().getTime();
                    helper.doc('stepCount').textContent = ++imagePuzzle.stepCount;
                    document.querySelector('.timeCount').textContent = (parseInt((now - imagePuzzle.startTime) / 1000, 10));

                    if (isSorted(vals) && prochaine_image < images.length) {
                        // helper.doc('actualImageBox').style.display = 'none';
                        // helper.doc('gameOver').style.display = 'block';
                        //helper.doc('actualImageBox').innerHTML = helper.doc('gameOver').innerHTML;
                        //helper.doc('stepCount').textContent = imagePuzzle.stepCount;
                        console.log(prochaine_image);
                        restart(gridSize,images);
                    }
                    else if(isSorted(vals) && prochaine_image>= images.length){
                        helper.doc('actualImageBox').innerHTML = helper.doc('gameOver').innerHTML;
                        helper.doc('stepCount').textContent = imagePuzzle.stepCount;
                    }
                }
            };
            li.setAttribute('dragstart', 'true');
            li.style.display= "inline-block";
            helper.doc('sortable').appendChild(li);


            helper.doc('sortable').style.maxWidth='404px';
            helper.doc('sortable').style.maxHeight='404px';
            helper.doc('playPanel').style.maxWidth = '800px';
            helper.doc('playPanel').style.maxHeight= '800px';

        }
        helper.shuffle('sortable');
    }
};

isSorted = (arr) => arr.every((elem, index) => { return elem == index; });

var helper = {
    doc: (id) => document.getElementById(id) || document.createElement("div"),

    shuffle: (id) => {
        var ul = document.getElementById(id);
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }
}
