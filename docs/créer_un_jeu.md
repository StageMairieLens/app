  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css">
<h1 align=center>Ajouter un jeu dans l'application</h1> 
<p align=center><i class='fa-solid fa-exclamation-triangle fa-lg' style='color : yellow'></i> Tout ce qui suit doit être réaliser dans l'application <i class="fa-brands fa-angular" style="color : #dd0031"></i> Angular.
</p>
<span align=center>Nous avons utiliser <b>boostrap 4.0</b> et <b>angular material</b> pour le front du projet en grande partie vous pouvez donc allez piocher des styles directement depuis ces librairie pour le rendu front de votre jeu.</span>
<p>Dans le cas d'une intérogation je vous conseille de regardez les autres componenent de jeu dans le dossier source (Angular).</p>

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

A notez qu'il faut que vous rajoutez le code qui suit dans le **.ts** pour désactiver ou non l'affichage du titre lors de l'appel du componenent (nous utiliserons cette fonctionalité dans le panel pour faire afficher la prévisualisation du jeu ou l'affichage de la liste et du formulaire de création / édition du jeu)

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

<h3 align=center>La liste des jeux</h3>

- <p>Une fois votre jeu terminé vous devez créer une classe avec les attributs de votre jeu qui le rendront personalisable (couleur de background , couleur de texte, police d'écriture,ect...)
</p>
<p><i class="fa-solid fa-exclamation-circle fa-lg" style='color : yellow'></i>
Votre classe doit contenir les deux attributs suivant !</p>

```ts
  id: number;
  date: string;
```

- <p>Vous devez ensuite créer une table dans la base de données correspondant à votre jeu</p>

***Exemple***
<img src="./images/capture_bd.png">

<p></p>

- <p>Vous devez créer le fichier <b>PHP</b> correspondant à la récupération des données (vue) </p>

```php
<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Authorization, Content-Type, Accept");
require_once("connection.php");
$conn = new Connection();
$result;
$myArray=array();

    $sql = "SELECT * FROM {NOM_DE_LA_TABLE}";
    $result = $conn->db->query($sql);
    
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            $myArray[] = $row;
        }
    
    $myJSON = json_encode($myArray);
    echo $myJSON;
?>
```

- <p>Vous devez ensuite ajoutez dans votre fichier <b>.ts</b> les fonctions de récupération et d'envoie dans la base de données</p>

***Récupération***
```ts
recup(tab: any) {//Récupére le jeu depuis la BDD
    this.jeuxService.recup_recopier(tab).subscribe(data => {
      for (var i = 0; data[i] != null; i++) {
        if (data[i].id_crea == +localStorage.getItem('id_crea')!) {
          tab.push(
            //Appeler le constructeur de votre jeu
          );
        }
      }
    })
  }
```

***Insertion***

```ts
  onSend(list: any) {//Ajoute le jeu dans la BDD
    const formData: FormData = new FormData();
    formData.append('send', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
      next: res => {
        this.reponse = res;
      },
    });
  }
```

***Update***

```ts
  onSend_update(list: any) {//Update le jeu dans la bdd
    const formData: FormData = new FormData();
    list['id_table']='ID_NOM_DU_JEU';//Permet de reconnaitre la table
    formData.append('update', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
```

***Delete***

```ts
  onSend_delete(id_jeu: any) {//Suprimme un jeu de la bdd

    const formData: FormData = new FormData();
    var list={table:'NOM_DE_LA_TABLE_DU_JEU',id:id_jeu,id_table:'ID_NOM_DU_JEU'};//Permet de reconnaitre la table, le nom de l'id et le numero de l'id
    formData.append('delete', JSON.stringify(list));
    this.jeuxService.onSend(formData).subscribe({
    });
  }
```

<p>Si vous souhaitez faire afficher vos jeu vous devez dans un premier temps les récupérer depuis la bdd en faisant l'appel de la fonction <b>recup</b>. Cela se fait dans la fonction <b>ngOnInit</b> dans le fichier <b>.ts</b></p>

***Exemple***

```ts
data : NOM_DU_JEU[] = [];
ngOnInit(): void {
  this.recup(this.data);
}
```
<p><i class="fa-solid fa-exclamation-circle fa-lg" style='color : yellow'></i>
Vous devez considérez que cette action prendra un certain temps donc il est conseillez si vous souhaitez agir sur la liste récupérer de laissez le temps en utilisant la fonction <b>setTimeout</b></p>

- <p> Pour maintenant afficher la liste des jeux vous devez ajoutez le code HTML qui suit

```html
 <table class="table table-hover text-center">
        <thead>
          <tr>
            <th scope="col"
              *ngFor="let col of ['NOM_COLLONE_1',NOM_COLLONE_2','Actions']">
              {{col}}</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let element of this.data">
            <th>{{element.attribut_1}}</th> <!-- element correspondant à la collone 1 -->
            <th>{{element.atrribut_2}}</th> <!-- element correspondant à la collone 2 -->

            <!-- Actions -->
            <th class="button_actions">
              <!-- Prévisualiser le jeu -->
              <button mat-raised-button title="Prévisualiser le jeu" color="primary" (click)="preview(element)">
                <i class="fa-solid fa-eye fa-lg fa-lg" style="margin-bottom : 2px"></i>
              </button>

              <!-- Editer le jeu -->
              <button mat-raised-button title="Editer le jeu" style="background-color : rgb(223, 175, 18)"
                color="primary" (click)="edit(element)">
                <i class="fa-solid fa-pen fa-lg" style=" margin-bottom : 2px"></i>
              </button>

              <!-- Supprimer le jeu -->
              <button mat-raised-button title="Supprimer le jeu" style="background-color : red" color="primary"
                (click)="delete(element)">
                <i class="fa-solid fa-trash fa-lg" style=" margin-bottom : 2px "></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
```

<p>La collone actions contient des boutons qui appel des fonctions nécéssaire</p>

***Prévisualisation du jeu***

```ts
  preview(prev: boolean): void {
    if (prev == true) {
      this.jeu = //APPEL ICI DU CONSTRUCTEUR DU JEU AVEC LES PARAMETRES DU JEU
      this.previsualiser = true;
    }
    else {
      this.previsualiser = false;
      setTimeout(() => {
        this.setInactive(document.getElementsByClassName('breadcrumb-item')!.item(0)!.children.item(0));
        this.setActive(document.getElementsByClassName('breadcrumb-item')!.item(this.formStep)!.children.item(0));
      }, 0);
    }
  }
```
Cette fonction permet de prévisualiser le jeu avec les paramètres de celui-ci
