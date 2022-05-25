  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css">
<h1 align=center>Ajouter un jeu dans l'application</h1> 
<p align=center><i class='fa-solid fa-exclamation-triangle fa-lg' style='color : yellow'></i> Tout ce qui suit doit être réaliser dans l'application angular
</p>
<span align=center>Nous avons utiliser <b>boostrap 4.0</b> et <b>angular material</b> pour le front du projet en grande partie vous pouvez donc allez piocher des styles directement depuis ces librairie pour le rendu front de votre jeu</span>

<hr>

<p align=center></p>

<h2 align=center>Etape 1 : Créer le component pour le jeu</h2>
Rendez vous dans la racine du projet dans un shell et tapez la commandes quit suit

```sh
$ ng generate c {NOM_DU_JEU}
```

Après avoir fait cette commande un nouveau dossier dans '<b>/src/app/{NOM_DU_JEU}</b>' devrait avoir été créer

<img style="float: right;" src="./images/architecture_dossier_component.png">

- Le fichier <b>CSS</b> permet de gérer le style du component
- Le fichier <b>HTML</B> permet de gérer le contenu du component
- Le fichier <b>TS</b> permet d'incluce le **TypeScript** du component

Pour appeler ce component depuis un autre vous devez utiliser le code qui suit

```html
  <app-nom-du-jeu></app-nom-du-jeu>
```

<h2 align=center>Etape 2 : Créer le jeu</h2>

La création du jeu est une chose a faire de vous même mais je vous met a disposition des partie de code que vous pouvez reutilisez.

<h3 align=center>Le titre</h3>

####  Le style css du titre
```css
.title {
  font-size: 105px;
  font-weight: bold;
  letter-spacing: 6px;
  text-shadow: rgb(0, 0, 0, 0.7) 5px 8px;
}

.title :nth-child(1n) {
  color: #835ba7;
}
.title :nth-child(2n) {
  color: #3e4194;
}
.title :nth-child(3n) {
  color: #01afee;
}
.title :nth-child(4n) {
  color: #00a656;
}
.title :nth-child(5n) {
  color: #fff116;
}
.title :nth-child(6n) {
  color: #f68635;
}
.title :nth-child(7n) {
  color: #ec3238
}
.title :nth-child(8n) {
  color: #835ba7
}
```

#### Le code du titre
```html
<div class="text-center" *ngIf="this.showTitle">
  <h1 class="title">
    <span>R</span>
    <span>E</span>
    <span>C</span>
    <span>O</span>
    <span>P</span>
    <span>I</span>
    <span>E</span>
    <span>R</span>
  </h1>
</div>
```

A notez qu'il faut que vous rajoutiez le code qui suit dans le **.ts** pour désactiver ou non l'affichage du titre lors de l'appel du componenent (nous utiliserons cette fonctionalité dans le panel pour faire afficher la prévisualisation du jeu ou l'affichage de la liste et du formulaire de création / édition du jeu)

```ts
  @Input() showTitle: boolean = true;
```

<h3 align=center>Le jeu</h3>
Nous vous mettons à disposition du style CSS utilisable

#### Boite de jeu
```css
.card_play {
  width: 50%;
  border-radius: 3%;
  padding: 10px;
  box-shadow: hsl(0deg 0% 0% / 40%) 10px 15px;
  color: white;
}

.image_play {
  border: solid grey 2px;
  width : 490px;
  display: inline;
}
```
***Exemple :***

<div align=center>
<img style="width : 45%" src="./images/exemple_card_play.png">
</div>
<p>Le cadre bleu ci-contre est le résultat de ce style.

Nous utilisons le style des cadres **boostrap** vous pouvez donc utiliser le code qui suit pour agencer les élements de votre jeu</p>

```html
<div class="card_play align-middle text-center container">

</div>
```
